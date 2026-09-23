# -*- coding: utf-8 -*-
"""Texto de uma materia da Suno, para montar rascunho de carrossel.

O feed da casa traz o artigo inteiro em <content:encoded>, entao nao ha
raspagem de pagina: le-se o mesmo canal de distribuicao que qualquer leitor
de RSS le.

So material da propria Suno. Levar o corpo de uma materia do InfoMoney ou do
Valor para dentro de um carrossel da Suno seria usar texto de terceiro como
se fosse nosso — problema de direito autoral, nao detalhe tecnico. Para pauta
de fora, a manchete serve de indicacao de assunto e alguem escreve o texto.

Nada aqui e gerado: os paragrafos saem literais do artigo. Quem monta as
laminas e o navegador, que e quem sabe quantos caracteres cabem em cada campo.
"""
import html
import json
import re
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from http.server import BaseHTTPRequestHandler

AGENTE = "Mozilla/5.0 (compatible; SunoDesign/1.0; +https://suno.com.br)"
TEMPO = 8
CACHE = 900
NS = {"content": "http://purl.org/rss/1.0/modules/content/"}

# os mesmos canais da rota de pautas, limitados ao que e da casa
FONTES = [
    ("Suno Notícias", "https://www.suno.com.br/noticias/feed/"),
    ("Suno Artigos",  "https://www.suno.com.br/artigos/feed/"),
]
CASA = ("suno.com.br", "www.suno.com.br")


def da_casa(link):
    try:
        return urllib.parse.urlparse(link).netloc.lower() in CASA
    except Exception:
        return False


def paragrafos(bruto):
    """<content:encoded> -> lista de paragrafos em texto puro.

    O <figure> de abertura repete o titulo numa legenda e aponta para a imagem
    padrao do feed: entra como paragrafo fantasma se nao for removido antes.
    """
    t = re.sub(r"<figure[\s\S]*?</figure>", " ", bruto or "", flags=re.I)
    t = re.sub(r"<(script|style)[\s\S]*?</\1>", " ", t, flags=re.I)
    # o negrito do artigo vira o destaque do carrossel — extraido, nao inventado
    t = re.sub(r"</?(strong|b)\s*>", "**", t, flags=re.I)
    blocos = re.split(r"</p\s*>|<br\s*/?>|</h[1-6]\s*>", t, flags=re.I)
    saida = []
    for b in blocos:
        p = re.sub(r"<[^>]+>", "", b)
        p = html.unescape(p)
        p = p.replace(" ", " ")
        p = re.sub(r"\*\*\s*\*\*", "", p)          # destaque que ficou vazio
        p = re.sub(r"\s+", " ", p).strip()
        if len(p) >= 40:                            # linha solta nao e paragrafo
            saida.append(p)
    return saida


def busca(fonte):
    nome, url = fonte
    try:
        req = urllib.request.Request(url, headers={"User-Agent": AGENTE})
        with urllib.request.urlopen(req, timeout=TEMPO) as r:
            return nome, ET.fromstring(r.read())
    except Exception:
        return nome, None


def acha(link):
    alvo = link.split("?")[0].rstrip("/")
    with ThreadPoolExecutor(max_workers=len(FONTES)) as ex:
        canais = list(ex.map(busca, FONTES))
    for nome, raiz in canais:
        if raiz is None:
            continue
        for it in raiz.findall("channel/item"):
            e = it.find("link")
            atual = (e.text or "").strip() if e is not None else ""
            if atual.split("?")[0].rstrip("/") != alvo:
                continue
            corpo = it.find("content:encoded", NS)
            titulo = it.find("title")
            return {
                "titulo": html.unescape((titulo.text or "").strip()) if titulo is not None else "",
                "paragrafos": paragrafos(corpo.text if corpo is not None else ""),
                "fonte": nome,
                "link": atual,
            }
    return None


class handler(BaseHTTPRequestHandler):
    def _responde(self, codigo, payload, cache=False):
        corpo = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(codigo)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(corpo)))
        self.send_header("Cache-Control",
                         "public, s-maxage=%d, stale-while-revalidate=3600" % CACHE
                         if cache else "no-store")
        self.end_headers()
        self.wfile.write(corpo)

    def do_GET(self):
        q = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
        link = (q.get("link") or [""])[0].strip()
        if not link:
            return self._responde(400, {"erro": "falta o link"})
        if not da_casa(link):
            return self._responde(403, {
                "erro": "fora da casa",
                "recado": "O rascunho so monta com material da propria Suno. "
                          "Para pauta de outro veiculo, a manchete indica o assunto "
                          "e o texto precisa ser escrito."})
        try:
            achado = acha(link)
        except Exception as e:
            return self._responde(502, {"erro": "falha ao ler a fonte",
                                        "detalhe": type(e).__name__})
        if not achado:
            return self._responde(404, {
                "erro": "nao achei",
                "recado": "A matéria não está mais entre as recentes do feed."})
        if not achado["paragrafos"]:
            return self._responde(422, {
                "erro": "sem corpo",
                "recado": "O feed não trouxe o texto desta matéria."})
        achado["gerado"] = int(time.time())
        self._responde(200, achado, cache=True)
