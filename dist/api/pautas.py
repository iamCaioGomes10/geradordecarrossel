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
    # E-Investidor devolve 403 para agente identificado. Nao insistimos
    # disfarcando o pedido de navegador: quem bloqueia bot esta avisando.
]

# O que cada perfil fala. As palavras foram tiradas das categorias que os
# proprios feeds usam, nao inventadas: FIIs, Negocios, Financas Pessoais...
PERFIS = {
    "baroni": {
        "nome": "@ProfessorBaroni",
        "forte": ["fii", "fiis", "fundo imobiliario", "fundos imobiliarios",
                  "dividendo", "renda passiva", "aluguel", "laje", "galpao",
                  "cri", "tijolo", "papel"],
        "fraco": ["renda fixa", "selic", "juros", "imovel"],
        "fora": [],
    },
    "funds": {
        "nome": "@fundsexplorer",
        "forte": ["fii", "fiis", "fundo imobiliario", "fundos imobiliarios",
                  "vacancia", "cri", "galpao", "laje", "shopping", "logistica",
                  "dividendo"],
        "fraco": ["imovel", "construcao", "ifix"],
        "fora": [],
    },
    "suno": {
        "nome": "@suno",
        "forte": ["mercado", "acoes", "bolsa", "ibovespa", "b3", "investir",
                  "carteira", "renda fixa", "selic"],
        "fraco": ["economia", "juros", "cambio", "dolar"],
        "fora": [],
    },
    "tiago": {
        "nome": "@tiagogreis",
        "forte": ["empresa", "negocios", "lucro", "balanco", "resultado",
                  "longo prazo", "buffett", "valuation", "acionista"],
        "fraco": ["acoes", "dividendo", "mercado"],
        "fora": ["fundo imobiliario", "fiis"],
    },
    "noticias": {
        "nome": "@sunonoticias",
        "forte": [],          # perfil de noticia: vale o que for mais recente
        "fraco": [],
        "fora": [],
    },
    "consultoria": {
        "nome": "@SunoConsultoria",
        "forte": ["planejamento", "previdencia", "sucessao", "patrimonio",
                  "aposentadoria", "financas pessoais", "imposto", "tributacao"],
        "fraco": ["carteira", "investir", "renda fixa"],
        "fora": ["fundo imobiliario", "fiis"],
    },
    "danielle": {
        "nome": "@daniellelopesn",
        "forte": ["financas pessoais", "orcamento", "divida", "consumo",
                  "salario", "custo de vida", "poupar", "economia domestica"],
        "fraco": ["economia", "inflacao", "credito"],
        "fora": ["fundo imobiliario", "fiis", "ibovespa", "balanco"],
    },
    "status": {
        "nome": "@status.invest",
        "forte": ["indicador", "balanco", "resultado", "lucro", "acoes",
                  "dividend yield", "valuation", "comparar", "b3"],
        "fraco": ["mercado", "bolsa", "empresa"],
        "fora": ["fundo imobiliario"],
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


def pontua(item, perfil):
    p = PERFIS[perfil]
    campo = sem_acento(item["titulo"] + " " + " ".join(item["categorias"]) +
                       " " + item["resumo"])
    for palavra in p.get("fora", []):
        if palavra in campo:
            return -1                   # assunto que nao e desse perfil
    nota = 0
    for palavra in p["forte"]:
        if palavra in campo:
            nota += 3
    for palavra in p["fraco"]:
        if palavra in campo:
            nota += 1
    # sem nenhum acerto de tema nao ha pauta: o bonus de casa mais o de
    # recencia sozinhos passavam qualquer materia nova adiante
    if p["forte"] and nota == 0:
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
        marcados = []
        for it in tudo:
            n = pontua(it, perfil)
            # perfil com tema proprio so mostra o que casou com o tema;
            # o de noticia aceita tudo e ordena por recencia
            if exige and n < 3:
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
            "tipo": it["tipo"],
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
            "fontes": [n for n, _, _ in FONTES],
            "gerado": int(time.time()),
            "aviso": "nenhuma fonte respondeu" if vazio else "",
        }, cache=not vazio)
