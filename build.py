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
}
js_assets = "window.__ASSETS__={" + ",".join('%s:"%s"' % kv for kv in assets.items()) + "};"

html = (SRC / "index.html").read_text(encoding="utf-8")
html = html.replace("/*__CSS__*/", (SRC / "style.css").read_text(encoding="utf-8"))
html = html.replace("/*__ASSETS__*/", js_assets)
html = html.replace("/*__JS__*/", (SRC / "app.js").read_text(encoding="utf-8"))

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
    (dist / "favicon.svg").write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
        '<rect width="64" height="64" rx="12" fill="#0d0f11"/>'
        '<rect x="14" y="12" width="26" height="34" rx="4" fill="#1d9bf0"/>'
        '<rect x="30" y="18" width="26" height="34" rx="4" fill="#e9ecef"/>'
        '</svg>\n', encoding="utf-8")
    # CSP fechada: o app nao busca nada na rede e nao manda nada para lugar nenhum
    csp = ("default-src 'none'; "
           "img-src 'self' data: blob:; "
           "style-src 'self' 'unsafe-inline'; "
           "script-src 'self' 'unsafe-inline'; "
           "font-src 'self' data:; "
           "connect-src 'none'; "
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
        "headers": [
            {"source": "/(.*)", "headers": seguranca},
            {"source": "/", "headers": sem_cache},
            {"source": "/index.html", "headers": sem_cache},
        ],
    }
    (dist / "vercel.json").write_text(json.dumps(vercel, indent=2, ensure_ascii=False) + "\n",
                                      encoding="utf-8")
    total = sum(f.stat().st_size for f in dist.iterdir())
    print("ok -> dist/ (%d arquivos, %.0f KB)" % (len(list(dist.iterdir())), total / 1024))
    for f in sorted(dist.iterdir()):
        print("     %s  %.0f KB" % (f.name, f.stat().st_size / 1024))
    raise SystemExit

OUT.write_text(html, encoding="utf-8")
print("ok -> %s (%.0f KB)" % (OUT.name, OUT.stat().st_size / 1024))
