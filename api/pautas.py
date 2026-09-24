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
    # negocios, marca e tecnologia: os veiculos de mercado quase nao cobrem, e
    # e disso que o Tiago, o @suno e o Status Invest vivem fora do pregao.
    ("NeoFeed",        "https://neofeed.com.br/feed/", False),
    ("Brazil Journal", "https://braziljournal.com/feed/", False),
    ("Meio e Mensagem","https://www.meioemensagem.com.br/feed", False),
    ("Forbes Brasil",  "https://forbes.com.br/feed/", False),
    # E-Investidor devolve 403 para agente identificado. Nao insistimos
    # disfarcando o pedido de navegador: quem bloqueia bot esta avisando.
    # G1 Brasil funciona mas e regional demais ("Batalha de Rap em Macapa"):
    # nao e assunto do Brasil que influencia mercado. Startups.com.br responde,
    # mas e quase so troca de cargo em fundo pequeno — dentro demais do setor.
    # Exame por secao, InfoMoney Negocios, Bloomberg Linea, Tecmundo e Valor
    # Empresas respondem 200 com zero item: a URL existe, o feed nao.
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
# Vocabulario de "cenario fora do mercado": marca, esporte, tecnologia e
# consumo. Nao saiu de palpite — saiu de ler o que os perfis publicam. O
# Tiago deu BREAKING em Mbappe trocando a Nike pela On; o @suno explicou
# por que BTG, Nubank e Itau se interessam pela arena do Palmeiras e quanta
# energia um data center de IA consome; o Status Invest falou das dividas de
# Sao Paulo, Corinthians e Santos. Nada disso casava com jargao de mercado.
FORA_DO_MERCADO = [
    "marca", "marcas", "patrocinio", "patrocinador", "contrato",
    "futebol", "clube", "clubes", "estadio", "arena", "olimpiadas", "esporte",
    # manchete de futebol costuma so nomear o time: "Sao Paulo, Corinthians e
    # Santos ficam sem titulos" nao traz a palavra futebol em lugar nenhum.
    # Ficam de fora os nomes que sao tambem cidade ou estado (Sao Paulo,
    # Santos, Internacional, Bahia), que trariam ruido demais.
    "flamengo", "corinthians", "palmeiras", "vasco", "gremio", "cruzeiro",
    "botafogo", "fluminense", "athletico", "libertadores", "brasileirao",
    "copa do mundo", "cbf", "fifa", "neymar", "mbappe",
    "nike", "adidas", "apple", "iphone", "google", "amazon", "netflix",
    "streaming", "inteligencia artificial", "data center", "chip", "chips",
    "tecnologia", "startup", "unicornio", "ceo", "fundador", "aquisicao",
    "fusao", "demissoes", "varejo", "consumo", "consumidor",
    "luxo", "turismo", "viagem", "alimento", "alimentos", "energia",
    "qualidade de vida", "salario minimo", "curiosidade"
]

# Boletim diario de cotacao. Nenhum dos oito perfis publica "Ibovespa fecha em
# queda" — olhei os oito. Mas esse tipo de materia sai o dia inteiro e chega
# sempre mais nova, entao ocupava as oito vagas e enterrava a pauta que presta.
# Nao e descarte: e rebaixamento, para continuar disponivel num dia fraco.
ROTINA = [
    "ao vivo", "hoje ao vivo", "fecha em queda", "fecha em alta",
    "fecha negativo", "fecha positivo", "fecha estavel", "abre em alta",
    "abre em queda", "renda fixa hoje", "tesouro direto hoje", "dolar hoje",
    "cambio hoje", "mercados hoje", "veja a cotacao", "confira a cotacao",
    "pre-mercado", "pre mercado", "antes da abertura", "giro do mercado",
    "fechamento do mercado", "resumo do mercado",
]

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
        "escopo": "Cenario nacional e internacional do mercado financeiro e "
                  "acontecimentos que dao para explicar ou noticiar, inclusive "
                  "fora do mercado: negocios, marcas, tecnologia e sociedade.",
        "forte": ["mercado", "acoes", "bolsa", "ibovespa", "b3", "investir",
                  "carteira", "renda fixa", "selic", "copom", "banco central",
                  "fed", "wall street", "nasdaq", "s&p", "estados unidos",
                  "china", "europa", "juros", "eleicoes", "governo",
                  "ranking"],
        "cultura": FORA_DO_MERCADO,
        "fraco": ["economia", "cambio", "dolar", "inflacao", "petroleo",
                  "commodities", "pib", "empresa", "empresas"],
        "fora": [],
    },
    "tiago": {
        "nome": "@tiagogreis",
        "escopo": "Autoridade de mercado, graficos, rankings e opinioes sobre "
                  "acontecimentos — inclusive de negocios e marcas fora do "
                  "mercado, quando ha numero para comparar.",
        "forte": ["ranking", "maiores", "melhores", "top", "comparativo",
                  "valuation", "buffett", "longo prazo", "recorde",
                  "potencial de alta", "projecao", "analistas", "grafico",
                  "disparam", "desabam"],
        "cultura": FORA_DO_MERCADO,
        # o assunto precisa tocar o mundo dos negocios: sem isto, "formalizacao
        # bate recorde" entrava so por casar com "recorde"
        "contexto": ["acao", "acoes", "bolsa", "ibovespa", "b3", "mercado",
                     "empresa", "empresas", "negocio", "negocios", "marca",
                     "investidor", "investidores", "papel", "papeis",
                     "acionista", "lucro", "balanco", "receita", "faturamento",
                     "dividendo", "dividendos", "fundo", "juros", "dolar",
                     "contrato", "patrocinio", "clube", "setor", "consumidor",
                     "preco", "bilhao", "bilhoes", "milhoes"],
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
        "escopo": "Mercado de acoes, politica e cenario amplo, com abertura "
                  "para conteudo menos tecnico e mais entretenimento: "
                  "futebol, marcas, habitos e curiosidades com numero.",
        "forte": ["acoes", "bolsa", "ibovespa", "b3", "politica", "eleicoes",
                  "governo", "congresso", "senado", "camara", "stf",
                  "banco central", "copom", "ministro", "dividendos",
                  "balanco", "resultado", "ranking", "ebitda",
                  "dividend yield", "provento", "proventos"],
        "cultura": FORA_DO_MERCADO,
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


# ---------- agrupamento por assunto ----------
# Uma pauta nao e uma manchete: e um assunto. E o sinal de que um assunto esta
# quente nao esta em nenhuma manchete isolada — esta na repeticao. Ontem a Meta
# apresentou oculos novos e cinco materias em tres veiculos falaram disso; cada
# uma, sozinha, pontuava como qualquer outra.
VAZIAS = set("""
para com que dos das nos nas pelo pela sobre como onde quando ainda apos
mais menos muito pouco entre desde sem seu sua seus suas este esta esses essas
aquele aquela isso aquilo tem tera teve sera sao foi fui era eram estao esta
veja confira entenda saiba diz disse dizem anuncia pode podem deve quem qual
quais quanto quantos porque porem entao assim ainda apenas tambem sobre contra
nova novo apos antes durante segundo diante frente
devem vai vao fica ficam bilhao bilhoes milhoes milhao mil ano anos mes meses
dia dias semana hoje ontem agora novo nova novos novas maior menor primeiro
""".split())
MIN_LETRAS = 4          # palavra curta liga assunto que nao tem nada a ver
TETO_COMUM = 9          # acima disso a palavra e generica, nao e assunto
QUENTE = 3              # veiculos distintos a partir dos quais o assunto e quente


def caixa_alta(titulo):
    """Titulo escrito Todo Em Caixa Alta, como a Forbes faz sempre."""
    ws = re.findall(r"[A-Za-z\u00c0-\u00ff]{2,}", titulo)
    if len(ws) < 4:
        return False
    return sum(1 for w in ws if w[:1].isupper()) / float(len(ws)) > 0.6


def proprios(titulo):
    """Nomes proprios: maiuscula fora do inicio da frase.

    Nao vale nos titulos em Caixa Alta, onde tudo e maiusculo e o sinal
    desaparece. Por isso o vocabulario e aprendido nos veiculos que escrevem
    normal e depois aplicado em todos — assim a Forbes tambem entra nos
    assuntos, sem precisar de lista de marcas escrita a mao.
    """
    if caixa_alta(titulo):
        return set()
    achados = set()
    for bruto in re.split(r"\s+", titulo):
        palavra = re.sub(r"^[^\w\u00c0-\u00ff]+|[^\w\u00c0-\u00ff]+$", "", bruto)
        # a primeira palavra entra tambem: o sujeito da manchete costuma ser
        # justamente o nome que importa ("Meta lanca oculos", "Amazon barra").
        # Descartar o inicio da frase custava o assunto principal do dia.
        if palavra and palavra[:1].isupper() and len(palavra) >= 3:
            achados.add(sem_acento(palavra))
    return achados


def tickers(titulo):
    return {t.lower() for t in re.findall(r"\b[A-Z]{4}\d{1,2}\b", titulo)}


def vocabulario(itens):
    """O que conta como assunto: nome proprio visto em veiculo bem escrito."""
    voc = set()
    for it in itens:
        voc |= proprios(it["titulo"]) | tickers(it["titulo"])
    return {w for w in voc if w not in VAZIAS and len(w) >= MIN_LETRAS}


def palavras(titulo, voc):
    cru = set(re.findall(r"[a-z0-9]+", sem_acento(titulo)))
    return cru & voc


def agrupa(itens):
    """Junta em assuntos os itens que compartilham uma palavra pouco comum.

    Sem lista de nomes proprios e sem depender de maiuscula — a Forbes escreve
    todo titulo em Caixa Alta e isso sozinho derrubaria qualquer heuristica de
    nome proprio. O que sobra e frequencia: palavra que aparece em duas a nove
    materias e especifica o bastante para ser assunto.
    """
    voc = vocabulario(itens)
    for it in itens:
        it["_p"] = palavras(it["titulo"], voc)
    freq = {}
    for it in itens:
        for w in it["_p"]:
            freq[w] = freq.get(w, 0) + 1
    # palavra util: nem unica (nao liga nada) nem comum demais (liga tudo)
    util = {w for w, n in freq.items() if 2 <= n <= TETO_COMUM}

    ondes = {}
    for w in util:
        ondes[w] = [it for it in itens if w in it["_p"]]
    # o assunto mais quente primeiro: quantos veiculos distintos falaram dele
    ordem = sorted(ondes, key=lambda w: (-len(set(i["fonte"] for i in ondes[w])),
                                         -len(ondes[w])))
    # Um item pode pertencer a mais de um assunto: "Amazon barra agente da
    # Meta" e das duas. Retirar o item do primeiro assunto que o pega partia a
    # Meta em quatro materias soltas justamente no dia do evento dela. A
    # repeticao se resolve depois, ao montar a lista.
    grupos = []
    for w in ordem:
        if len(ondes[w]) < 2:
            continue
        grupos.append({"chave": w, "itens": list(ondes[w])})
    cobertos = {id(i) for g in grupos for i in g["itens"]}
    for it in itens:
        if id(it) not in cobertos:
            grupos.append({"chave": None, "itens": [it]})
    for g in grupos:
        g["itens"].sort(key=lambda i: -(i["quando"] or 0))
        g["veiculos"] = len(set(i["fonte"] for i in g["itens"]))
        g["quente"] = g["veiculos"] >= QUENTE
    return grupos


def marca_tipo(itens):
    agora = time.time()
    for it in itens:
        it["tipo"] = ("dia" if it["quando"] and agora - it["quando"] < ATEMPORAL
                      else "atemporal")


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
    if any(tem(r, assunto) for r in ROTINA):
        # -8 e nao -5: o boletim casa com quatro temas de uma vez ("Ibovespa
        # oscila com politica monetaria, eleicoes e exterior") e liderava
        # mesmo penalizado. Ainda aparece num dia fraco, no fim da lista.
        nota_rotina = -8                # rebaixa, nao descarta
    else:
        nota_rotina = 0
    ctx = p.get("contexto")
    if ctx and not any(tem(c, campo) for c in ctx):
        return -1                       # fora do terreno do perfil
    nota, centrais = 0, 0
    # cenario fora do mercado — marca, esporte, tecnologia, consumo — pesa
    # mais que tema central. Sem isso a pauta boa existe mas nunca aparece:
    # boletim de Ibovespa sai o dia inteiro e sempre chega mais novo.
    for palavra in p.get("cultura", []):
        if tem(palavra, assunto):
            nota += 6
            centrais += 1
            break
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
    nota += nota_rotina
    # recencia: vale ate 4 pontos, caindo ao longo de dois dias
    if item["quando"]:
        # o feed do Valor marca a hora ~3h adiantada; data no futuro vira 0
        # em vez de virar bonus, e a tela mostra "agora"
        horas = max(0.0, (time.time() - item["quando"]) / 3600.0)
        if horas < 48:
            nota += max(0, 4 - horas / 12.0)
    return nota


def eh_geral(item, perfil):
    """A pauta entra pelo gancho de fora do mercado?"""
    cult = PERFIS[perfil].get("cultura") or []
    if not cult:
        return False
    assunto = sem_acento(item["titulo"])
    return any(tem(c, assunto) for c in cult)


def monta(perfis):
    tudo = coleta()
    marca_tipo(tudo)
    grupos = agrupa(tudo)
    agora = time.time()
    saida = {}
    for perfil in perfis:
        if perfil not in PERFIS:
            continue
        exige = bool(PERFIS[perfil]["forte"])
        so_dia = bool(PERFIS[perfil].get("soDoDia"))
        gerais, mercado, vistos = [], [], set()

        # Assunto que varios veiculos cobriram no mesmo dia e pauta, com ou sem
        # palavra conhecida. Lista escrita a mao so pega o que alguem pensou em
        # escrever: o evento da Meta caiu fora com nota -1 porque "Meta" nao
        # estava nela. O calor nao depende do meu vocabulario, e por isso pega
        # o assunto de amanha que ninguem previu.
        aceita_calor = bool(PERFIS[perfil].get("cultura"))

        for g in grupos:
            notas = []
            por_calor = aceita_calor and g["quente"]
            for it in g["itens"]:
                n = pontua(it, perfil)
                if n < 0 and por_calor:
                    n = 2.0             # entra pelo calor, atras de quem casou
                if exige and n < 3 and not por_calor:
                    continue
                if n < 0:
                    continue
                if so_dia and (not it["quando"] or agora - it["quando"] > ATEMPORAL):
                    continue
                notas.append((n, it))
            if not notas:
                continue
            notas.sort(key=lambda x: (-x[0], -(x[1]["quando"] or 0)))
            ordenadas = [it for _, it in notas]
            melhor = notas[0][1]
            # Calor: quantos veiculos distintos falaram do assunto. E o unico
            # sinal honesto de "esta se falando disso agora" que da para ler
            # de um feed — ninguem publica quanto engajou.
            nota = notas[0][0] + min(g["veiculos"], 5) * 2.0
            ligadas = [it for _, it in notas[1:] if it["link"] != melhor["link"]][:3]
            alvo = gerais if eh_geral(melhor, perfil) else mercado
            alvo.append((nota, g, melhor, ligadas, ordenadas))

        for lista in (gerais, mercado):
            lista.sort(key=lambda x: (-x[0], -(x[2]["quando"] or 0)))

        # Mistura: um de cada lado, alternando. Sem isso o lado mais numeroso
        # toma a lista inteira — foi o que aconteceu nos dois sentidos, primeiro
        # so mercado, depois so marca.
        def desembrulha(cand):
            """Melhor materia ainda nao usada deste assunto.

            Descartar o assunto inteiro porque a manchete principal ja saiu em
            outro apagava a Meta da lista: a materia que a representava tinha
            sido levada pelo assunto Amazon, e as outras quatro sumiam junto.
            """
            _, g, _, _, ordenadas = cand
            livres = [x for x in ordenadas if x["link"] not in vistos]
            if not livres:
                return None
            principal = livres[0]
            lig = [x for x in ordenadas[:6]
                   if x["link"] != principal["link"] and x["link"] not in vistos][:3]
            return (g, principal, lig)

        escolhidos, i, j = [], 0, 0
        while len(escolhidos) < MAX_POR_PERFIL and (i < len(gerais) or j < len(mercado)):
            avancou = False
            for lado in ("geral", "mercado"):
                lista = gerais if lado == "geral" else mercado
                k = i if lado == "geral" else j
                while k < len(lista) and len(escolhidos) < MAX_POR_PERFIL:
                    pronto = desembrulha(lista[k])
                    k += 1
                    if not pronto:
                        continue
                    g, principal, lig = pronto
                    escolhidos.append((g, principal, lig))
                    vistos.add(principal["link"])
                    for x in lig:
                        vistos.add(x["link"])
                    avancou = True
                    break
                if lado == "geral":
                    i = k
                else:
                    j = k
            if not avancou:
                break

        saida[perfil] = [{
            "titulo": m["titulo"], "link": m["link"], "fonte": m["fonte"],
            "quando": m["quando"], "categorias": m["categorias"],
            "tipo": m.get("tipo", "dia"), "casa": bool(m["daCasa"]),
            "quente": g["quente"], "veiculos": g["veiculos"],
            "ligadas": [{"titulo": x["titulo"], "fonte": x["fonte"],
                         "link": x["link"]} for x in lig],
        } for g, m, lig in escolhidos]
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
