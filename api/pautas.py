# -*- coding: utf-8 -*-
"""Pautas do dia por perfil.

Le os feeds das fontes e devolve as materias mais recentes que combinam com
cada perfil. Nao usa modelo: titulo, fonte, horario e link saem literais do
feed. Numa casa que fala de investimento, manchete inventada e problema serio,
e aqui nao ha como inventar — o que aparece na tela veio do feed e leva o link
para conferir.

O ranqueamento e por afinidade de categoria e por recencia. Cabe ao modelo,
mais tarde, escrever o angulo de cada pauta; o fato fica sendo do veiculo.

Sem chave: esta rota nao chama a API da Anthropic.
"""
import gzip
import io
import json
import re
import time
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from email.utils import parsedate_to_datetime
from http.server import BaseHTTPRequestHandler

AGENTE = "Mozilla/5.0 (compatible; SunoDesign/1.0; +https://suno.com.br)"
TEMPO = 8            # segundos por feed
MAX_POR_PERFIL = 8
CACHE = 900          # 15 min na borda da Vercel
ATEMPORAL = 7 * 24 * 3600   # acima disso nao e mais "pauta do dia"

FONTES = [
    ("Suno Notícias", "https://www.suno.com.br/noticias/feed/", True),
    ("Suno Artigos",  "https://www.suno.com.br/artigos/feed/", True),
    ("Money Times · FIIs", "https://www.moneytimes.com.br/tag/fundos-imobiliarios/feed/", False),
    ("Money Times",   "https://www.moneytimes.com.br/feed/", False),
    ("InfoMoney",     "https://www.infomoney.com.br/feed/", False),
    ("Valor Investe", "https://valorinveste.globo.com/rss/valorinveste", False),
    ("Exame",         "https://exame.com/feed/", False),
    # politica e economia geral entram porque tres perfis pedem: Status Invest
    # e Danielle citam politica, e ela pede assunto quente do Brasil que mexe
    # com o mercado. Veiculo de mercado sozinho nao cobre isso.
    ("G1 Economia",   "https://g1.globo.com/rss/g1/economia/", False),
    ("G1 Política",   "https://g1.globo.com/rss/g1/politica/", False),
    # E-Investidor devolve 403 para agente identificado. Nao insistimos
    # disfarcando o pedido de navegador: quem bloqueia bot esta avisando.
    # G1 Brasil funciona mas e regional demais ("Batalha de Rap em Macapa"):
    # nao e assunto do Brasil que influencia mercado.
]

# O escopo de cada perfil, nas palavras de quem cuida deles. As listas abaixo
# sao a traducao desse escopo em termos que aparecem nas manchetes — nao um
# palpite sobre o que cada perfil deveria falar.
#
#   forte  casa com o tema central (3 pontos)
#   fraco  tangencia o tema (1 ponto)
#   fora   assunto que nao e daquele perfil, descarta
#
# Nome de politico fica de fora de proposito: as pautas de politica entram por
# termo institucional (governo, congresso, eleicoes, banco central), que pega
# o fato sem arrastar disputa partidaria para dentro da ferramenta.
PERFIS = {
    "baroni": {
        "nome": "@ProfessorBaroni",
        "escopo": "Fundos imobiliarios, noticias sobre FIIs, como funciona o "
                  "mercado e curiosidades.",
        "forte": ["fii", "fiis", "fundo imobiliario", "fundos imobiliarios",
                  "dividendo", "renda passiva", "aluguel", "laje", "galpao",
                  "cri", "tijolo", "vacancia", "cota", "ifix", "imobiliario"],
        "fraco": ["imovel", "renda fixa", "selic", "juros", "entenda",
                  "como funciona", "saiba", "o que e"],
        "fora": [],
    },
    "funds": {
        "nome": "@fundsexplorer",
        "escopo": "Focado em fundos imobiliarios.",
        "forte": ["fii", "fiis", "fundo imobiliario", "fundos imobiliarios",
                  "vacancia", "cri", "galpao", "laje", "shopping", "logistica",
                  "dividendo", "ifix", "cota", "imobiliario"],
        "fraco": ["imovel", "construcao", "aluguel", "renda passiva"],
        "fora": [],
    },
    "suno": {
        "nome": "@suno",
        "escopo": "Cenario nacional e internacional do mercado financeiro, "
                  "noticias e acontecimentos que dao para explicar ou noticiar.",
        "forte": ["mercado", "acoes", "bolsa", "ibovespa", "b3", "investir",
                  "carteira", "renda fixa", "selic", "copom", "banco central",
                  "fed", "wall street", "nasdaq", "s&p", "estados unidos",
                  "china", "europa", "juros"],
        "fraco": ["economia", "cambio", "dolar", "inflacao", "petroleo",
                  "commodities", "pib"],
        "fora": [],
    },
    "tiago": {
        "nome": "@tiagogreis",
        "escopo": "Autoridade de mercado financeiro, graficos, rankings e "
                  "opinioes sobre acontecimentos do mercado.",
        "forte": ["ranking", "maiores", "melhores", "top", "comparativo",
                  "valuation", "buffett", "longo prazo", "recorde",
                  "potencial de alta", "projecao", "analistas", "grafico",
                  "disparam", "desabam"],
        # "graficos e rankings" dele sao DO mercado financeiro: sem isto,
        # "lideres de IA discutem riscos" entrava por casar com ranking
        "contexto": ["acao", "acoes", "bolsa", "ibovespa", "b3", "mercado",
                     "empresa", "empresas", "investidor", "investidores",
                     "papel", "papeis", "acionista", "lucro", "balanco",
                     "dividendo", "dividendos", "fundo", "juros", "dolar"],
        "fraco": ["empresa", "acoes", "mercado", "negocios", "bolsa", "lucro",
                  "balanco", "resultado", "acionista", "dividendo", "investir"],
        "fora": [],
    },
    "noticias": {
        "nome": "@sunonoticias",
        "escopo": "Apenas noticias de fato, explicacoes mais profundas sobre "
                  "as principais noticias do mercado.",
        # sem tema proprio: o recorte e ser noticia, e do dia
        "forte": [],
        "fraco": [],
        "fora": ["carteira recomendada", "vale a pena comprar",
                 "melhores acoes para", "onde investir"],
        "soDoDia": True,
    },
    "consultoria": {
        "nome": "@SunoConsultoria",
        "escopo": "Perfil premium: patrimonio, gestao de patrimonio, proteger "
                  "o dinheiro da familia, pagar menos impostos e gestao "
                  "financeira.",
        "forte": ["patrimonio", "sucessao", "heranca", "holding", "testamento",
                  "inventario", "usufruto", "doacao", "imposto", "impostos",
                  "tributacao", "tributos", "imposto de renda", "isencao",
                  "restituicao", "malha fina", "receita federal", "declaracao",
                  "previdencia", "aposentadoria", "planejamento", "blindagem",
                  "offshore", "reforma tributaria", "come-cotas",
                  "reserva de emergencia", "seguro de vida", "juros compostos",
                  "cdb", "lci", "lca", "tesouro direto", "fiagro", "fidc",
                  "financas pessoais", "gestao financeira"],
        "fraco": ["renda fixa", "investir", "protecao", "seguro", "juros",
                  "familia", "longo prazo"],
        # boletim diario de taxa nao e gestao de patrimonio: e cotacao, e
        # entope a lista do perfil premium com a mesma materia de sempre
        "fora": ["tesouro direto hoje", "taxas do tesouro direto",
                 "rendimentos do tesouro direto"],
    },
    "danielle": {
        "nome": "@daniellelopesn",
        "escopo": "Mercado como um todo, com abertura para entretenimento e "
                  "explicacao de topo de funil; assuntos quentes do Brasil "
                  "que nao sao do mercado mas influenciam nele.",
        "forte": ["pix", "divida", "salario", "inflacao", "gasolina",
                  "combustivel", "energia", "conta de luz", "bolsa familia",
                  "consumo", "custo de vida", "emprego", "desemprego", "golpe",
                  "fraude", "eleicoes", "governo", "reforma", "preco",
                  "imposto de renda", "financas pessoais", "aposentadoria"],
        "fraco": ["economia", "mercado", "investir", "acoes", "juros",
                  "selic", "dolar", "credito", "entenda", "o que e"],
        "fora": [],
    },
    "status": {
        "nome": "@status.invest",
        "escopo": "Mercado de acoes, politica e cenario do mercado financeiro "
                  "bem amplo, com abertura para conteudo menos tecnico.",
        "forte": ["acoes", "bolsa", "ibovespa", "b3", "politica", "eleicoes",
                  "governo", "congresso", "senado", "camara", "stf",
                  "banco central", "copom", "ministro", "dividendos",
                  "balanco", "resultado", "ranking"],
        "fraco": ["mercado", "empresa", "economia", "dolar", "juros", "selic",
                  "lucro", "investir"],
        "fora": [],
    },
}


def sem_acento(t):
    tab = str.maketrans("áàâãäéèêëíìîïóòôõöúùûüçñ", "aaaaaeeeeiiiiooooouuuucn")
    return t.lower().translate(tab)


def limpa(t):
    """tira tags e espacos sobrando do texto que vem do feed"""
    t = re.sub(r"<[^>]+>", " ", t or "")
    t = re.sub(r"&#?\w+;", " ", t)
    return re.sub(r"\s+", " ", t).strip()


def busca(fonte):
    nome, url, daCasa = fonte
    try:
        req = urllib.request.Request(url, headers={"User-Agent": AGENTE})
        with urllib.request.urlopen(req, timeout=TEMPO) as r:
            bruto = r.read()
        # alguns servidores comprimem sem pedir licenca e o urllib nao
        # descomprime sozinho: sem isto a fonte cai calada, como se estivesse
        # fora do ar, e ninguem descobre que faltou meia lista
        if bruto[:2] == b"\x1f\x8b":
            bruto = gzip.GzipFile(fileobj=io.BytesIO(bruto)).read()
        raiz = ET.fromstring(bruto)
    except Exception:
        return []                       # fonte fora do ar nao derruba o resto

    itens = raiz.findall("channel/item") or raiz.findall(
        "{http://www.w3.org/2005/Atom}entry")
    saida = []
    for it in itens[:40]:
        def texto(tag):
            e = it.find(tag)
            return limpa(e.text) if e is not None and e.text else ""
        titulo = texto("title") or texto("{http://www.w3.org/2005/Atom}title")
        link = texto("link")
        if not link:
            e = it.find("{http://www.w3.org/2005/Atom}link")
            link = e.get("href") if e is not None else ""
        if not titulo or not link:
            continue
        cats = [limpa(c.text) for c in it.findall("category") if c.text]
        quando = texto("pubDate") or texto("{http://www.w3.org/2005/Atom}updated")
        ts = 0
        try:
            ts = parsedate_to_datetime(quando).timestamp()
        except Exception:
            pass
        saida.append({
            "titulo": titulo, "link": link, "fonte": nome, "daCasa": daCasa,
            "quando": ts, "categorias": cats[:6],
            "resumo": texto("description")[:220],
        })
    return saida


def coleta():
    with ThreadPoolExecutor(max_workers=len(FONTES)) as ex:
        listas = list(ex.map(busca, FONTES))
    tudo, vistos = [], set()
    for lista in listas:
        for it in lista:
            chave = sem_acento(it["titulo"])[:70]
            if chave in vistos:
                continue
            vistos.add(chave)
            tudo.append(it)
    return tudo


def tem(palavra, texto):
    """Casa palavra inteira, nao pedaco de outra.

    Sem isto "lista" casa dentro de "analista" e "emprego" dentro de
    "desemprego", e a pauta entra no perfil errado por acidente de grafia.
    """
    return re.search(r"\b" + re.escape(palavra) + r"\b", texto) is not None


def pontua(item, perfil):
    p = PERFIS[perfil]
    # So o TITULO decide do que a materia trata. A categoria de portal e
    # taxonomia larga — uma nota sobre verbas de ministerio vinha marcada
    # "Previdencia" e virava pauta de gestao de patrimonio. Categoria e resumo
    # somam ponto, mas nao definem assunto.
    assunto = sem_acento(item["titulo"])
    campo = assunto + " " + sem_acento(
        " ".join(item["categorias"]) + " " + item["resumo"])
    for palavra in p.get("fora", []):
        if tem(palavra, campo):
            return -1                   # assunto que nao e desse perfil
    ctx = p.get("contexto")
    if ctx and not any(tem(c, campo) for c in ctx):
        return -1                       # fora do terreno do perfil
    nota, centrais = 0, 0
    for palavra in p["forte"]:
        if tem(palavra, assunto):
            nota += 3
            centrais += 1
        elif tem(palavra, campo):
            nota += 1                   # citado de passagem, nao e o assunto
    for palavra in p["fraco"]:
        if tem(palavra, campo):
            nota += 1
    # exige acerto no tema central. So com termos fracos passavam materias
    # que tangenciam tudo e nao sao de ninguem: "Caixa aciona TST contra
    # greve" entrava no perfil de patrimonio por juntar tres tangentes.
    if p["forte"] and not centrais:
        return -1
    if item["daCasa"]:
        nota += 2                       # material da propria casa vem antes
    # recencia: vale ate 4 pontos, caindo ao longo de dois dias
    if item["quando"]:
        # o feed do Valor marca a hora ~3h adiantada; data no futuro vira 0
        # em vez de virar bonus, e a tela mostra "agora"
        horas = max(0.0, (time.time() - item["quando"]) / 3600.0)
        if horas < 48:
            nota += max(0, 4 - horas / 12.0)
    return nota


def monta(perfis):
    tudo = coleta()
    saida = {}
    for perfil in perfis:
        if perfil not in PERFIS:
            continue
        exige = bool(PERFIS[perfil]["forte"])
        so_dia = bool(PERFIS[perfil].get("soDoDia"))
        marcados = []
        for it in tudo:
            n = pontua(it, perfil)
            # perfil com tema proprio so mostra o que casou com o tema;
            # o de noticia aceita tudo e ordena por recencia
            if exige and n < 3:
                continue
            # perfil de noticia nao publica guia antigo como se fosse do dia
            if so_dia and (not it["quando"] or
                           time.time() - it["quando"] > ATEMPORAL):
                continue
            marcados.append((n, it))
        # noticia do dia na frente; guia antigo entra como tema atemporal,
        # que e bom carrossel mas nao pode se passar por novidade
        agora = time.time()
        for i, (n, it) in enumerate(marcados):
            it["tipo"] = ("dia" if it["quando"] and agora - it["quando"] < ATEMPORAL
                          else "atemporal")
        marcados.sort(key=lambda x: (x[1]["tipo"] != "dia", -x[0], -x[1]["quando"]))
        saida[perfil] = [{
            "titulo": it["titulo"], "link": it["link"], "fonte": it["fonte"],
            "quando": it["quando"], "categorias": it["categorias"],
            "tipo": it["tipo"], "casa": bool(it["daCasa"]),
        } for _, it in marcados[:MAX_POR_PERFIL]]
    return saida


class handler(BaseHTTPRequestHandler):
    def _responde(self, codigo, payload, cache=False):
        corpo = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(codigo)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(corpo)))
        if cache:
            self.send_header("Cache-Control",
                             "public, s-maxage=%d, stale-while-revalidate=3600" % CACHE)
        else:
            self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(corpo)

    def do_GET(self):
        pedido = ""
        if "?" in self.path:
            for par in self.path.split("?", 1)[1].split("&"):
                if par.startswith("perfil="):
                    pedido = par[7:]
        perfis = [p for p in pedido.split(",") if p in PERFIS] or list(PERFIS)
        try:
            dados = monta(perfis)
        except Exception as e:
            return self._responde(502, {"erro": "falha ao ler as fontes",
                                        "detalhe": type(e).__name__})
        vazio = all(not v for v in dados.values())
        self._responde(200, {
            "pautas": dados,
            "escopos": {k: PERFIS[k]["escopo"] for k in perfis},
            "fontes": [n for n, _, _ in FONTES],
            "gerado": int(time.time()),
            "aviso": "nenhuma fonte respondeu" if vazio else "",
        }, cache=not vazio)
