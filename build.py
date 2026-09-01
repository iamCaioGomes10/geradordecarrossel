#!/usr/bin/env python3
"""Empacota src/ + assets/ num unico HTML.

  python3 build.py              -> gerador-carrossel.html  (abre com duplo clique)
  python3 build.py --artifact   -> artifact.html           (para publicar no claude.ai;
                                   sem doctype/html/head/body, que o Artifact injeta)
  python3 build.py --static     -> dist/                   (pasta pronta para qualquer
                                   host estatico; nada especifico de fornecedor)
"""
import base64, json, pathlib, re, sys

ROOT = pathlib.Path(__file__).parent
SRC, ASSETS = ROOT / "src", ROOT / "assets"
ARTIFACT = "--artifact" in sys.argv
STATIC = "--static" in sys.argv
OUT = ROOT / ("artifact.html" if ARTIFACT else "gerador-carrossel.html")

def b64(p):
    return base64.b64encode((ASSETS / p).read_bytes()).decode()

assets = {
    "inter":       b64("inter.woff2"),
    "staatliches": b64("staatliches.woff2"),
    "avatar":      b64("avatar.png"),
    "badge":       b64("badge.png"),
    "nameSvg":     b64("nome-light.svg"),    # fill="black"   -> recolorido em runtime
    "handleSvg":   b64("handle-light.svg"),  # fill="#6F7377" -> recolorido em runtime
    "poppins":     b64("poppins.woff2"),
    "sunoLogo":    b64("suno-logo-white.png"),
    "trAvatar":    b64("tr-avatar.png"),
    "trBadge":     b64("tr-badge.png"),
    "trNomeSvg":   b64("tr-nome-light.svg"),    # fill="black"   -> recolorido em runtime
    "trHandleSvg": b64("tr-handle-light.svg"),  # fill="#868686" -> recolorido em runtime
    "caladea400":  b64("caladea-400.woff2"),
    "caladea700":  b64("caladea-700.woff2"),
    "snAvatar":    b64("sn-avatar.png"),
    "snBadge":     b64("sn-badge.png"),
    "snNomeSvg":   b64("sn-nome-light.svg"),
    "snHandleSvg": b64("sn-handle-light.svg"),
    "snRasgoTopo": b64("sn-rasgo-topo.png"),
    "snRasgoBase": b64("sn-rasgo-base.png"),
    "snTextura":   b64("sn-textura.jpg"),
    "montserrat":  b64("montserrat.woff2"),
    "coLogoCapa":  b64("co-logo-capa.svg"),
    "coLogoRed":   b64("co-logo-red.svg"),
    "coArrow":     b64("co-arrow.svg"),
    "coGlow":      b64("co-glow.svg"),
    "afacad":      b64("afacad.woff2"),
    "instrument":  b64("instrument-sans.woff2"),
    "feLogo":      b64("fe-logo.png"),
    "feBadge":     b64("fe-badge.png"),
    "feEllipse":   b64("fe-ellipse.svg"),
    "feSeta1":     b64("fe-seta1.svg"),
    "feSeta2":     b64("fe-seta2.svg"),
    "feNomeSvg":   b64("fe-nome-light.svg"),    # fill="#1F1F1F" -> recolorido
    "feHandleSvg": b64("fe-handle-light.svg"),
    "sdMarca":       b64("sd-marca.png"),
    "sdMarcaSm":     b64("sd-marca-sm.png"),
    "sdWordmark":    b64("sd-wordmark.svg"),
    "sdAi":          b64("sd-ai.png"),
    "sdIcIdeias":    b64("sd-ic-ideias.png"),
    "sdIcCarrossel": b64("sd-ic-carrossel.png"),
    "sdIcBiblioteca":b64("sd-ic-biblioteca.png"),
}
js_assets = "window.__ASSETS__={" + ",".join('%s:"%s"' % kv for kv in assets.items()) + "};"

html = (SRC / "index.html").read_text(encoding="utf-8")
html = html.replace("/*__CSS__*/", (SRC / "style.css").read_text(encoding="utf-8"))
html = html.replace("/*__ASSETS__*/", js_assets)
html = html.replace("/*__JS__*/", (SRC / "app.js").read_text(encoding="utf-8"))
# icone da aba: a marca Suno Design embutida, para valer nos tres empacotamentos
# (o arquivo solto nao tem pasta ao lado de onde buscar um favicon separado)
html = html.replace(
    '<link rel="icon" href="favicon.svg" type="image/svg+xml">',
    '<link rel="icon" href="data:image/png;base64,%s" type="image/png">' % assets["sdMarca"])

if ARTIFACT:
    # o Artifact envolve o conteudo no proprio esqueleto de documento
    titulo = re.search(r"<title>.*?</title>", html, re.S).group(0)
    corpo = html[html.index("<body>") + len("<body>"): html.rindex("</body>")]
    estilo = re.search(r"<style>.*?</style>", html, re.S).group(0)
    html = titulo + "\n" + estilo + "\n" + corpo.strip() + "\n"

if STATIC:
    dist = ROOT / "dist"
    dist.mkdir(exist_ok=True)
    # ferramenta interna: fora do indice de busca por padrao
    html = html.replace("<head>", '<head>\n<meta name="robots" content="noindex, nofollow">', 1)
    (dist / "index.html").write_text(html, encoding="utf-8")
    (dist / "robots.txt").write_text("User-agent: *\nDisallow: /\n", encoding="utf-8")
    # tambem solto, para quem pedir /favicon.png na mao
    (dist / "favicon.png").write_bytes((ASSETS / "sd-marca.png").read_bytes())
    # a funcao de geracao entra no dist porque a Vercel esta com Root Directory
    # apontado para ca: o que fica fora desta pasta o deploy nao ve
    api_src, api_dst = ROOT / "api", dist / "api"
    api_dst.mkdir(exist_ok=True)
    for py in sorted(api_src.glob("*.py")):
        (api_dst / py.name).write_bytes(py.read_bytes())
    (dist / "requirements.txt").write_bytes((ROOT / "requirements.txt").read_bytes())
    # CSP fechada: o app nao busca nada na rede e nao manda nada para lugar nenhum
    csp = ("default-src 'none'; "
           "img-src 'self' data: blob:; "
           "style-src 'self' 'unsafe-inline'; "
           "script-src 'self' 'unsafe-inline'; "
           "font-src 'self' data:; "
           "connect-src 'self'; "   # a geracao por prompt fala com /api/gerar
           "base-uri 'none'; "
           "form-action 'none'; "
           "frame-ancestors 'none'")
    seguranca = [
        {"key": "Content-Security-Policy", "value": csp},
        {"key": "X-Content-Type-Options", "value": "nosniff"},
        {"key": "Referrer-Policy", "value": "no-referrer"},
        {"key": "Permissions-Policy",
         "value": "camera=(), microphone=(), geolocation=(), payment=(), usb=()"},
        {"key": "X-Robots-Tag", "value": "noindex, nofollow"},
    ]
    # o app inteiro e um arquivo so: sem revalidacao, uma atualizacao demora a chegar
    sem_cache = [{"key": "Cache-Control", "value": "public, max-age=0, must-revalidate"}]
    vercel = {
        "$schema": "https://openapi.vercel.sh/vercel.json",
        # escrever um carrossel com o modelo pensando leva mais que os poucos
        # segundos do padrao; sem isso a funcao morre no meio da geracao
        "functions": {"api/gerar.py": {"maxDuration": 120}},
        "headers": [
            {"source": "/(.*)", "headers": seguranca},
            {"source": "/", "headers": sem_cache},
            {"source": "/index.html", "headers": sem_cache},
        ],
    }
    (dist / "vercel.json").write_text(json.dumps(vercel, indent=2, ensure_ascii=False) + "\n",
                                      encoding="utf-8")
    arquivos = [f for f in dist.iterdir() if f.is_file()]
    total = sum(f.stat().st_size for f in arquivos)
    print("ok -> dist/ (%d arquivos, %.0f KB)" % (len(arquivos), total / 1024))
    for f in sorted(arquivos):
        print("     %s  %.0f KB" % (f.name, f.stat().st_size / 1024))
    for f in sorted(api_dst.iterdir()):
        print("     api/%s  %.0f KB" % (f.name, f.stat().st_size / 1024))
    raise SystemExit

OUT.write_text(html, encoding="utf-8")
print("ok -> %s (%.0f KB)" % (OUT.name, OUT.stat().st_size / 1024))
