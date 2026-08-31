#!/usr/bin/env python3
"""Junta as partes do protótipo num HTML único."""
import pathlib, re

AQUI = pathlib.Path(__file__).parent

def miolo(arq, bridge=False):
    s = (AQUI / arq).read_text(encoding='utf-8')
    s = s.replace('<script>', '').replace('</script>', '')
    s = re.sub(r'^\s*\(function \(\) \{\s*\n\s*"use strict";\s*\n', '', s)
    s = re.sub(r'\}\)\(\);\s*$', '', s.rstrip())
    if bridge:
        s = re.sub(r'\s*var e = window\.__E[^;]*;\s*\n', '\n', s)
        s = re.sub(r'\s*var \$ = function \(id\)[^;]*;\s*\n', '\n', s)
        s = re.sub(r'\s*function esc\(s\)[\s\S]*?\}\n', '\n', s, count=1)
        s = re.sub(r'\s*window\.__arte[\s\S]*$', '\n', s)
    return s

comuns = '''
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
'''
js = ('<script>\n(function () {\n  "use strict";\n' + comuns
      + miolo('proto-js.part') + "\n" + miolo('proto-js2.part', True) + "\n"
      + (AQUI / 'proto-js3.part').read_text(encoding='utf-8') + "\n})();\n</script>\n")
js = js.replace('__FOTO__', (AQUI / 'foto-amostra.b64').read_text(encoding='utf-8').strip())
# assets reais do app, num bloco só
ativos = (AQUI / 'ativos.json').read_text(encoding='utf-8')
js = js.replace('  var FOTO = "data:image/jpeg;base64,',
                '  var AT = ' + ativos + ';\n  var FOTO = "data:image/jpeg;base64,')

pagina = ((AQUI / 'proto-head.part').read_text(encoding='utf-8')
          + (AQUI / 'proto-body.part').read_text(encoding='utf-8') + js)
(AQUI / 'mesa-de-trabalho.html').write_text(pagina, encoding='utf-8')
print("ok -> mesa-de-trabalho.html (%d KB)" % (len(pagina) // 1024))
