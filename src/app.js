/* ===========================================================
   Gerador de Carrossel - Suno
   Medidas extraidas via Figma MCP.

   @ProfessorBaroni  (PROF-BARONI  u2sVJDaj8RkhpcL0hIYpfG)
     capa 6:233 | corpo 3:2 | corpo+imagem 6:193
   @suno             (SUNO         fsm3eOqBWcd7TqjCnVpRY2)
     capa 705:2 | corpo+imagem 630:104 | so texto 2290:18
   =========================================================== */
(function () {
  'use strict';

  var W = 1080, H = 1350;

  /* =========================================================
     1. Fontes e assets
     ========================================================= */
  var IMG = {};
  function loadImage(src) {
    return new Promise(function (res, rej) {
      var i = new Image();
      i.onload = function () { res(i); }; i.onerror = rej; i.src = src;
    });
  }
  function b64ToBuf(b64) {
    var bin = atob(b64), n = bin.length, u = new Uint8Array(n);
    for (var i = 0; i < n; i++) u[i] = bin.charCodeAt(i);
    return u.buffer;
  }
  function svgUri(svgText) {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText);
  }
  function svgFill(svgText, from, to) {
    return 'data:image/svg+xml;charset=utf-8,' +
      encodeURIComponent(svgText.split('fill="' + from + '"').join('fill="' + to + '"'));
  }

  function bootAssets() {
    var A = window.__ASSETS__;
    var fonts = [
      new FontFace('Inter', b64ToBuf(A.inter), { weight: '100 900' }),
      new FontFace('Staatliches', b64ToBuf(A.staatliches), { weight: '400' }),
      new FontFace('Poppins', b64ToBuf(A.poppins), { weight: '400' }),
      new FontFace('Caladea', b64ToBuf(A.caladea400), { weight: '400' }),
      new FontFace('Caladea', b64ToBuf(A.caladea700), { weight: '700' }),
      new FontFace('Montserrat', b64ToBuf(A.montserrat), { weight: '100 900' }),
      new FontFace('Afacad', b64ToBuf(A.afacad), { weight: '100 900' }),
      new FontFace('Instrument Sans', b64ToBuf(A.instrument), { weight: '100 900' })
    ];
    fonts.forEach(function (f) { document.fonts.add(f); });
    var svgName = atob(A.nameSvg), svgHandle = atob(A.handleSvg);
    var trNome = atob(A.trNomeSvg), trHandle = atob(A.trHandleSvg);
    var snNome = atob(A.snNomeSvg), snHandle = atob(A.snHandleSvg);
    return Promise.all([
      Promise.all(fonts.map(function (f) { return f.load(); })),
      loadImage('data:image/png;base64,' + A.avatar).then(function (i) { IMG.avatar = i; }),
      loadImage('data:image/png;base64,' + A.badge).then(function (i) { IMG.badge = i; }),
      loadImage('data:image/png;base64,' + A.sunoLogo).then(function (i) { IMG.sunoLogo = i; }),
      loadImage('data:image/png;base64,' + A.trAvatar).then(function (i) { IMG.trAvatar = i; }),
      loadImage('data:image/png;base64,' + A.trBadge).then(function (i) { IMG.trBadge = i; }),
      loadImage('data:image/png;base64,' + A.snAvatar).then(function (i) { IMG.snAvatar = i; }),
      loadImage('data:image/png;base64,' + A.snBadge).then(function (i) { IMG.snBadge = i; }),
      loadImage('data:image/png;base64,' + A.snRasgoTopo).then(function (i) { IMG.snRasgoTopo = i; }),
      loadImage('data:image/png;base64,' + A.snRasgoBase).then(function (i) { IMG.snRasgoBase = i; }),
      loadImage('data:image/jpeg;base64,' + A.snTextura).then(function (i) { IMG.snTextura = i; }),
      loadImage('data:image/png;base64,' + A.feLogo).then(function (i) { IMG.feLogo = i; }),
      loadImage('data:image/png;base64,' + A.feBadge).then(function (i) { IMG.feBadge = i; }),
      loadImage(svgUri(atob(A.feEllipse))).then(function (i) { IMG.feEllipse = i; }),
      loadImage(svgUri(atob(A.feSeta1))).then(function (i) { IMG.feSeta1 = i; }),
      loadImage(svgUri(atob(A.feSeta2))).then(function (i) { IMG.feSeta2 = i; }),
      loadImage(svgFill(atob(A.feNomeSvg), '#1F1F1F', '#ffffff')).then(function (i) { IMG.feNomeDark = i; }),
      loadImage(svgFill(atob(A.feNomeSvg), '#1F1F1F', '#1F1F1F')).then(function (i) { IMG.feNomeLight = i; }),
      loadImage(svgFill(atob(A.feHandleSvg), '#B6B6B6', '#B6B6B6')).then(function (i) { IMG.feHandle = i; }),
      loadImage(svgUri(atob(A.coLogoCapa))).then(function (i) { IMG.coLogoCapa = i; }),
      loadImage(svgUri(atob(A.coLogoRed))).then(function (i) { IMG.coLogoRed = i; }),
      loadImage(svgUri(atob(A.coArrow))).then(function (i) { IMG.coArrow = i; }),
      loadImage(svgUri(atob(A.coGlow))).then(function (i) {
        /* o brilho e um circulo com desfoque de 350px: rasterizo uma vez em
           baixa resolucao, porque e suave demais para a resolucao importar */
        var c = layerOf(648, 648);
        c.getContext('2d').drawImage(i, 0, 0, 648, 648);
        IMG.coGlow = c;
      }),
      loadImage(svgFill(svgName, 'black', '#ffffff')).then(function (i) { IMG.nameDark = i; }),
      loadImage(svgFill(svgName, 'black', '#000000')).then(function (i) { IMG.nameLight = i; }),
      loadImage(svgFill(svgHandle, '#6F7377', '#B8B8B8')).then(function (i) { IMG.handleDark = i; }),
      loadImage(svgFill(svgHandle, '#6F7377', '#6F7377')).then(function (i) { IMG.handleLight = i; }),
      loadImage(svgFill(trNome, 'black', '#ffffff')).then(function (i) { IMG.trNomeDark = i; }),
      loadImage(svgFill(trNome, 'black', '#000000')).then(function (i) { IMG.trNomeLight = i; }),
      loadImage(svgFill(trHandle, '#868686', '#868686')).then(function (i) { IMG.trHandleDark = i; }),
      loadImage(svgFill(trHandle, '#868686', '#868686')).then(function (i) { IMG.trHandleLight = i; }),
      loadImage(svgFill(snNome, 'black', '#ffffff')).then(function (i) { IMG.snNomeDark = i; }),
      loadImage(svgFill(snNome, 'black', '#000000')).then(function (i) { IMG.snNomeLight = i; }),
      loadImage(svgFill(snHandle, '#6F7377', '#B6B6B6')).then(function (i) { IMG.snHandleDark = i; }),
      loadImage(svgFill(snHandle, '#6F7377', '#6F7377')).then(function (i) { IMG.snHandleLight = i; })
    ]).then(function () { return document.fonts.ready; });
  }

  /* =========================================================
     2. Motor de texto
     ========================================================= */
  var probe = document.createElement('canvas').getContext('2d');
  var HAS_LS = ('letterSpacing' in probe);

  function fontStr(spec, run) {
    var w = (run && run.em && spec.emWeight) ? spec.emWeight : spec.weight;
    return w + ' ' + spec.size + 'px "' + spec.font + '", "Apple Color Emoji", sans-serif';
  }
  function applyFont(ctx, spec, run) {
    ctx.font = fontStr(spec, run);
    if (HAS_LS) ctx.letterSpacing = spec.ls + 'px';
  }
  function measure(ctx, spec, run, str) {
    applyFont(ctx, spec, run);
    if (HAS_LS) return ctx.measureText(str).width;
    var w = 0;
    for (var i = 0; i < str.length; i++) w += ctx.measureText(str[i]).width + spec.ls;
    return w;
  }
  function drawRun(ctx, spec, run, str, x, baseline) {
    applyFont(ctx, spec, run);
    if (HAS_LS) { ctx.fillText(str, x, baseline); return; }
    var cx = x;
    for (var i = 0; i < str.length; i++) {
      ctx.fillText(str[i], cx, baseline);
      cx += ctx.measureText(str[i]).width + spec.ls;
    }
  }

  /* **enfase** e __alternativa__ viram flags; cada marca decide como pintar */
  function parseRuns(text) {
    var out = [], re = /(\*\*[\s\S]+?\*\*|__[\s\S]+?__)/g, last = 0, m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) out.push({ text: text.slice(last, m.index), em: false, alt: false });
      var tok = m[0];
      if (tok.slice(0, 2) === '**') out.push({ text: tok.slice(2, -2), em: true, alt: false });
      else out.push({ text: tok.slice(2, -2), em: false, alt: true });
      last = m.index + tok.length;
    }
    if (last < text.length) out.push({ text: text.slice(last), em: false, alt: false });
    return out.length ? out : [{ text: '', em: false, alt: false }];
  }

  /* Guias de campo vazio. So aparecem na tela: o PNG exportado nunca leva
     "insira o titulo" impresso. Ver GUIAS, ligado por render(). */
  var GUIA = { titulo: 'insira o título', sub: 'insira o subtítulo', corpo: 'insira o texto' };
  var GUIAS = true;

  /* ajustes manuais da lamina que esta sendo desenhada (definidos por render):
     fonte e largura por campo, como fracao do que o layout projetou */
  var AJUSTES = null;
  /* Ate onde a barra de largura pode ir naquele campo.
     O teto nao e a largura que o Figma desenhou: e o que sobra na lamina
     mantendo, do lado direito, a mesma margem que o layout usa do lado
     esquerdo. Assim cada layout ganha a folga que ele mesmo tem. */
  function tetoLarg(lam, campo) {
    var r = (lam && lam._regioes || []).filter(function (x) { return x.campo === campo; })[0];
    if (!r || !r.w) return 100;
    var atual = (lam.larg || {})[campo] || 1;
    var projeto = r.w / atual;                 /* largura original do layout */
    var disponivel = W - r.x - Math.max(24, r.x);
    if (disponivel < projeto) return 100;      /* ja ocupa tudo o que da */
    return Math.min(300, Math.floor(disponivel / projeto * 100));
  }

  function comAjuste(spec, campo) {
    if (!AJUSTES || !campo) return spec;
    var f = (AJUSTES.fonte || {})[campo], w = (AJUSTES.larg || {})[campo];
    if (!f && !w) return spec;
    var novo = Object.assign({}, spec);
    if (f && f !== 1) {
      novo.size = spec.size * f;
      novo.ls = spec.ls * f;      /* o espacamento do Figma e em px: acompanha */
    }
    if (w && w !== 1) novo.w = spec.w * w;
    return novo;
  }

  function layout(ctx, text, spec, campo) {
    spec = comAjuste(spec, campo);
    var guia = false;
    if (GUIAS && campo && GUIA[campo] && !String(text || '').trim()) {
      text = GUIA[campo]; guia = true;
    }
    var runs = parseRuns(spec.caps ? text.toUpperCase() : text);
    var lines = [], cur = [], curW = 0;
    function flush() { lines.push({ items: cur, w: curW }); cur = []; curW = 0; }
    runs.forEach(function (run) {
      run.text.split('\n').forEach(function (para, pi) {
        if (pi > 0) flush();
        /* palavras e espacos como tokens separados: um trecho pode COMECAR
           com espaco (caso de "**negrito** texto"), e esse espaco tem de sobreviver */
        (para.match(/\s+|\S+/g) || []).forEach(function (tok) {
          var espaco = /^\s/.test(tok);
          if (espaco && curW === 0) return;          /* nao indenta inicio de linha */
          var w = measure(ctx, spec, run, tok);
          if (!espaco && curW > 0 && curW + w > spec.w) flush();
          cur.push({ run: run, text: tok, x: curW, w: w });
          curW += w;
        });
      });
    });
    flush();
    lines.forEach(function (l) {
      while (l.items.length && !l.items[l.items.length - 1].text.trim()) { l.w -= l.items.pop().w; }
    });
    var lh = spec.size * spec.lh;
    return { lines: lines, lh: lh, height: lines.length * lh, spec: spec, guia: guia };
  }

  /* distancia do topo da caixa de linha ate o topo das maiusculas.
     O Figma da Consultoria usa text-box-trim, que ancora por ai. */
  function capTopOffset(ctx, spec) {
    applyFont(ctx, spec, null);
    var m = ctx.measureText('H');
    var cap = m.actualBoundingBoxAscent;
    if (!isFinite(cap) || !cap) cap = spec.size * 0.72;
    return baselineOffset(ctx, spec) - cap;
  }

  /* baseline no modelo half-leading do CSS */
  function baselineOffset(ctx, spec) {
    applyFont(ctx, spec, null);
    var m = ctx.measureText('Hxg');
    var a = m.fontBoundingBoxAscent, d = m.fontBoundingBoxDescent;
    if (!isFinite(a) || !a) { a = spec.size * 0.96; d = spec.size * 0.24; }
    return (spec.size * spec.lh - (a + d)) / 2 + a;
  }

  /* Regioes dos campos na lamina, para traduzir clique em selecao.
     Os renderizadores ja calculam essas caixas; aqui elas ficam registradas. */
  var REGIOES = [], ESTOUROU = null;
  function regiao(campo, x, y, w, h) {
    if (campo) REGIOES.push({ campo: campo, x: x, y: y, w: w, h: h });
  }

  /* --- pintura com cor solida (Baroni) --- */
  function paintSolid(ctx, blk, x, top, campo) {
    regiao(campo, x, top, blk.spec.w, blk.height);
    var alfa = ctx.globalAlpha;
    if (blk.guia) ctx.globalAlpha = alfa * 0.38;
    var off = baselineOffset(ctx, blk.spec);
    ctx.textBaseline = 'alphabetic';
    var centro = blk.spec.align === 'center';
    blk.lines.forEach(function (line, i) {
      var base = top + i * blk.lh + off;
      var dx = centro ? (blk.spec.w - line.w) / 2 : 0;
      line.items.forEach(function (it) {
        if (!it.text.trim()) return;
        ctx.fillStyle = (it.run.em && blk.spec.emColor) ? blk.spec.emColor : blk.spec.color;
        drawRun(ctx, blk.spec, it.run, it.text, x + dx + it.x, base);
      });
      /* sublinhado em passada propria: junta trechos vizinhos para a linha
         nao quebrar nos espacos entre as palavras */
      if (blk.spec.underlineAlt) {
        var esp = blk.spec.size * 0.05 < 2 ? 2 : blk.spec.size * 0.05;
        var y = base + blk.spec.size * 0.15, seg = null;
        var risca = function () {
          if (seg) ctx.fillRect(x + dx + seg.a, y, seg.b - seg.a, esp);
          seg = null;
        };
        ctx.fillStyle = blk.spec.color;
        line.items.forEach(function (it) {
          if (it.run.alt) {
            if (!seg) seg = { a: it.x, b: it.x + it.w };
            else seg.b = it.x + it.w;
          } else risca();
        });
        risca();
      }
    });
    ctx.globalAlpha = alfa;
  }

  /* --- gradiente linear no modelo do CSS (angulo em graus, paradas em fracao) --- */
  function cssGrad(ctx, angle, x, y, w, h, stops) {
    var a = angle * Math.PI / 180, dx = Math.sin(a), dy = -Math.cos(a);
    var L = Math.abs(w * dx) + Math.abs(h * dy);
    var cx = x + w / 2, cy = y + h / 2;
    var p0 = stops[0][0], p1 = stops[stops.length - 1][0], span = (p1 - p0) || 1;
    var g = ctx.createLinearGradient(
      cx + (p0 - 0.5) * L * dx, cy + (p0 - 0.5) * L * dy,
      cx + (p1 - 0.5) * L * dx, cy + (p1 - 0.5) * L * dy);
    stops.forEach(function (s) {
      g.addColorStop(Math.min(1, Math.max(0, (s[0] - p0) / span)), s[1]);
    });
    return g;
  }

  function layerOf(w, h) {
    var c = document.createElement('canvas'); c.width = w; c.height = h; return c;
  }

  /* --- pintura com texto preenchido por gradiente (Suno) ---
     desenha em camada offscreen e recorta o gradiente com source-in */
  function paintGrad(ctx, blk, x, top, style, campo) {
    regiao(campo, x, top, blk.spec.w, blk.height);
    var pad = 80, ox = x - pad, oy = top - pad;
    var lw = Math.ceil(blk.spec.w + pad * 2), lh = Math.ceil(blk.height + pad * 2);
    var base = layerOf(lw, lh), bc = base.getContext('2d');
    var hi = layerOf(lw, lh), hc = hi.getContext('2d');
    var box = null, off = baselineOffset(ctx, blk.spec);

    [bc, hc].forEach(function (c) { c.textBaseline = 'alphabetic'; c.fillStyle = '#fff'; });

    blk.lines.forEach(function (line, i) {
      var bl = top + i * blk.lh + off;
      line.items.forEach(function (it) {
        if (!it.text.trim()) return;
        /* sem emGrad a camada de destaque nunca e pintada: o trecho iria para
           ela e sumiria da arte. Nesse caso ele volta para a camada base. */
        var em = (it.run.em || it.run.alt) && !!style.emGrad;
        drawRun(em ? hc : bc, blk.spec, it.run, it.text, x + it.x - ox, bl - oy);
        if (em) {
          var lx = x + it.x, ly = top + i * blk.lh;
          box = box ? { x: Math.min(box.x, lx), y: Math.min(box.y, ly),
                        r: Math.max(box.r, lx + it.w), b: Math.max(box.b, ly + blk.lh) }
                    : { x: lx, y: ly, r: lx + it.w, b: ly + blk.lh };
        }
      });
    });

    var alfa = ctx.globalAlpha;
    if (blk.guia) ctx.globalAlpha = alfa * 0.38;

    bc.globalCompositeOperation = 'source-in';
    bc.fillStyle = cssGrad(bc, style.grad.angle, x - ox, top - oy, blk.spec.w, blk.height, style.grad.stops);
    bc.fillRect(0, 0, lw, lh);
    ctx.drawImage(base, ox, oy);

    if (box && style.emGrad) {
      hc.globalCompositeOperation = 'source-in';
      hc.fillStyle = cssGrad(hc, style.emGrad.angle, box.x - ox, box.y - oy, box.r - box.x, box.b - box.y, style.emGrad.stops);
      hc.fillRect(0, 0, lw, lh);
      ctx.drawImage(hi, ox, oy);
    }
    ctx.globalAlpha = alfa;
  }

  /* =========================================================
     3. Primitivas
     ========================================================= */
  /* recorte tipo object-fit:cover, com zoom e ponto focal por eixo */
  function coverGeom(img, w, h, zoom) {
    var sc = Math.max(w / img.width, h / img.height) * (zoom || 1);
    return { dw: img.width * sc, dh: img.height * sc };
  }
  function drawCover(ctx, img, x, y, w, h, s) {
    var g = coverGeom(img, w, h, s && s.zoom);
    var fx = (s && s.fx != null) ? s.fx : 0.5, fy = (s && s.fy != null) ? s.fy : 0.5;
    ctx.drawImage(img, x + (w - g.dw) * fx, y + (h - g.dh) * fy, g.dw, g.dh);
  }
  /* folga em cada eixo, para saber quais controles mostrar */
  function folga(img, w, h, zoom) {
    var g = coverGeom(img, w, h, zoom);
    return { x: Math.round(g.dw - w), y: Math.round(g.dh - h) };
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  /* Sombra do rodape das capas.
     Quando `from` nao e transparente, comecar o degrade direto nesse valor
     cria um degrau visivel na linha de inicio — o arquivo do Figma traz
     rgba(0,0,0,0.06) e o degrau vinha junto. `entrada` estende o degrade para
     cima com uma rampa de 0 ate `from`, entao a curva abaixo de `top` fica
     identica e o comeco deixa de ser uma linha reta. */
  function shade(ctx, top, times, from, entrada) {
    var ini = top - (entrada || 0), alt = H - ini;
    for (var k = 0; k < times; k++) {
      var g = ctx.createLinearGradient(0, ini, 0, H);
      if (entrada) {
        g.addColorStop(0, 'rgba(0,0,0,0)');
        g.addColorStop(entrada / alt, from);
      } else {
        g.addColorStop(0, from);
      }
      g.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = g; ctx.fillRect(0, ini, W, H - ini);
    }
  }

  /* =========================================================
     4. MARCA: @ProfessorBaroni
     ========================================================= */
  var HEAD = { av: 93.793, nameDx: 112.72, nameDy: 13.38, nameW: 236.112, nameH: 25.6034,
               hDx: 110.34, hDy: 54.07, hW: 230.621, hH: 27.109, bDx: 357.52, bDy: 13.24, bW: 26.483 };

  /* bloco de perfil (avatar, nome, arroba, selo) — os deslocamentos sao
     relativos ao canto do avatar e vem das medidas de cada arquivo */
  function tweetHeader(ctx, m, im, x, y, theme) {
    var claro = theme === 'light';
    ctx.drawImage(im.avatar, x, y, m.av, m.av);
    ctx.drawImage(claro ? im.nameLight : im.nameDark, x + m.nameDx, y + m.nameDy, m.nameW, m.nameH);
    ctx.drawImage(claro ? im.handleLight : im.handleDark, x + m.hDx, y + m.hDy, m.hW, m.hH);
    ctx.drawImage(im.badge, x + m.bDx, y + m.bDy, m.bW, m.bW);
  }
  function baroniHeader(ctx, x, y, theme) {
    tweetHeader(ctx, HEAD, { avatar: IMG.avatar, badge: IMG.badge,
      nameLight: IMG.nameLight, nameDark: IMG.nameDark,
      handleLight: IMG.handleLight, handleDark: IMG.handleDark }, x, y, theme);
  }
  function baroniDisc(ctx, t, cfg) {
    if (!cfg.discOn || !cfg.disc.trim()) return;
    var spec = { font: 'Inter', size: 24, lh: 1.28, ls: -0.96, w: 900, color: '#6f7377', weight: 700 };
    paintSolid(ctx, layout(ctx, cfg.disc, spec), t.discX, t.discY);
  }

  var B = {
    capa: { label: 'Capa', campos: ['title', 'sub', 'img'],
      x: 108, discX: 105, discY: 1189, minTop: 40,
      title: { font: 'Staatliches', size: 96, lh: 1.03, ls: -3.84, w: 736, color: '#f1f1f1', weight: 400, caps: true },
      sub: { font: 'Inter', size: 40, lh: 1.28, ls: -0.8, w: 634, color: '#ffffff', weight: 400 },
      subBottom: 1156.4, gapTitleSub: 16.2, gapHeadTitle: 31.4 },
    corpo: { label: 'Corpo', campos: ['body'],
      x: 125, discX: 124, discY: 1139, headY: 179, regionTop: 317, regionBottom: 1095,
      body: { font: 'Inter', size: 40, lh: 1.28, ls: -0.8, w: 767, color: '#000000', weight: 400, emWeight: 600, underlineAlt: true } },
    corpoImg: { label: 'Corpo + imagem', campos: ['body', 'img'],
      x: 156, discX: 153, discY: 1076, minTop: 40, gapHeadText: 44.2, gapTextImg: 50,
      body: { font: 'Inter', size: 40, lh: 1.28, ls: -0.8, w: 793, color: '#f0f0f0', weight: 400, emWeight: 600, underlineAlt: true },
      img: { w: 768, h: 357, r: 11, border: '#d6d6d6', bottom: 1032 } }
  };

  function baroniCapa(ctx, s, cfg) {
    var t = B.capa, of = false; if (0) ESTOUROU = null;
    ctx.fillStyle = '#050505'; ctx.fillRect(0, 0, W, H);
    var ts = Object.assign({}, t.title), ss = Object.assign({}, t.sub), tb, sb, headTop;
    for (var p = 0; p < 14; p++) {
      tb = layout(ctx, s.title || '', ts, 'titulo'); sb = layout(ctx, s.sub || '', ss, 'sub');
      headTop = (t.subBottom - sb.height) - t.gapTitleSub - tb.height - t.gapHeadTitle - HEAD.av;
      if (headTop >= t.minTop || !cfg.autofit) break;
      ts.size = Math.round(ts.size * 0.94);
      if (ts.size < 48) ss.size = Math.round(ss.size * 0.94);
    }
    if (headTop < t.minTop) of = true, ESTOUROU = "titulo";
    var subTop = t.subBottom - sb.height, titleTop = subTop - t.gapTitleSub - tb.height;
    regiao("imagem", 0, 0, W, H);
    if (s.img) drawCover(ctx, s.img, 0, 0, W, H, s);
    shade(ctx, Math.min(616, headTop), 2, 'rgba(0,0,0,0.06)', 170);
    baroniHeader(ctx, t.x, headTop, 'dark');
    paintSolid(ctx, tb, t.x, titleTop, "titulo"); paintSolid(ctx, sb, t.x, subTop, "sub");
    baroniDisc(ctx, t, cfg);
    return of;
  }

  function baroniCorpo(ctx, s, cfg) {
    var t = B.corpo, of = false;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
    var spec = Object.assign({}, t.body), avail = t.regionBottom - t.regionTop, blk;
    for (var p = 0; p < 14; p++) {
      blk = layout(ctx, s.body || '', spec, 'corpo');
      if (blk.height <= avail || !cfg.autofit || spec.size < 22) break;
      spec.size = Math.round(spec.size * 0.94);
    }
    if (blk.height > avail) of = true, ESTOUROU = "corpo";
    var top = cfg.topAlign ? t.regionTop : t.regionTop + (avail - blk.height) / 2;
    baroniHeader(ctx, t.x, t.headY, 'light');
    paintSolid(ctx, blk, t.x, Math.max(top, t.regionTop), "corpo");
    baroniDisc(ctx, t, cfg);
    return of;
  }

  function baroniCorpoImg(ctx, s, cfg) {
    var t = B.corpoImg, of = false;
    ctx.fillStyle = '#050505'; ctx.fillRect(0, 0, W, H);
    var spec = Object.assign({}, t.body), blk, headTop, textTop, imgTop = t.img.bottom - t.img.h;
    for (var p = 0; p < 14; p++) {
      blk = layout(ctx, s.body || '', spec, 'corpo');
      textTop = imgTop - t.gapTextImg - blk.height;
      headTop = textTop - t.gapHeadText - HEAD.av;
      if (headTop >= t.minTop || !cfg.autofit || spec.size < 22) break;
      spec.size = Math.round(spec.size * 0.94);
    }
    if (headTop < t.minTop) of = true, ESTOUROU = "titulo";
    baroniHeader(ctx, t.x, headTop, 'dark');
    paintSolid(ctx, blk, t.x, textTop, "corpo");
    regiao("imagem", t.x, imgTop, t.img.w, t.img.h);
    ctx.save(); roundRect(ctx, t.x, imgTop, t.img.w, t.img.h, t.img.r); ctx.clip();
    if (s.img) drawCover(ctx, s.img, t.x, imgTop, t.img.w, t.img.h, s);
    else { ctx.fillStyle = '#15181c'; ctx.fillRect(t.x, imgTop, t.img.w, t.img.h); }
    ctx.restore();
    ctx.strokeStyle = t.img.border; ctx.lineWidth = 1;
    roundRect(ctx, t.x + .5, imgTop + .5, t.img.w - 1, t.img.h - 1, t.img.r); ctx.stroke();
    baroniDisc(ctx, t, cfg);
    return of;
  }

  /* =========================================================
     5. MARCA: @suno
     ========================================================= */
  var GRAD_TITLE = { angle: 159.9067, stops: [[0.094342, 'rgb(26,26,26)'], [0.6364, 'rgb(115,115,115)']] };
  var GRAD_BODY  = { angle: 135.5449, stops: [[0.094342, 'rgb(26,26,26)'], [0.6364, 'rgb(115,115,115)']] };
  var GRAD_EM    = { angle: 180, stops: [[0, 'rgb(255,0,0)'], [1, 'rgb(171,1,1)']] };
  var GRAD_CAPA  = { angle: 126.7665, stops: [[0.39976, 'rgb(253,253,253)'], [1.1003, 'rgb(151,151,151)']] };

  var S = {
    capa: { label: 'Capa', campos: ['title', 'sub', 'img'],
      x: 90, minTop: 40, logo: { w: 188, h: 53 }, shadeTop: 515, shadeN: 4,
      title: { font: 'Poppins', size: 90, lh: 1.134, ls: -6.3, w: 858, weight: 400 },
      sub: { font: 'Poppins', size: 40, lh: 1.134, ls: -1.6, w: 826, weight: 400, color: '#e5e5e5' },
      subBottom: 1215.4, gapTitleSub: 42, gapLogoTitle: 31 },
    corpoImg: { label: 'Corpo + imagem', campos: ['title', 'body', 'img'],
      x: 127, minTop: 40, gapTitleBody: 38.6, gapBodyImg: 63.7,
      title: { font: 'Poppins', size: 65, lh: 1.134, ls: -4.55, w: 708, weight: 400 },
      body: { font: 'Poppins', size: 45, lh: 1.22, ls: -1.8, w: 716, weight: 400 },
      img: { w: 825, h: 422, r: 27, top: 777 } },
    texto: { label: 'S&oacute; texto', campos: ['title', 'body'],
      x: 127, gapTitleBody: 38.6, bias: -16,
      title: { font: 'Poppins', size: 65, lh: 1.134, ls: -4.55, w: 708, weight: 400 },
      body: { font: 'Poppins', size: 45, lh: 1.22, ls: -1.8, w: 716, weight: 400 } }
  };

  function sunoCapa(ctx, s, cfg) {
    var t = S.capa, of = false;
    if (s.img) {
      /* base radial do Figma; na pratica fica atras da foto */
      var g = ctx.createRadialGradient(540, 675, 0, 540, 675, 840);
      g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#f3f3f3');
      ctx.fillStyle = g;
    } else ctx.fillStyle = '#141414';   /* sem foto: placeholder escuro, legivel */
    ctx.fillRect(0, 0, W, H);

    var ts = Object.assign({}, t.title), ss = Object.assign({}, t.sub), tb, sb, logoTop;
    for (var p = 0; p < 14; p++) {
      tb = layout(ctx, s.title || '', ts, 'titulo'); sb = layout(ctx, s.sub || '', ss, 'sub');
      logoTop = (t.subBottom - sb.height) - t.gapTitleSub - tb.height - t.gapLogoTitle - t.logo.h;
      if (logoTop >= t.minTop || !cfg.autofit) break;
      ts.size = Math.round(ts.size * 0.94);
      if (ts.size < 46) ss.size = Math.round(ss.size * 0.94);
    }
    if (logoTop < t.minTop) of = true;
    var subTop = t.subBottom - sb.height, titleTop = subTop - t.gapTitleSub - tb.height;

    regiao("imagem", 0, 0, W, H);
    if (s.img) drawCover(ctx, s.img, 0, 0, W, H, s);
    shade(ctx, Math.min(t.shadeTop, logoTop), t.shadeN, 'rgba(0,0,0,0)');
    ctx.drawImage(IMG.sunoLogo, t.x, logoTop, t.logo.w, t.logo.h);
    paintGrad(ctx, tb, t.x, titleTop, { grad: GRAD_CAPA, emGrad: GRAD_EM }, "titulo");
    paintSolid(ctx, sb, t.x, subTop, "sub");
    return of;
  }

  function sunoCorpoImg(ctx, s, cfg) {
    var t = S.corpoImg, of = false;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
    var ts = Object.assign({}, t.title), bs = Object.assign({}, t.body), tb, bb, titleTop;
    for (var p = 0; p < 14; p++) {
      tb = layout(ctx, s.title || '', ts, 'titulo'); bb = layout(ctx, s.body || '', bs, 'corpo');
      titleTop = (t.img.top - t.gapBodyImg - bb.height) - t.gapTitleBody - tb.height;
      if (titleTop >= t.minTop || !cfg.autofit || bs.size < 24) break;
      bs.size = Math.round(bs.size * 0.94); ts.size = Math.round(ts.size * 0.96);
    }
    if (titleTop < t.minTop) of = true, ESTOUROU = "titulo";
    var bodyTop = t.img.top - t.gapBodyImg - bb.height;

    paintGrad(ctx, tb, t.x, titleTop, { grad: GRAD_TITLE, emGrad: GRAD_EM }, "titulo");
    paintGrad(ctx, bb, t.x, bodyTop, { grad: GRAD_BODY, emGrad: GRAD_EM }, "corpo");
    regiao("imagem", 130, t.img.top, t.img.w, t.img.h);
    ctx.save(); roundRect(ctx, 130, t.img.top, t.img.w, t.img.h, t.img.r); ctx.clip();
    if (s.img) drawCover(ctx, s.img, 130, t.img.top, t.img.w, t.img.h, s);
    else { ctx.fillStyle = '#ececec'; ctx.fillRect(130, t.img.top, t.img.w, t.img.h); }
    ctx.restore();
    return of;
  }

  function sunoTexto(ctx, s, cfg) {
    var t = S.texto, of = false;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
    var ts = Object.assign({}, t.title), bs = Object.assign({}, t.body), tb, bb, total;
    for (var p = 0; p < 14; p++) {
      tb = layout(ctx, s.title || '', ts, 'titulo'); bb = layout(ctx, s.body || '', bs, 'corpo');
      total = tb.height + t.gapTitleBody + bb.height;
      if (total <= H - 160 || !cfg.autofit || bs.size < 24) break;
      bs.size = Math.round(bs.size * 0.94); ts.size = Math.round(ts.size * 0.96);
    }
    if (total > H - 160) of = true, ESTOUROU = "corpo";
    var top = (H - total) / 2 + t.bias;
    if (top < 60) top = 60;
    paintGrad(ctx, tb, t.x, top, { grad: GRAD_TITLE, emGrad: GRAD_EM }, "titulo");
    paintGrad(ctx, bb, t.x, top + tb.height + t.gapTitleBody, { grad: GRAD_BODY, emGrad: GRAD_EM }, "corpo");
    return of;
  }

  /* =========================================================
     6. MARCA: @tiagogreis
     ========================================================= */
  var TR_HEAD = { av: 92.779, nameDx: 106, nameDy: 14, nameW: 143, nameH: 32.447,
                  hDx: 109, hDy: 50, hW: 138, hH: 27.678, bDx: 257, bDy: 15, bW: 26.195 };
  var TR_BG = { angle: 154.4523, stops: [[0.084259, 'rgb(255,255,255)'], [0.95185, 'rgb(240,240,240)']] };

  function trHeader(ctx, x, y, theme) {
    tweetHeader(ctx, TR_HEAD, { avatar: IMG.trAvatar, badge: IMG.trBadge,
      nameLight: IMG.trNomeLight, nameDark: IMG.trNomeDark,
      handleLight: IMG.trHandleLight, handleDark: IMG.trHandleDark }, x, y, theme);
  }
  function trFundo(ctx) {
    ctx.fillStyle = cssGrad(ctx, TR_BG.angle, 0, 0, W, H, TR_BG.stops);
    ctx.fillRect(0, 0, W, H);
  }

  var T = {
    capa: { label: 'Capa', campos: ['title', 'sub', 'img'],
      x: 102, minTop: 40, shadeTop: 598, shadeN: 2,
      title: { font: 'Inter', size: 100, lh: 1.03, ls: -7, w: 877, weight: 600, color: '#ffffff' },
      /* a caixa do Figma tem 341px porque o texto de referencia era curto
             ("Qual a diferenca?"); alargada para a mesma medida do titulo */
      sub: { font: 'Inter', size: 45, lh: 1.23, ls: -2.25, w: 877, weight: 500, color: '#ececec' },
      subBottom: 1233.7, gapTitleSub: 28.3, gapHeadTitle: 31.2 },
    texto: { label: 'S&oacute; texto', campos: ['title', 'body'],
      x: 101, gapHeadTitle: 34.3, gapTitleBody: 31.9,
      title: { font: 'Inter', size: 64, lh: 1.03, ls: -4.48, w: 699, weight: 600, color: '#1b1b1b', emColor: '#42aff3' },
      body: { font: 'Inter', size: 45, lh: 1.23, ls: -2.25, w: 901, weight: 500, color: '#242424', emWeight: 700 } },
    foto: { label: 'Texto + foto', campos: ['title', 'body', 'img'],
      x: 88, gapHeadTitle: 39.8, gapTitleBody: 48.2, gapBodyImg: 62.6,
      title: { font: 'Inter', size: 64, lh: 1.03, ls: -4.48, w: 833, weight: 600, color: '#1b1b1b', emColor: '#42aff3' },
      body: { font: 'Inter', size: 45, lh: 1.23, ls: -2.25, w: 865, weight: 500, color: '#242424', emWeight: 700 },
      img: { w: 852, h: 360, r: 25 } }
  };

  function trCapa(ctx, s, cfg) {
    var t = T.capa, of = false;
    trFundo(ctx);
    var ts = Object.assign({}, t.title), ss = Object.assign({}, t.sub), tb, sb, headTop;
    for (var p = 0; p < 14; p++) {
      tb = layout(ctx, s.title || '', ts, 'titulo'); sb = layout(ctx, s.sub || '', ss, 'sub');
      headTop = (t.subBottom - sb.height) - t.gapTitleSub - tb.height - t.gapHeadTitle - TR_HEAD.av;
      if (headTop >= t.minTop || !cfg.autofit) break;
      ts.size = Math.round(ts.size * 0.94);
      if (ts.size < 52) ss.size = Math.round(ss.size * 0.94);
    }
    if (headTop < t.minTop) of = true, ESTOUROU = "titulo";
    var subTop = t.subBottom - sb.height, titleTop = subTop - t.gapTitleSub - tb.height;
    regiao("imagem", 0, 0, W, H);
    if (s.img) drawCover(ctx, s.img, 0, 0, W, H, s);
    shade(ctx, Math.min(t.shadeTop, headTop), t.shadeN, 'rgba(0,0,0,0)');
    trHeader(ctx, t.x, headTop, 'dark');
    paintSolid(ctx, tb, t.x, titleTop, "titulo");
    paintSolid(ctx, sb, t.x, subTop, "sub");
    return of;
  }

  /* nos dois layouts de corpo o conjunto inteiro e centralizado na vertical */
  function trCorpo(ctx, s, cfg, comFoto) {
    var t = comFoto ? T.foto : T.texto, of = false;
    trFundo(ctx);
    var ts = Object.assign({}, t.title), bs = Object.assign({}, t.body), tb, bb, total;
    var extra = comFoto ? (t.gapBodyImg + t.img.h) : 0;
    for (var p = 0; p < 14; p++) {
      tb = layout(ctx, s.title || '', ts, 'titulo'); bb = layout(ctx, s.body || '', bs, 'corpo');
      total = TR_HEAD.av + t.gapHeadTitle + tb.height + t.gapTitleBody + bb.height + extra;
      if (total <= H - 120 || !cfg.autofit || bs.size < 24) break;
      bs.size = Math.round(bs.size * 0.94); ts.size = Math.round(ts.size * 0.96);
    }
    if (total > H - 120) of = true, ESTOUROU = "corpo";

    var y = (H - total) / 2;
    if (y < 50) y = 50;
    trHeader(ctx, t.x, y, 'light');
    y += TR_HEAD.av + t.gapHeadTitle;
    paintSolid(ctx, tb, t.x, y, "titulo");
    y += tb.height + t.gapTitleBody;
    paintSolid(ctx, bb, t.x, y, "corpo");

    if (comFoto) {
      y += bb.height + t.gapBodyImg;
      regiao("imagem", 85, y, t.img.w, t.img.h);
      ctx.save(); roundRect(ctx, 85, y, t.img.w, t.img.h, t.img.r); ctx.clip();
      if (s.img) drawCover(ctx, s.img, 85, y, t.img.w, t.img.h, s);
      else { ctx.fillStyle = '#e2e2e2'; ctx.fillRect(85, y, t.img.w, t.img.h); }
      ctx.restore();
    }
    return of;
  }
  function trTexto(ctx, s, cfg) { return trCorpo(ctx, s, cfg, false); }
  function trFoto(ctx, s, cfg) { return trCorpo(ctx, s, cfg, true); }

  /* =========================================================
     7. MARCA: @sunonoticias
     ========================================================= */
  var SN_HEAD = { av: 91, nameDx: 110.59, nameDy: 12, nameW: 213.829, nameH: 27.667,
                  hDx: 110.45, hDy: 48.28, hW: 189.24, hH: 28.253, bDx: 336, bDy: 15, bW: 26.483 };

  function snHeader(ctx, x, y, theme) {
    tweetHeader(ctx, SN_HEAD, { avatar: IMG.snAvatar, badge: IMG.snBadge,
      nameLight: IMG.snNomeLight, nameDark: IMG.snNomeDark,
      handleLight: IMG.snHandleLight, handleDark: IMG.snHandleDark }, x, y, theme);
  }

  /* fundo de papel: gradiente claro + rasgo no topo + textura em "darken" a 30% */
  function snPapel(ctx) {
    ctx.fillStyle = cssGrad(ctx, TR_BG.angle, 0, 0, W, H, TR_BG.stops);
    ctx.fillRect(0, 0, W, H);
    ctx.drawImage(IMG.snRasgoTopo, 0, 0, 1080, 413);
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.globalCompositeOperation = 'darken';
    ctx.drawImage(IMG.snTextura, 0, 0, 1080, 1350);
    ctx.restore();
  }

  var N = {
    capa: { label: 'Capa', campos: ['title', 'img'],
      x: 108, minTop: 40, gapHeadTitle: 60.3, titleBottom: 1163.9, rasgoTop: 842,
      title: { font: 'Caladea', size: 96, lh: 1.03, ls: -4.8, w: 915, weight: 700, color: '#ffffff', caps: true } },
    texto: { label: 'S&oacute; texto', campos: ['body'],
      x: 115, gapHeadText: 94, textCenter: 691,
      body: { font: 'Caladea', size: 50, lh: 1.28, ls: -1, w: 892, weight: 400, color: '#000000', emWeight: 700 } },
    imagem: { label: 'Texto + imagem', campos: ['body', 'img'],
      x: 138, gapHeadText: 48, gapTextImg: 48,
      body: { font: 'Caladea', size: 50, lh: 1.28, ls: -1, w: 810, weight: 400, color: '#000000', emWeight: 700 },
      img: { w: 768, h: 394, r: 11, border: '#d6d6d6' } }
  };

  function snCapa(ctx, s, cfg) {
    var t = N.capa, of = false;
    ctx.fillStyle = '#141414'; ctx.fillRect(0, 0, W, H);
    var ts = Object.assign({}, t.title), tb, headTop;
    for (var p = 0; p < 14; p++) {
      tb = layout(ctx, s.title || '', ts, 'titulo');
      headTop = t.titleBottom - tb.height - t.gapHeadTitle - SN_HEAD.av;
      if (headTop >= t.minTop || !cfg.autofit || ts.size < 46) break;
      ts.size = Math.round(ts.size * 0.94);
    }
    if (headTop < t.minTop) of = true, ESTOUROU = "titulo";
    var titleTop = t.titleBottom - tb.height;

    regiao("imagem", 0, 0, W, H);
    if (s.img) drawCover(ctx, s.img, 0, 0, W, H, s);
    /* as duas sombras do arquivo tem alturas diferentes */
    var g1 = ctx.createLinearGradient(0, 616, 0, H);
    g1.addColorStop(0, 'rgba(0,0,0,0.06)'); g1.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = g1; ctx.fillRect(0, 616, W, H - 616);
    var g2 = ctx.createLinearGradient(0, 456, 0, H);
    g2.addColorStop(0, 'rgba(0,0,0,0.06)'); g2.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = g2; ctx.fillRect(0, 456, W, H - 456);

    snHeader(ctx, t.x, headTop, 'dark');
    paintSolid(ctx, tb, t.x, titleTop, "titulo");
    ctx.drawImage(IMG.snRasgoBase, 0, t.rasgoTop, 1080, 508);
    return of;
  }

  function snTexto(ctx, s, cfg) {
    var t = N.texto, of = false;
    snPapel(ctx);
    var bs = Object.assign({}, t.body), blk, headTop;
    for (var p = 0; p < 14; p++) {
      blk = layout(ctx, s.body || '', bs, 'corpo');
      headTop = (t.textCenter - blk.height / 2) - t.gapHeadText - SN_HEAD.av;
      if (headTop >= 60 || !cfg.autofit || bs.size < 26) break;
      bs.size = Math.round(bs.size * 0.94);
    }
    if (headTop < 60) of = true, ESTOUROU = "corpo";
    var top = t.textCenter - blk.height / 2;
    snHeader(ctx, t.x, headTop, 'light');
    paintSolid(ctx, blk, t.x, top, "corpo");
    return of;
  }

  /* aqui o conjunto inteiro e centralizado, como no arquivo */
  function snImagem(ctx, s, cfg) {
    var t = N.imagem, of = false;
    snPapel(ctx);
    var bs = Object.assign({}, t.body), blk, total;
    for (var p = 0; p < 14; p++) {
      blk = layout(ctx, s.body || '', bs, 'corpo');
      total = SN_HEAD.av + t.gapHeadText + blk.height + t.gapTextImg + t.img.h;
      if (total <= H - 120 || !cfg.autofit || bs.size < 26) break;
      bs.size = Math.round(bs.size * 0.94);
    }
    if (total > H - 120) of = true, ESTOUROU = "corpo";
    var y = (H - total) / 2; if (y < 50) y = 50;
    snHeader(ctx, t.x, y, 'light');
    y += SN_HEAD.av + t.gapHeadText;
    paintSolid(ctx, blk, t.x, y, "corpo");
    y += blk.height + t.gapTextImg;
    regiao("imagem", t.x, y, t.img.w, t.img.h);
    ctx.save(); roundRect(ctx, t.x, y, t.img.w, t.img.h, t.img.r); ctx.clip();
    if (s.img) drawCover(ctx, s.img, t.x, y, t.img.w, t.img.h, s);
    else { ctx.fillStyle = '#e2e2e2'; ctx.fillRect(t.x, y, t.img.w, t.img.h); }
    ctx.restore();
    ctx.strokeStyle = t.img.border; ctx.lineWidth = 1;
    roundRect(ctx, t.x + .5, y + .5, t.img.w - 1, t.img.h - 1, t.img.r); ctx.stroke();
    return of;
  }

  /* =========================================================
     8. MARCA: @SunoConsultoria
     ========================================================= */
  var CO_RED = '#D42126';

  var C = {
    capa: { label: 'Capa', campos: ['title', 'sub', 'img'], minTop: 40,
      logo: { x: 318, y: 89, w: 445, h: 34 }, arrow: { x: 951, y: 645, s: 60 },
      glow: { x: -1521, y: -1149, s: 2586 },
      titleX: 126, subX: 137, subBottom: 1251, gapTitleSub: 6.5,
      title: { font: 'Montserrat', size: 96, lh: 1.2083, ls: -2.88, w: 828, weight: 300,
               color: '#ffffff', emColor: '#ff1616', align: 'center' },
      sub: { font: 'Montserrat', size: 45, lh: 1.1333, ls: -1.35, w: 806, weight: 300,
             color: '#ffffff', emColor: '#ff0909', emWeight: 400, align: 'center' } },
    texto: { label: 'S&oacute; texto', campos: ['numero', 'title', 'body'],
      x: 101, badge: { x: 100, y: 303, d: 80 }, logo: { x: 206, y: 324, w: 109, h: 44 },
      arrow: { x: 920, y: 648, s: 60 }, titleCapTop: 450, gapTitleBody: 66,
      title: { font: 'Montserrat', size: 64, lh: 1.06, ls: -3.84, w: 844, weight: 700, color: '#1e1e1e' },
      body: { font: 'Montserrat', size: 40, lh: 1.5, ls: -1.2, w: 844, weight: 400, color: '#1e1e1e', emWeight: 700 } },
    imagem: { label: 'Texto + imagem', campos: ['numero', 'title', 'body', 'img'],
      x: 85, badge: { x: 84, y: 71, d: 80 }, logo: { x: 190, y: 92, w: 109, h: 44 },
      arrow: { x: 920, y: 648, s: 60 }, titleCapTop: 218, gapTitleImg: 44.5, gapImgBody: 53.5,
      title: { font: 'Montserrat', size: 64, lh: 1.06, ls: -3.84, w: 911, weight: 700, color: '#1e1e1e' },
      body: { font: 'Montserrat', size: 40, lh: 1.5, ls: -1.2, w: 911, weight: 400, color: '#1e1e1e', emWeight: 700 },
      img: { w: 705, h: 328, r: 22 } }
  };

  /* numero da lamina dentro do circulo vermelho */
  function coBadge(ctx, b, numero) {
    ctx.fillStyle = CO_RED;
    ctx.beginPath(); ctx.arc(b.x + b.d / 2, b.y + b.d / 2, b.d / 2, 0, Math.PI * 2); ctx.fill();
    var txt = String(numero == null ? '' : numero).trim();
    if (!txt) return;
    var spec = { font: 'Montserrat', size: 50, lh: 1, ls: -1.5, w: 400, weight: 400, color: '#fff' };
    applyFont(ctx, spec, null);
    var m = ctx.measureText(txt);
    var larg = HAS_LS ? m.width : measure(ctx, spec, null, txt);
    var cap = m.actualBoundingBoxAscent || spec.size * 0.72;
    ctx.fillStyle = '#ffffff'; ctx.textBaseline = 'alphabetic';
    drawRun(ctx, spec, null, txt, b.x + b.d / 2 - larg / 2, b.y + b.d / 2 + cap / 2);
  }
  function coArrow(ctx, a) { ctx.drawImage(IMG.coArrow, a.x, a.y, a.s, a.s); }

  function coCapa(ctx, s, cfg) {
    var t = C.capa, of = false;
    ctx.fillStyle = '#000000'; ctx.fillRect(0, 0, W, H);
    var ts = Object.assign({}, t.title), ss = Object.assign({}, t.sub), tb, sb, titleTop;
    for (var p = 0; p < 14; p++) {
      tb = layout(ctx, s.title || '', ts, 'titulo'); sb = layout(ctx, s.sub || '', ss, 'sub');
      titleTop = (t.subBottom - sb.height) - t.gapTitleSub - tb.height;
      if (titleTop >= t.minTop + 120 || !cfg.autofit || ts.size < 52) break;
      ts.size = Math.round(ts.size * 0.94); ss.size = Math.round(ss.size * 0.96);
    }
    if (titleTop < t.minTop + 120) of = true, ESTOUROU = "titulo";
    var subTop = t.subBottom - sb.height;

    regiao("imagem", 0, 0, W, H);
    if (s.img) drawCover(ctx, s.img, 0, 0, W, H, s);
    /* brilho vermelho, aditivo, como o mix-blend-plus-lighter do arquivo */
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    ctx.drawImage(IMG.coGlow, t.glow.x, t.glow.y, t.glow.s, t.glow.s);
    ctx.restore();
    /* quatro sombras: duas de 460 e duas de 761 */
    [[460, 2], [761, 2]].forEach(function (par) {
      for (var k = 0; k < par[1]; k++) {
        var g = ctx.createLinearGradient(0, par[0], 0, H);
        g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,1)');
        ctx.fillStyle = g; ctx.fillRect(0, par[0], W, H - par[0]);
      }
    });
    ctx.drawImage(IMG.coLogoCapa, t.logo.x, t.logo.y, t.logo.w, t.logo.h);
    coArrow(ctx, t.arrow);
    paintSolid(ctx, tb, t.titleX, titleTop, "titulo");
    paintSolid(ctx, sb, t.subX, subTop, "sub");
    return of;
  }

  function coCorpo(ctx, s, cfg, comImagem) {
    var t = comImagem ? C.imagem : C.texto, of = false;
    ctx.fillStyle = '#f7f7f7'; ctx.fillRect(0, 0, W, H);
    var ts = Object.assign({}, t.title), bs = Object.assign({}, t.body), tb, bb, fim;
    var extra = comImagem ? (t.gapTitleImg + t.img.h + t.gapImgBody) : t.gapTitleBody;
    for (var p = 0; p < 14; p++) {
      tb = layout(ctx, s.title || '', ts, 'titulo'); bb = layout(ctx, s.body || '', bs, 'corpo');
      fim = t.titleCapTop + tb.height + extra + bb.height;
      if (fim <= H - 60 || !cfg.autofit || bs.size < 24) break;
      bs.size = Math.round(bs.size * 0.94); ts.size = Math.round(ts.size * 0.96);
    }
    if (fim > H - 60) of = true, ESTOUROU = "corpo";

    coBadge(ctx, t.badge, s.numero);
    ctx.drawImage(IMG.coLogoRed, t.logo.x, t.logo.y, t.logo.w, t.logo.h);
    coArrow(ctx, t.arrow);

    var y = t.titleCapTop - capTopOffset(ctx, ts);
    paintSolid(ctx, tb, t.x, y, "titulo");
    y += tb.height;
    if (comImagem) {
      y += t.gapTitleImg;
      regiao("imagem", t.x, y, t.img.w, t.img.h);
    ctx.save(); roundRect(ctx, t.x, y, t.img.w, t.img.h, t.img.r); ctx.clip();
      if (s.img) drawCover(ctx, s.img, t.x, y, t.img.w, t.img.h, s);
      else { ctx.fillStyle = '#e2e2e2'; ctx.fillRect(t.x, y, t.img.w, t.img.h); }
      ctx.restore();
      y += t.img.h + t.gapImgBody;
    } else y += t.gapTitleBody;
    paintSolid(ctx, bb, t.x, y, "corpo");
    return of;
  }
  function coTexto(ctx, s, cfg) { return coCorpo(ctx, s, cfg, false); }
  function coImagem(ctx, s, cfg) { return coCorpo(ctx, s, cfg, true); }

  /* =========================================================
     9. MARCA: @fundsexplorer
     ========================================================= */
  /* medidas na escala do layout "so texto"; os outros dois usam 0.93947 */
  var FE_HEAD = { av: 100.056,
    logoDx: 20.21, logoDy: 21.32, logoW: 61.765, logoH: 57.505,
    nameDx: 114.96, nameDy: 21.31, nameW: 188.536, nameH: 32.931,
    hDx: 114.47, hDy: 57.14, hW: 169.727, hH: 25.3,
    bDx: 310.8, bDy: 21.31, bW: 28.202 };

  function feHeader(ctx, x, y, theme, k) {
    var m = FE_HEAD;
    ctx.drawImage(IMG.feEllipse, x, y, m.av * k, m.av * k);
    /* o passaro fica recortado dentro do circulo, com o mesmo enquadramento do arquivo */
    var lx = x + m.logoDx * k, ly = y + m.logoDy * k;
    var lw = m.logoW * k, lh = m.logoH * k;
    ctx.save();
    ctx.beginPath(); ctx.rect(lx, ly, lw, lh); ctx.clip();
    ctx.drawImage(IMG.feLogo, lx - 0.2261 * lw, ly - 0.3061 * lh, 3.7321 * lw, 1.5306 * lh);
    ctx.restore();
    ctx.drawImage(theme === 'light' ? IMG.feNomeLight : IMG.feNomeDark,
      x + m.nameDx * k, y + m.nameDy * k, m.nameW * k, m.nameH * k);
    ctx.drawImage(IMG.feHandle, x + m.hDx * k, y + m.hDy * k, m.hW * k, m.hH * k);
    ctx.drawImage(IMG.feBadge, x + m.bDx * k, y + m.bDy * k, m.bW * k, m.bW * k);
  }

  var F = {
    capa: { label: 'Capa', campos: ['title', 'sub', 'img'],
      x: 95, k: 0.93947, minTop: 40, shadeTop: 616, shadeN: 4,
      subBottom: 1238.5, gapTitleSub: 34.5, gapHeadTitle: 35,
      title: { font: 'Instrument Sans', size: 100, lh: 1.03, ls: -7, w: 829, weight: 400,
               color: '#ffffff', emColor: '#00c0f5' },
      /* o arquivo do Figma traz este subtitulo centralizado; alinhado a esquerda
         a pedido, para acompanhar o titulo */
      sub: { font: 'Afacad', size: 50, lh: 1.04, ls: -1, w: 829, weight: 400,
             color: '#ffffff' },
      setas: [[-211, 37, 611, 625], [560, 1156, 520, 532]] },
    texto: { label: 'S&oacute; texto', campos: ['body'],
      x: 117, k: 1, headY: 265, textCenter: 751.6, gapHeadText: 37.19,
      body: { font: 'Afacad', size: 50, lh: 1.081, ls: -1, w: 845, weight: 400,
              color: '#000000', emWeight: 700, underlineAlt: true } },
    imagem: { label: 'Texto + imagem', campos: ['body', 'img'],
      x: 95, k: 0.93947, gap: 44.75,
      body: { font: 'Afacad', size: 50, lh: 1.081, ls: -1, w: 845, weight: 400,
              color: '#000000', emWeight: 700, underlineAlt: true },
      img: { w: 831, h: 414, r: 26 } }
  };

  function feCapa(ctx, s, cfg) {
    var t = F.capa, of = false;
    ctx.fillStyle = '#0b0b0b'; ctx.fillRect(0, 0, W, H);
    var ts = Object.assign({}, t.title), ss = Object.assign({}, t.sub), tb, sb, headTop;
    for (var p = 0; p < 14; p++) {
      tb = layout(ctx, s.title || '', ts, 'titulo'); sb = layout(ctx, s.sub || '', ss, 'sub');
      headTop = (t.subBottom - sb.height) - t.gapTitleSub - tb.height - t.gapHeadTitle - FE_HEAD.av * t.k;
      if (headTop >= t.minTop || !cfg.autofit || ts.size < 54) break;
      ts.size = Math.round(ts.size * 0.94);
      if (ts.size < 70) ss.size = Math.round(ss.size * 0.96);
    }
    if (headTop < t.minTop) of = true, ESTOUROU = "titulo";
    var subTop = t.subBottom - sb.height, titleTop = subTop - t.gapTitleSub - tb.height;

    regiao("imagem", 0, 0, W, H);
    if (s.img) drawCover(ctx, s.img, 0, 0, W, H, s);
    shade(ctx, Math.min(t.shadeTop, headTop), t.shadeN, 'rgba(0,0,0,0)');
    feHeader(ctx, t.x, headTop, 'dark', t.k);
    paintSolid(ctx, tb, t.x, titleTop, "titulo");
    paintSolid(ctx, sb, t.x, subTop, "sub");
    /* setas decorativas por cima, como no arquivo (ja vem com opacidade 0.2) */
    ctx.drawImage(IMG.feSeta1, t.setas[0][0], t.setas[0][1], t.setas[0][2], t.setas[0][3]);
    ctx.drawImage(IMG.feSeta2, t.setas[1][0], t.setas[1][1], t.setas[1][2], t.setas[1][3]);
    return of;
  }

  function feFundo(ctx) {
    ctx.fillStyle = cssGrad(ctx, TR_BG.angle, 0, 0, W, H, TR_BG.stops);
    ctx.fillRect(0, 0, W, H);
  }

  function feTexto(ctx, s, cfg) {
    var t = F.texto, of = false;
    feFundo(ctx);
    var bs = Object.assign({}, t.body), blk, top, headTop;
    for (var p = 0; p < 14; p++) {
      blk = layout(ctx, s.body || '', bs, 'corpo');
      top = t.textCenter - blk.height / 2;
      headTop = Math.min(t.headY, top - t.gapHeadText - FE_HEAD.av * t.k);
      if (headTop >= 50 || !cfg.autofit || bs.size < 26) break;
      bs.size = Math.round(bs.size * 0.94);
    }
    if (headTop < 50) of = true, ESTOUROU = "corpo";
    feHeader(ctx, t.x, headTop, 'light', t.k);
    paintSolid(ctx, blk, t.x, top, "corpo");
    return of;
  }

  /* aqui o conjunto e centralizado e os dois vaos sao iguais */
  function feImagem(ctx, s, cfg) {
    var t = F.imagem, of = false;
    feFundo(ctx);
    var bs = Object.assign({}, t.body), blk, total;
    var avh = FE_HEAD.av * t.k;
    for (var p = 0; p < 14; p++) {
      blk = layout(ctx, s.body || '', bs, 'corpo');
      total = avh + t.gap + blk.height + t.gap + t.img.h;
      if (total <= H - 100 || !cfg.autofit || bs.size < 26) break;
      bs.size = Math.round(bs.size * 0.94);
    }
    if (total > H - 100) of = true, ESTOUROU = "corpo";
    var y = (H - total) / 2; if (y < 40) y = 40;
    feHeader(ctx, t.x, y, 'light', t.k);
    y += avh + t.gap;
    paintSolid(ctx, blk, t.x, y, "corpo");
    y += blk.height + t.gap;
    regiao("imagem", t.x, y, t.img.w, t.img.h);
    ctx.save(); roundRect(ctx, t.x, y, t.img.w, t.img.h, t.img.r); ctx.clip();
    if (s.img) drawCover(ctx, s.img, t.x, y, t.img.w, t.img.h, s);
    else { ctx.fillStyle = '#e2e2e2'; ctx.fillRect(t.x, y, t.img.w, t.img.h); }
    ctx.restore();
    return of;
  }

  /* =========================================================
     10. Registro de marcas
     ========================================================= */
  var MARCAS = {
    baroni: { nome: 'Professor Baroni', arroba: '@ProfessorBaroni', cor: '#3fbf68', disclaimer: true, topAlign: true,
      dica: '<kbd>**negrito**</kbd> <kbd>__sublinhado__</kbd>',
      tipos: { capa: B.capa, corpo: B.corpo, corpoImg: B.corpoImg },
      render: { capa: baroniCapa, corpo: baroniCorpo, corpoImg: baroniCorpoImg } },
    suno: { nome: 'Suno', arroba: '@suno', cor: '#ff2020', disclaimer: false, topAlign: false,
      dica: '<kbd>**destaque**</kbd> pinta o trecho em vermelho',
      tipos: { capa: S.capa, corpoImg: S.corpoImg, texto: S.texto },
      render: { capa: sunoCapa, corpoImg: sunoCorpoImg, texto: sunoTexto } },
    tiago: { nome: 'Tiago Reis', arroba: '@tiagogreis', cor: '#42aff3', disclaimer: false, topAlign: false,
      dica: '<kbd>**destaque**</kbd> fica azul no t&iacute;tulo e negrito no texto',
      tipos: { capa: T.capa, texto: T.texto, foto: T.foto },
      render: { capa: trCapa, texto: trTexto, foto: trFoto } },
    noticias: { nome: 'Suno Not&iacute;cias', arroba: '@sunonoticias', cor: '#c9c2b4', disclaimer: false, topAlign: false,
      dica: '<kbd>**destaque**</kbd> deixa o trecho em negrito',
      tipos: { capa: N.capa, texto: N.texto, imagem: N.imagem },
      render: { capa: snCapa, texto: snTexto, imagem: snImagem } },
    consultoria: { nome: 'Suno Consultoria', arroba: '@SunoConsultoria', cor: '#d42126', disclaimer: false, topAlign: false,
      dica: '<kbd>**destaque**</kbd> fica vermelho na capa e negrito no texto',
      tipos: { capa: C.capa, texto: C.texto, imagem: C.imagem },
      render: { capa: coCapa, texto: coTexto, imagem: coImagem } },
    funds: { nome: 'Funds Explorer', arroba: '@fundsexplorer', cor: '#00c0f5', disclaimer: false, topAlign: false,
      dica: '<kbd>**destaque**</kbd> fica azul na capa e negrito no texto &middot; <kbd>__sublinhado__</kbd>',
      tipos: { capa: F.capa, texto: F.texto, imagem: F.imagem },
      render: { capa: feCapa, texto: feTexto, imagem: feImagem } }
  };

  function render(canvas, marca, s, cfg) {
    var ctx = canvas.getContext('2d');
    canvas.width = W; canvas.height = H;
    ctx.clearRect(0, 0, W, H); ctx.textAlign = 'left';
    GUIAS = cfg.guias !== false;
    AJUSTES = s;
    REGIOES = []; ESTOUROU = null;
    var M = MARCAS[marca];
    var fn = M.render[s.type] || M.render[Object.keys(M.render)[0]];
    /* o disclaimer e por lamina: tirar de uma nao tira das outras */
    var cfgL = (s && s.semDisc) ? Object.assign({}, cfg, { discOn: false }) : cfg;
    var of = fn(ctx, s, cfgL);
    /* guarda o resultado na propria lamina: a interface le dali */
    s._regioes = REGIOES.slice();
    s._estouro = of ? (ESTOUROU || 'corpo') : null;
    return of;
  }

  /* qual campo esta sob o ponto (x,y) em coordenadas de 1080x1350.
     Percorre de tras para frente: o desenhado por ultimo ganha. */
  function campoEm(s, x, y) {
    var r = s._regioes || [];
    for (var i = r.length - 1; i >= 0; i--) {
      var c = r[i];
      if (x >= c.x && x <= c.x + c.w && y >= c.y && y <= c.y + c.h) return c.campo;
    }
    return null;
  }

  /* =========================================================
     11. ZIP (metodo store) + download
     ========================================================= */
  var CRC = (function () {
    var t = new Uint32Array(256);
    for (var n = 0; n < 256; n++) { var c = n;
      for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      t[n] = c >>> 0; }
    return t;
  })();
  function crc32(u8) {
    var c = 0xFFFFFFFF;
    for (var i = 0; i < u8.length; i++) c = CRC[(c ^ u8[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }
  function zip(files) {
    var chunks = [], central = [], offset = 0, enc = new TextEncoder();
    function u32(v) { return [v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255]; }
    function u16(v) { return [v & 255, (v >>> 8) & 255]; }
    files.forEach(function (f) {
      var name = enc.encode(f.name), crc = crc32(f.data), sz = f.data.length;
      var local = [].concat([80, 75, 3, 4], u16(20), u16(0), u16(0), u16(0), u16(0),
        u32(crc), u32(sz), u32(sz), u16(name.length), u16(0));
      chunks.push(new Uint8Array(local), name, f.data);
      central.push([].concat([80, 75, 1, 2], u16(20), u16(20), u16(0), u16(0), u16(0), u16(0),
        u32(crc), u32(sz), u32(sz), u16(name.length), u16(0), u16(0), u16(0), u16(0),
        u32(0), u32(offset)), name);
      offset += local.length + name.length + sz;
    });
    var cd = [], cdLen = 0;
    for (var i = 0; i < central.length; i += 2) {
      var a = new Uint8Array(central[i]); cd.push(a, central[i + 1]);
      cdLen += a.length + central[i + 1].length;
    }
    var end = new Uint8Array([].concat([80, 75, 5, 6], u16(0), u16(0),
      u16(files.length), u16(files.length), u32(cdLen), u32(offset), u16(0)));
    return new Blob(chunks.concat(cd, [end]), { type: 'application/zip' });
  }
  /* Dois modos de salvar:
     - arquivo local aberto no navegador: <a download> normal, e zip para o lote
     - publicado como Artifact: o visualizador bloqueia download disparado pela
       pagina, entao usa a capability `downloads`. Ela nao aceita .zip, so
       formatos de imagem, entao o lote vira um PNG de cada vez. */
  var capDownloads = (window.claude && typeof claude.use === 'function')
    ? claude.use('downloads').catch(function () { return null; })
    : Promise.resolve(null);

  function saveLocal(blob, name) {
    var url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  function save(blob, name) {
    return capDownloads.then(function (d) {
      if (!d) { saveLocal(blob, name); return 'local'; }
      return d.save({ filename: name, data: blob }).then(function () { return 'salvo'; },
        function (err) {
          var c = err && err.code;
          if (c === 'declined') return 'recusado';
          if (c === 'rate_limited') return 'ocupado';
          toast('Não foi possível salvar (' + (c || 'erro') + ').');
          return 'erro';
        });
    });
  }

  /* =========================================================
     12. Interface — mesa de trabalho
     A lamina e o objeto principal: edita-se em cima dela, e o painel
     acompanha o que estiver selecionado.
     ========================================================= */
  var $ = function (id) { return document.getElementById(id); };
  var slides = [], foco = 0, sel = null, marca = 'baroni';
  var opts = { disc: '', discOn: true, autofit: true, topAlign: false };

  /* semGuias e usado so na exportacao: o PNG final nao leva as guias */
  function cfg(semGuias) {
    return { disc: opts.disc, discOn: opts.discOn, autofit: opts.autofit,
             topAlign: opts.topAlign, guias: !semGuias };
  }
  function tipos() { return MARCAS[marca].tipos; }
  function tipoPadrao() {
    var k = Object.keys(tipos());
    return k.indexOf('corpo') >= 0 ? 'corpo' : (k.indexOf('texto') >= 0 ? 'texto' : (k[1] || k[0]));
  }
  function blank(type) {
    return { type: type || tipoPadrao(), title: '', sub: '', body: '', numero: '',
             img: null, imgName: '', zoom: 1, fx: 0.5, fy: 0.5,
             fonte: {}, larg: {}, semDisc: false };
  }
  /* copia de lamina que nao compartilha os mapas de ajuste com a original */
  function clonaLamina(l) {
    var c = Object.assign({}, l);
    delete c._regioes; delete c._estouro;
    c.fonte = Object.assign({}, l.fonte || {});
    c.larg = Object.assign({}, l.larg || {});
    return c;
  }
  function txtDe(html) { var d = document.createElement('div'); d.innerHTML = html; return d.textContent; }
  function labelDe(t) { return txtDe((tipos()[t] || {}).label || t); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function toast(m) {
    var t = $('toast'); t.textContent = m; t.classList.add('on');
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('on'); }, 2400);
  }

  /* quais campos cada layout aceita — deriva das regioes que o render registra */
  function camposDe(lam) {
    var vistos = {}, ordem = [];
    (lam._regioes || []).forEach(function (r) {
      if (!vistos[r.campo]) { vistos[r.campo] = 1; ordem.push(r.campo); }
    });
    var pref = ['titulo', 'sub', 'corpo', 'imagem'];
    return pref.filter(function (c) { return vistos[c]; });
  }
  var CHAVE = { titulo: 'title', sub: 'sub', corpo: 'body' };
  var NOME = { titulo: 'Título', sub: 'Subtítulo', corpo: 'Texto', imagem: 'Imagem' };

  /* ---------- perfis ---------- */
  function pintaPerfis() {
    var el = $('perfis');
    if (!el.firstChild) {
      el.innerHTML = Object.keys(MARCAS).map(function (k) {
        var m = MARCAS[k];
        return '<button class="perfil" data-marca="' + k + '" aria-pressed="false">' +
          '<i style="background:' + (m.cor || '#7e848b') + '"></i><span>' + txtDe(m.arroba || m.nome) + '</span></button>';
      }).join('');
    }
    el.querySelectorAll('.perfil').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.marca === marca));
    });
  }

  /* ---------- palco ---------- */
  function molde(i, alt, focada) {
    var lam = slides[i], larg = alt * 0.8, k = larg / W;
    var d = document.createElement('div');
    d.className = 'lam'; d.dataset.foco = focada ? '1' : '0'; d.dataset.i = i;
    var env = document.createElement('div'); env.className = 'envelope';
    var cv = document.createElement('canvas');
    cv.style.width = larg + 'px'; cv.style.height = alt + 'px';
    render(cv, marca, lam, cfg());
    env.appendChild(cv);
    if (focada && sel) {
      (lam._regioes || []).filter(function (r) { return r.campo === sel; }).forEach(function (r) {
        var m = document.createElement('div'); m.className = 'marcador';
        m.style.left = (r.x * k) + 'px'; m.style.top = (r.y * k) + 'px';
        m.style.width = (r.w * k) + 'px'; m.style.height = (r.h * k) + 'px';
        if (sel !== 'imagem') {
          var pg = document.createElement('span');
          pg.className = 'pega';
          pg.title = 'Arraste para limitar até onde o texto vai';
          m.appendChild(pg);
        }
        env.appendChild(m);
      });
      var s2 = document.createElement('div'); s2.className = 'selo';
      s2.style.left = '8px'; s2.style.top = '8px';
      s2.textContent = (NOME[sel] || sel).toUpperCase();
      env.appendChild(s2);
    }
    d.appendChild(env);
    var cap = document.createElement('div'); cap.className = 'cap mono';
    cap.textContent = pad(i + 1) + ' · ' + labelDe(lam.type).toUpperCase();
    d.appendChild(cap);
    return d;
  }

  function pintaPalco() {
    var p = $('palco'); p.innerHTML = '';
    if (!slides.length) {
      var v = document.createElement('div'); v.className = 'vazio';
      v.innerHTML = '<b>Nenhuma lâmina ainda</b>Cole o texto do carrossel para gerar as lâminas, ' +
        'ou comece uma em branco pelo <span class="mono">+</span> na esteira abaixo.';
      p.appendChild(v); return;
    }
    if (foco >= slides.length) foco = slides.length - 1;
    var porAlt = p.clientHeight - 52;
    var porLarg = ((p.clientWidth - 56 - 52) / 2.48) / 0.8;
    var altF = Math.max(200, Math.min(porAlt, porLarg, 620));
    [foco - 1, foco, foco + 1].forEach(function (i) {
      if (i < 0 || i >= slides.length) return;
      p.appendChild(molde(i, i === foco ? altF : altF * 0.74, i === foco));
    });
  }

  /* ---------- esteira ---------- */
  function pintaEsteira() {
    var el = $('esteira'); el.innerHTML = '';
    slides.forEach(function (lam, i) {
      var b = document.createElement('button');
      b.className = 'quadro'; b.dataset.foco = (i === foco) ? '1' : '0'; b.dataset.i = i;
      b.setAttribute('aria-label', 'Lâmina ' + (i + 1));
      var cv = document.createElement('canvas');
      var k = 46 / W;
      cv.style.transform = 'scale(' + k + ')';
      render(cv, marca, lam, cfg());
      b.appendChild(cv);
      var n = document.createElement('span'); n.className = 'n'; n.textContent = pad(i + 1);
      b.appendChild(n);
      if (lam._estouro) { var a = document.createElement('span'); a.className = 'alerta'; b.appendChild(a); }
      el.appendChild(b);
    });
    var mais = document.createElement('button');
    mais.className = 'maisq'; mais.id = 'add'; mais.setAttribute('aria-label', 'Adicionar lâmina');
    mais.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
    el.appendChild(mais);
  }

  /* ---------- recorte da imagem, desenhado como sai na lamina ---------- */
  function caixaImg(lam) {
    var t = tipos()[lam.type] || {};
    return t.img ? { w: t.img.w, h: t.img.h } : { w: W, h: H };
  }
  function pintaRecorte() {
    var cv = document.querySelector('.recorte canvas');
    if (!cv) return;
    var lam = slides[foco], c = caixaImg(lam);
    var esc = 260 / c.w;
    cv.width = Math.round(c.w * esc); cv.height = Math.round(c.h * esc);
    var x = cv.getContext('2d');
    x.fillStyle = '#0f1114'; x.fillRect(0, 0, cv.width, cv.height);
    if (lam.img) { x.save(); x.scale(esc, esc); drawCover(x, lam.img, 0, 0, c.w, c.h, lam); x.restore(); }
  }

  /* ---------- painel ---------- */
  function pintaPainel() {
    var el = $('painel');
    if (!slides.length) {
      el.innerHTML = '<div class="pbloco"><p class="ajuda">O painel mostra os campos da lâmina selecionada.</p></div>';
      return;
    }
    var lam = slides[foco], M = MARCAS[marca];
    var campos = camposDe(lam);
    if (campos.indexOf(sel) < 0) sel = campos[0] || null;
    var h = [];

    h.push('<div class="pcab"><div class="k mono">LÂMINA ' + pad(foco + 1) + '</div>' +
      '<div class="v">' + txtDe(NOME[sel] || 'Lâmina') + '</div></div>');

    h.push('<div class="pbloco">');
    h.push('<div><div class="rot mono">LAYOUT</div><select class="campo" id="tipo">' +
      Object.keys(tipos()).map(function (k) {
        return '<option value="' + k + '"' + (k === lam.type ? ' selected' : '') + '>' + txtDe(labelDe(k)) + '</option>';
      }).join('') + '</select></div>');

    if (marca === 'consultoria' && lam.type !== 'capa')
      h.push('<div><div class="rot mono">NÚMERO NO CÍRCULO</div>' +
        '<input class="campo" id="num" value="' + txtDe(lam.numero || '') + '" style="max-width:96px"></div>');

    if (sel === 'imagem') {
      var c = caixaImg(lam), fg = lam.img ? folga(lam.img, c.w, c.h, lam.zoom) : { x: 0, y: 0 };
      h.push('<div><div class="rot mono">IMAGEM</div>' +
        '<input class="campo" type="file" id="arq" accept="image/*"></div>');
      if (lam.img) {
        h.push('<div><div class="rot mono">ENQUADRAMENTO</div><div class="recorte"><canvas></canvas></div></div>');
        h.push(ctrl('zoom', 'Zoom', Math.round((lam.zoom || 1) * 100), 100, 300, Math.round((lam.zoom || 1) * 100) + '%', false));
        h.push(ctrl('fx', 'Horizontal', Math.round((lam.fx == null ? .5 : lam.fx) * 100), 0, 100,
          fg.x > 1 ? Math.round((lam.fx == null ? .5 : lam.fx) * 100) + '%' : 'sem folga', fg.x <= 1));
        h.push(ctrl('fy', 'Vertical', Math.round((lam.fy == null ? .5 : lam.fy) * 100), 0, 100,
          fg.y > 1 ? Math.round((lam.fy == null ? .5 : lam.fy) * 100) + '%' : 'sem folga', fg.y <= 1));
        h.push('<div class="acoes"><button class="btn2 perigo" id="semimg">Remover imagem</button></div>');
      }
    } else if (sel) {
      h.push('<div><div class="rot mono">' + txtDe((NOME[sel] || sel).toUpperCase()) + '</div>' +
        '<textarea class="campo" id="txt" rows="' + (sel === 'corpo' ? 8 : 3) + '">' +
        txtDe(lam[CHAVE[sel]] || '').replace(/[&<>]/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[ch]; }) +
        '</textarea><p class="ajuda">' + M.dica + '</p></div>');
      var pf = Math.round(((lam.fonte || {})[sel] || 1) * 100);
      var pl = Math.round(((lam.larg || {})[sel] || 1) * 100);
      h.push(ctrl('fonte', 'Tamanho da fonte', pf, 60, 150, pf + '%', false));
      h.push(ctrl('largura', 'Largura do texto', pl, 35, tetoLarg(lam, sel), pl + '%', false));
      if (pf !== 100 || pl !== 100)
        h.push('<div class="acoes"><button class="btn2" id="reset-ajuste">Voltar ao padrão do layout</button></div>');
    }

    h.push('<div id="aviso-slot"></div>');

    h.push('<div class="acoes">' +
      '<button class="btn2" id="esq" ' + (foco === 0 ? 'disabled' : '') + ' aria-label="Mover para trás">←</button>' +
      '<button class="btn2" id="dir" ' + (foco === slides.length - 1 ? 'disabled' : '') + ' aria-label="Mover para frente">→</button>' +
      '<button class="btn2" id="dup">Duplicar</button>' +
      (slides.length > 1 ? '<button class="btn2 perigo" id="del">Excluir</button>' : '') + '</div>');
    if (M.disclaimer)
      h.push('<div class="acoes"><button class="btn2 alterna" id="disc-on" data-ativo="' +
        (lam.semDisc ? '0' : '1') + '">' +
        (lam.semDisc ? 'Pôr o disclaimer nesta lâmina' : 'Tirar o disclaimer desta lâmina') +
        '</button></div>');
    h.push('<div class="acoes"><button class="btn2" id="dl-one">Baixar esta lâmina</button></div>');
    h.push('</div>');

    /* ajustes gerais no fim, porque mudam pouco */
    h.push('<div class="pbloco">');
    h.push('<div class="rot mono">AJUSTES</div>');
    if (M.disclaimer)
      h.push('<div><div class="rot mono">TEXTO DO DISCLAIMER</div>' +
        '<input class="campo" id="disc" value="' + txtDe(opts.disc).replace(/"/g, '&quot;') + '">' +
        '<p class="ajuda">Vale para todas as lâminas que mostram o aviso.</p></div>');
    h.push('<label class="check"><input type="checkbox" id="autofit"' + (opts.autofit ? ' checked' : '') + '> Reduzir a fonte quando o texto estourar</label>');
    if (M.topAlign)
      h.push('<label class="check"><input type="checkbox" id="topalign"' + (opts.topAlign ? ' checked' : '') + '> Alinhar corpo no topo</label>');
    h.push('</div>');

    el.innerHTML = h.join('');
    pintaRecorte();
    marcaEstouro();
  }

  function ctrl(id, rot, val, min, max, txt, off) {
    return '<div class="ctrl" data-off="' + (off ? '1' : '0') + '">' +
      '<div class="lin"><span>' + rot + '</span><span class="mono">' + txt + '</span></div>' +
      '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" value="' + val + '"' +
      (off ? ' disabled' : '') + ' aria-label="' + rot + '"></div>';
  }

  /* aviso de estouro: selo na esteira e explicacao no painel, sem refazer
     nenhum dos dois inteiros — refazer o painel mataria o foco de quem digita */
  function marcaEstouro() {
    if (!slides.length) return;
    var lam = slides[foco], campo = lam._estouro;
    var q = $('esteira').querySelector('.quadro[data-i="' + foco + '"]');
    if (q) {
      var tem = q.querySelector('.alerta');
      if (campo && !tem) { var a = document.createElement('span'); a.className = 'alerta'; q.appendChild(a); }
      if (!campo && tem) tem.remove();
    }
    var slot = $('aviso-slot');
    if (!slot) return;
    if (!campo) { slot.innerHTML = ''; return; }
    slot.innerHTML = '<div class="aviso"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--warn)" stroke-width="1.8" stroke-linecap="round" style="flex:none;margin-top:1px" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' +
      '<div><b>' + (NOME[campo] || campo) + ' longo demais</b><p>' +
      (opts.autofit ? 'A fonte foi reduzida para caber.' : 'Passou do espaço da lâmina e vai sair cortado.') +
      '</p></div></div>';
  }

  function pinta() {
    $('conta').textContent = slides.length + ' / 20 lâminas';
    $('rot-exportar').textContent = slides.length > 1 ? 'Exportar' : 'Exportar';
    pintaPerfis(); pintaPalco(); pintaEsteira(); pintaPainel();
  }
  /* durante o arrasto o palco nao pode ser reconstruido: o elemento que esta
     sendo arrastado sumiria no meio do gesto. Aqui so a arte e redesenhada e
     os marcadores sao reposicionados. */
  function redesenhaFoco() {
    var d = $('palco').querySelector('.lam[data-foco="1"]');
    if (!d) return;
    var cv = d.querySelector('canvas'); if (!cv) return;
    var k = parseFloat(cv.style.width) / W;
    render(cv, marca, slides[foco], cfg());
    var regs = (slides[foco]._regioes || []).filter(function (r) { return r.campo === sel; });
    d.querySelectorAll('.marcador').forEach(function (m, i) {
      var r = regs[i]; if (!r) return;
      m.style.left = (r.x * k) + 'px'; m.style.top = (r.y * k) + 'px';
      m.style.width = (r.w * k) + 'px'; m.style.height = (r.h * k) + 'px';
    });
    marcaEstouro();
  }

  /* so o palco e o quadro em foco, para digitar sem engasgo */
  function pintaLeve() {
    pintaPalco();
    var q = $('esteira').querySelector('.quadro[data-i="' + foco + '"]');
    if (q) { var cv = q.querySelector('canvas'); if (cv) render(cv, marca, slides[foco], cfg()); }
    marcaEstouro();
  }

  /* ---------- divisao automatica do texto colado ---------- */
  function autoSplit(raw) {
    var ctx = document.createElement('canvas').getContext('2d');
    var paras = raw.replace(/\r/g, '').split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean);
    if (!paras.length) return [];
    var out = [], first = paras.shift().split('\n');
    var capa = blank('capa');
    if (marca === 'noticias') capa.title = first.join(' ');
    else { capa.title = first[0] || ''; capa.sub = first.slice(1).join(' '); }
    out.push(capa);

    if (marca === 'noticias') {
      var espaco = 640, atual = '';
      paras.forEach(function (pp) {
        var teste = atual ? atual + '\n\n' + pp : pp;
        if (atual && layout(ctx, teste, N.texto.body).height > espaco) {
          var sn = blank('texto'); sn.body = atual; out.push(sn); atual = pp;
        } else atual = teste;
      });
      if (atual) { var sn2 = blank('texto'); sn2.body = atual; out.push(sn2); }
      return out;
    }
    if (marca === 'suno' || marca === 'tiago' || marca === 'consultoria') {
      paras.forEach(function (p, i) {
        var ls = p.split('\n'), s = blank('texto');
        s.title = ls[0]; s.body = ls.slice(1).join('\n');
        if (!s.body) { s.body = s.title; s.title = ''; }
        s.numero = String(i + 1);
        out.push(s);
      });
      return out;
    }
    var tipo = tipoPadrao(), def = tipos()[tipo] || {};
    var espec = def.body || B.corpo.body;
    var avail = (marca === 'baroni') ? (B.corpo.regionBottom - B.corpo.regionTop) : 640;
    var cur = '';
    paras.forEach(function (p) {
      var test = cur ? cur + '\n\n' + p : p;
      if (cur && layout(ctx, test, espec).height > avail) {
        var s = blank(tipo); s.body = cur; out.push(s); cur = p;
      } else cur = test;
    });
    if (cur) { var s2 = blank(tipo); s2.body = cur; out.push(s2); }
    return out;
  }

  /* ---------- exportar ---------- */
  function pngDe(i) {
    var cv = document.createElement('canvas');
    render(cv, marca, slides[i], cfg(true));
    return new Promise(function (res) { cv.toBlob(res, 'image/png'); });
  }
  function baixarUma(i) {
    pngDe(i).then(function (b) { save(b, pad(i + 1) + '.png'); });
  }
  function baixarTodas() {
    if (!slides.length) { toast('Nada para exportar.'); return; }
    Promise.all(slides.map(function (_, i) {
      return pngDe(i).then(function (b) { return { name: pad(i + 1) + '.png', blob: b }; });
    })).then(function (arqs) {
      return capDownloads.then(function (d) {
        if (!d) {
          return Promise.all(arqs.map(function (f) {
            return f.blob.arrayBuffer().then(function (ab) { return { name: f.name, data: new Uint8Array(ab) }; });
          })).then(function (ent) {
            saveLocal(zip(ent), 'carrossel-' + marca + '.zip');
            toast(ent.length + ' PNGs no zip.');
          });
        }
        var n = 0;
        return arqs.reduce(function (ch, f) {
          return ch.then(function (parar) {
            if (parar) return true;
            return save(f.blob, f.name).then(function (r) {
              if (r === 'salvo') { n++; return false; }
              return r === 'recusado';
            });
          });
        }, Promise.resolve(false)).then(function () { toast(n + ' de ' + arqs.length + ' PNGs salvos.'); });
      });
    });
  }

  /* ---------- eventos ---------- */
  /* o app nunca fica sem lamina: a capa do perfil ativo e o ponto de partida */
  function comecoLimpo() {
    var kCapa = Object.keys(tipos())[0];
    slides = [blank(kCapa)];
    foco = 0; sel = 'titulo';
  }

  function aplicaMarca() {
    if (!slides.length) { comecoLimpo(); pinta(); return; }
    var validos = Object.keys(tipos());
    slides.forEach(function (s) { if (validos.indexOf(s.type) < 0) s.type = tipoPadrao(); });
    sel = null; pinta();
  }

  function coordNaLamina(ev, cv) {
    var r = cv.getBoundingClientRect();
    return { x: (ev.clientX - r.left) * (W / r.width), y: (ev.clientY - r.top) * (H / r.height) };
  }

  document.addEventListener('click', function (ev) {
    var b;
    if ((b = ev.target.closest('[data-marca]'))) {
      marcaVersao('antes de trocar de perfil');
      marca = b.dataset.marca; aplicaMarca();
      toast('Perfil: ' + txtDe(MARCAS[marca].arroba || MARCAS[marca].nome)); return;
    }
    var lamEl = ev.target.closest('.lam');
    if (lamEl) {
      var i = +lamEl.dataset.i;
      if (i === foco) {
        var cv = lamEl.querySelector('canvas');
        var pt = coordNaLamina(ev, cv);
        var campo = campoEm(slides[i], pt.x, pt.y);
        if (campo) { sel = campo; pinta(); return; }
      }
      foco = i; pinta(); return;
    }
    var q = ev.target.closest('.quadro');
    if (q) { foco = +q.dataset.i; pinta(); return; }

    if (ev.target.closest('#add')) {
      slides.push(blank()); foco = slides.length - 1; sel = null; pinta(); return;
    }
    if (ev.target.closest('#dup')) {
      slides.splice(foco + 1, 0, clonaLamina(slides[foco])); foco++; pinta(); return;
    }
    if (ev.target.closest('#del')) {
      marcaVersao('antes de apagar lâmina');
      slides.splice(foco, 1);
      if (!slides.length) comecoLimpo();
      else if (foco >= slides.length) foco = slides.length - 1;
      pinta(); return;
    }
    if (ev.target.closest('#esq') && foco > 0) {
      slides.splice(foco - 1, 0, slides.splice(foco, 1)[0]); foco--; pinta(); return;
    }
    if (ev.target.closest('#dir') && foco < slides.length - 1) {
      slides.splice(foco + 1, 0, slides.splice(foco, 1)[0]); foco++; pinta(); return;
    }
    if (ev.target.closest('#disc-on')) {
      slides[foco].semDisc = !slides[foco].semDisc;
      pinta(); return;
    }
    if (ev.target.closest('#reset-ajuste')) {
      var lm = slides[foco];
      if (lm.fonte) delete lm.fonte[sel];
      if (lm.larg) delete lm.larg[sel];
      pinta(); return;
    }
    if (ev.target.closest('#semimg')) { slides[foco].img = null; slides[foco].imgName = ''; pinta(); return; }
    if (ev.target.closest('#dl-one')) { baixarUma(foco); return; }
    if (ev.target.closest('#dl-all')) { baixarTodas(); return; }

    if (ev.target.closest('#btn-colar')) { $('cortina').hidden = false; $('bulk').focus(); return; }
    if (ev.target.closest('#fechar-colar') || ev.target.id === 'cortina') { $('cortina').hidden = true; return; }
    if (ev.target.closest('#bulk-go')) {
      var raw = $('bulk').value.trim();
      if (!raw) { toast('Cole algum texto primeiro.'); return; }
      marcaVersao('antes de colar texto');
      slides = autoSplit(raw); foco = 0; sel = null;
      $('cortina').hidden = true; pinta();
      toast(slides.length + ' lâminas geradas.'); return;
    }
    if (ev.target.closest('#bulk-clear')) {
      var bt = ev.target.closest('#bulk-clear');
      if (!bt._armado) {
        bt._armado = setTimeout(function () { bt._armado = null; bt.textContent = 'Limpar tudo'; }, 3500);
        bt.textContent = 'Confirmar?'; return;
      }
      clearTimeout(bt._armado); bt._armado = null; bt.textContent = 'Limpar tudo';
      marcaVersao('antes de limpar tudo');
      $('bulk').value = ''; comecoLimpo(); $('cortina').hidden = true; pinta(); return;
    }
  });

  document.addEventListener('input', function (ev) {
    var id = ev.target.id;
    if (id === 'disc') { opts.disc = ev.target.value; pintaLeve(); return; }
    if (!slides.length) return;
    var lam = slides[foco];
    if (id === 'txt') { lam[CHAVE[sel]] = ev.target.value; pintaLeve(); return; }
    if (id === 'num') { lam.numero = ev.target.value; pintaLeve(); return; }
    if (id === 'fonte' || id === 'largura') {
      if (!sel) return;
      var mapa = (id === 'fonte') ? 'fonte' : 'larg';
      if (!lam[mapa]) lam[mapa] = {};
      lam[mapa][sel] = ev.target.value / 100;
      var rotulo = ev.target.closest('.ctrl').querySelector('.lin span:last-child');
      if (rotulo) rotulo.textContent = ev.target.value + '%';
      pintaLeve();
      return;
    }
    if (id === 'zoom' || id === 'fx' || id === 'fy') {
      if (id === 'zoom') lam.zoom = ev.target.value / 100; else lam[id] = ev.target.value / 100;
      pintaLeve(); pintaRecorte();
      var c = caixaImg(lam), fg = folga(lam.img, c.w, c.h, lam.zoom);
      ev.target.closest('.pbloco').querySelectorAll('.ctrl').forEach(function (cc) {
        var r = cc.querySelector('input'), rot = cc.querySelector('.lin span:last-child');
        if (!r) return;
        if (r.id === 'zoom') rot.textContent = Math.round(lam.zoom * 100) + '%';
        if (r.id === 'fx') { cc.dataset.off = fg.x > 1 ? '0' : '1'; r.disabled = !(fg.x > 1); rot.textContent = fg.x > 1 ? Math.round(lam.fx * 100) + '%' : 'sem folga'; }
        if (r.id === 'fy') { cc.dataset.off = fg.y > 1 ? '0' : '1'; r.disabled = !(fg.y > 1); rot.textContent = fg.y > 1 ? Math.round(lam.fy * 100) + '%' : 'sem folga'; }
      });
      return;
    }
  });

  document.addEventListener('change', function (ev) {
    var id = ev.target.id;
    if (id === 'tipo') { slides[foco].type = ev.target.value; sel = null; pinta(); return; }

    if (id === 'autofit') { opts.autofit = ev.target.checked; pinta(); return; }
    if (id === 'topalign') { opts.topAlign = ev.target.checked; pinta(); return; }
    if (id === 'arq') {
      var f = ev.target.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        loadImage(r.result).then(function (im) {
          slides[foco].img = im; slides[foco].imgName = f.name; pinta();
        });
      };
      r.readAsDataURL(f); return;
    }
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && !$('cortina').hidden) { $('cortina').hidden = true; return; }
    if (ev.target.matches('input,textarea,select')) return;
    if (ev.key === 'ArrowLeft' && foco > 0) { foco--; pinta(); }
    if (ev.key === 'ArrowRight' && foco < slides.length - 1) { foco++; pinta(); }
  });

  /* ---------- arrastar a borda do texto ---------- */
  $('palco').addEventListener('pointerdown', function (ev) {
    var pega = ev.target.closest('.pega');
    if (!pega || !sel || !slides[foco]) return;
    var lam = slides[foco];
    var reg = (lam._regioes || []).filter(function (r) { return r.campo === sel; })[0];
    var cv = $('palco').querySelector('.lam[data-foco="1"] canvas');
    if (!reg || !cv) return;
    ev.preventDefault();
    marcaVersaoLeve('antes de mudar a largura do texto');
    var k = parseFloat(cv.style.width) / W;      /* palco -> coordenadas da arte */
    var x0 = ev.clientX, base = reg.w, fator0 = (lam.larg || {})[sel] || 1;
    var teto = tetoLarg(lam, sel) / 100;
    pega.setPointerCapture(ev.pointerId);
    document.body.dataset.arrastandoTexto = '1';
    var move = function (e) {
      var nova = base + (e.clientX - x0) / k;
      var f = fator0 * (nova / base);
      f = Math.max(0.35, Math.min(teto, f));
      if (!lam.larg) lam.larg = {};
      lam.larg[sel] = f;
      var r = $('largura');
      if (r) {
        r.value = Math.round(f * 100);
        var rot = r.closest('.ctrl').querySelector('.lin span:last-child');
        if (rot) rot.textContent = Math.round(f * 100) + '%';
      }
      redesenhaFoco();
    };
    var fim = function () {
      pega.removeEventListener('pointermove', move);
      pega.removeEventListener('pointerup', fim);
      pega.removeEventListener('pointercancel', fim);
      document.body.removeAttribute('data-arrastando-texto');
      pinta();
    };
    pega.addEventListener('pointermove', move);
    pega.addEventListener('pointerup', fim);
    pega.addEventListener('pointercancel', fim);
  });
  /* o clique que fecha o arrasto nao pode virar selecao de campo */
  $('palco').addEventListener('click', function (ev) {
    if (ev.target.closest('.pega')) { ev.stopPropagation(); ev.preventDefault(); }
  }, true);

  var reTempo;
  window.addEventListener('resize', function () {
    clearTimeout(reTempo); reTempo = setTimeout(pintaPalco, 120);
  });

  /* ---------- partida ---------- */
  bootAssets().then(function () {
    opts.disc = '⚠️ Este conteúdo não é uma recomendação de investimento.';
    $('dica-colar').innerHTML = 'A primeira linha vira o título da capa. Parágrafos separados por linha em branco viram as lâminas seguintes.';
    if (!HAS_LS) { $('fontstat').hidden = false; $('fontstat').textContent = 'aviso: navegador sem letter-spacing em canvas'; }
    vestirIdentidade();
    comecoLimpo();
    abrir('home');
    var pr = $('prompt'); if (pr) pr.focus();
    window.__render = render; window.__slides = function () { return slides; };
    window.__blank = blank; window.__campoEm = campoEm; window.__tipos = tipos;
    window.__setMarca = function (m) { marca = m; aplicaMarca(); };
    window.__redraw = pinta; window.__foco = function (i) { foco = i; pinta(); };
    window.__sel = function (c) { sel = c; pinta(); };
    window.__opts = opts;
    window.__ready = true;
  }).catch(function (e) {
    document.body.innerHTML = '<p style="padding:40px;font:16px sans-serif;color:#e5484d">Falha ao carregar fontes/assets: ' + e + '</p>';
  });


  /* =========================================================
     13. SUNO DESIGN — casca da plataforma
     O gerador de carrossel passa a ser uma ferramenta entre outras.
     ========================================================= */
  var VIEWS = ['home', 'carrossel', 'biblioteca', 'ideias'];
  var viewAtual = 'home';

  function vestirIdentidade() {
    var A = window.__ASSETS__;
    $('img-marca').src = 'data:image/png;base64,' + A.sdMarca;
    $('img-marca-sm').src = 'data:image/png;base64,' + A.sdMarcaSm;
    $('img-wordmark').src = svgUri(atob(A.sdWordmark));
    $('img-ai').src = 'data:image/png;base64,' + A.sdAi;
    $('ic-ideias').src = 'data:image/png;base64,' + A.sdIcIdeias;
    $('ic-carrossel').src = 'data:image/png;base64,' + A.sdIcCarrossel;
    $('ic-biblioteca').src = 'data:image/png;base64,' + A.sdIcBiblioteca;
  }

  function abrir(v) {
    if (VIEWS.indexOf(v) < 0) v = 'home';
    viewAtual = v;
    document.querySelectorAll('.view').forEach(function (el) {
      el.dataset.ativa = (el.dataset.view === v) ? '1' : '0';
    });
    document.querySelectorAll('.item').forEach(function (b) {
      if (b.dataset.view === v) b.setAttribute('aria-current', 'page');
      else b.removeAttribute('aria-current');
    });
    /* o palco mede a altura disponivel: so da para calcular depois de visivel */
    if (v === 'carrossel') pinta();
    if (v === 'biblioteca' || v === 'home') pintaGaleria(v === 'home' ? 'galeria-home' : 'galeria');
  }

  /* ---------- historico de versoes ----------
     A guarda automatica grava por cima do mesmo registro a cada 250 ms. Isso
     protege contra fechar a aba, mas nao protege contra uma acao que reescreve
     o carrossel inteiro: quando isso acontece, a versao boa ja foi sobrescrita.
     Aqui ficam os pontos de retorno.

     As fotos nao entram na versao: elas vao para uma loja a parte, com id
     derivado do conteudo, e a versao guarda so a referencia. Assim dez versoes
     do mesmo carrossel com a mesma foto guardam a foto uma vez. */
  var VERSOES_MAX = 15;
  var PAUSA_VERSAO = 90000;    /* de tempos em tempos, enquanto a pessoa edita */
  var ultimaVersao = 0, assinaturaVersao = null, versionando = false;

  function hashTexto(t) {
    var h = 5381;
    for (var i = 0; i < t.length; i++) h = ((h * 33) ^ t.charCodeAt(i)) >>> 0;
    return h.toString(36) + '-' + t.length.toString(36);
  }

  /* Para gestos que a pessoa repete — arrastar a borda do texto, por exemplo —
     marcar um ponto por gesto entupiria o historico e empurraria para fora os
     pontos que interessam. Aqui um ponto so nasce se o anterior ja tem idade. */
  function marcaVersaoLeve(motivo) {
    if (Date.now() - ultimaVersao < 30000) return Promise.resolve(false);
    return marcaVersao(motivo);
  }

  function marcaVersao(motivo) {
    if (!slides.length || documentoVazio()) return Promise.resolve(false);
    if (!pecaAtual) pecaAtual = 'p' + Date.now();
    var idPeca = pecaAtual, fotos = [];
    var laminas = slides.map(function (l) {
      var ref = null;
      if (l.img && l.img.src) {
        ref = idPeca + ':' + hashTexto(l.img.src);
        fotos.push({ id: ref, dados: l.img.src });
      }
      return { type: l.type, title: l.title, sub: l.sub, body: l.body, numero: l.numero,
               zoom: l.zoom, fx: l.fx, fy: l.fy, imgRef: ref, imgName: l.imgName,
               semDisc: !!l.semDisc,
               fonte: Object.assign({}, l.fonte || {}), larg: Object.assign({}, l.larg || {}) };
    });
    var v = {
      id: idPeca + ':' + Date.now(),
      peca: idPeca,
      quando: new Date().toISOString(),
      motivo: motivo || 'edição',
      marca: marca,
      n: slides.length,
      titulo: (slides[0].title || slides[0].body || '').replace(/\*\*|__/g, '').slice(0, 70) || 'Sem título',
      opts: { disc: opts.disc, discOn: opts.discOn, autofit: opts.autofit, topAlign: opts.topAlign },
      laminas: laminas
    };
    ultimaVersao = Date.now();
    assinaturaVersao = assinatura();
    return comLojas(['versoes', 'fotos'], 'readwrite', function (lj) {
      lj.versoes.put(v);
      fotos.forEach(function (f) { lj.fotos.put(f); });
    }).then(function () { return podaVersoes(idPeca); }).then(function () { return true; },
            function () { return false; });
  }

  /* mantem as ultimas N e joga fora foto que nenhuma delas usa mais */
  function podaVersoes(idPeca) {
    return listaVersoes(idPeca).then(function (lista) {
      var vivas = lista.slice(0, VERSOES_MAX), mortas = lista.slice(VERSOES_MAX);
      var usadas = {};
      vivas.forEach(function (v) {
        v.laminas.forEach(function (l) { if (l.imgRef) usadas[l.imgRef] = 1; });
      });
      slides.forEach(function (l) {
        if (l.img && l.img.src) usadas[idPeca + ':' + hashTexto(l.img.src)] = 1;
      });
      return comLojas(['versoes', 'fotos'], 'readwrite', function (lj) {
        mortas.forEach(function (v) { lj.versoes.delete(v.id); });
        var cur = lj.fotos.openCursor();
        cur.onsuccess = function () {
          var c = cur.result; if (!c) return;
          var id = String(c.key);
          if (id.indexOf(idPeca + ':') === 0 && !usadas[id]) c.delete();
          c.continue();
        };
      });
    });
  }

  function listaVersoes(idPeca) {
    return comLojas(['versoes'], 'readonly', function (lj, saida) {
      var p = lj.versoes.index('peca').getAll(idPeca);
      p.onsuccess = function () { saida.lista = p.result || []; };
    }).then(function (r) {
      var lista = (r && r.lista) || [];
      lista.sort(function (a, b) { return b.quando.localeCompare(a.quando); });
      return lista;
    });
  }

  function restauraVersao(id) {
    return marcaVersao('antes de restaurar').then(function () {
      return comLojas(['versoes', 'fotos'], 'readonly', function (lj, saida) {
        var p = lj.versoes.get(id);
        p.onsuccess = function () {
          saida.v = p.result;
          if (!saida.v) return;
          saida.fotos = {};
          saida.v.laminas.forEach(function (l) {
            if (!l.imgRef) return;
            var q = lj.fotos.get(l.imgRef);
            q.onsuccess = function () { if (q.result) saida.fotos[l.imgRef] = q.result.dados; };
          });
        };
      });
    }).then(function (r) {
      var v = r && r.v;
      if (!v) { toast('Não encontrei essa versão.'); return false; }
      var srcs = v.laminas.map(function (l) {
        var d = l.imgRef ? r.fotos[l.imgRef] : null;
        return d ? loadImage(d) : Promise.resolve(null);
      });
      return Promise.all(srcs).then(function (imgs) {
        if (MARCAS[v.marca]) marca = v.marca;
        var velhoSemDisc = !!(v.opts && v.opts.discOn === false);
        if (v.opts) {
          opts.disc = v.opts.disc; opts.autofit = v.opts.autofit; opts.topAlign = v.opts.topAlign;
        }
        opts.discOn = true;
        slides = v.laminas.map(function (l, i) {
          return { type: l.type, title: l.title || '', sub: l.sub || '', body: l.body || '',
                   numero: l.numero || '', zoom: l.zoom || 1,
                   fx: l.fx == null ? .5 : l.fx, fy: l.fy == null ? .5 : l.fy,
                   img: imgs[i], imgName: l.imgName || '',
                   semDisc: !!l.semDisc || velhoSemDisc,
                   fonte: Object.assign({}, l.fonte || {}), larg: Object.assign({}, l.larg || {}) };
        });
        foco = 0; sel = null;
        miniBlob = null; miniAssin = null;   /* a capa mudou */
        pinta();
        assinaturaVersao = assinatura();
        return true;
      });
    });
  }

  function apagaHistorico(idPeca) {
    return listaVersoes(idPeca).then(function (lista) {
      return comLojas(['versoes', 'fotos'], 'readwrite', function (lj) {
        lista.forEach(function (v) { lj.versoes.delete(v.id); });
        var cur = lj.fotos.openCursor();
        cur.onsuccess = function () {
          var c = cur.result; if (!c) return;
          if (String(c.key).indexOf(idPeca + ':') === 0) c.delete();
          c.continue();
        };
      });
    });
  }

  /* ---------- painel de versoes ---------- */
  function quandoRelativo(iso) {
    var d = new Date(iso), min = Math.round((Date.now() - d.getTime()) / 60000);
    if (min < 1) return 'agora';
    if (min < 60) return 'há ' + min + ' min';
    var h = Math.round(min / 60);
    if (h < 24) return 'há ' + h + (h === 1 ? ' hora' : ' horas');
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) + ' · ' +
           d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  function pintaVersoes() {
    var el = $('lista-versoes'); if (!el) return;
    if (!pecaAtual) {
      el.innerHTML = '<p class="galeria-vazia">Este carrossel ainda não tem pontos de retorno. ' +
        'Eles aparecem sozinhos conforme você trabalha.</p>';
      return;
    }
    listaVersoes(pecaAtual).then(function (lista) {
      if (!lista.length) {
        el.innerHTML = '<p class="galeria-vazia">Nenhum ponto ainda. ' +
          'O primeiro é criado antes da próxima ação que reescreve o carrossel.</p>';
        return;
      }
      el.innerHTML = '';
      lista.forEach(function (v) {
        var li = document.createElement('div'); li.className = 'versao';
        var txt = document.createElement('div'); txt.className = 'v-txt';
        var b = document.createElement('b'); b.textContent = v.motivo;
        var sp = document.createElement('span');
        sp.textContent = quandoRelativo(v.quando) + ' · ' + v.n +
          (v.n === 1 ? ' lâmina' : ' lâminas') + ' · ' +
          txtDe((MARCAS[v.marca] || {}).arroba || v.marca);
        txt.appendChild(b); txt.appendChild(sp);
        var bt = document.createElement('button');
        bt.className = 'btn2'; bt.dataset.restaura = v.id; bt.textContent = 'Restaurar';
        li.appendChild(txt); li.appendChild(bt);
        el.appendChild(li);
      });
    });
  }

  /* ---------- barra lateral: largura ajustavel e recolhimento ----------
     A largura vive numa variavel de CSS e fica guardada no navegador, entao
     cada pessoa reabre a plataforma do jeito que deixou. */
  /* 256 e o menor valor em que "Gerador de Carrossel" ainda cabe inteiro;
     abaixo disso o caminho e recolher a barra, nao espremer o rotulo */
  var LAT_MIN = 256, LAT_MAX = 420, LAT_PADRAO = 272;
  var lateral = $('lateral'), puxador = $('puxador'), btnLateral = $('btn-lateral');
  var largura = LAT_PADRAO, colapsada = false, tempoPalco = 0;

  /* Em tela estreita a barra nao pode comer o palco: o teto cai para 34% da
     janela. So que esse teto e circunstancial — a preferencia de quem usa fica
     guardada inteira em `largura` e volta sozinha quando a janela cresce. */
  function tetoLargura() {
    var w = window.innerWidth || 0;
    if (w < 700) return LAT_MAX;   /* janela minuscula, ou ainda sem medida */
    var t = Math.min(LAT_MAX, Math.round(w * 0.34));
    return t < LAT_MIN ? LAT_MIN : t;
  }
  function limiteLargura(v) {
    v = +v; if (!isFinite(v)) v = LAT_PADRAO;
    var teto = tetoLargura();
    return v < LAT_MIN ? LAT_MIN : (v > teto ? teto : Math.round(v));
  }
  function aplicaLateral() {
    var aplicada = limiteLargura(largura);
    document.documentElement.style.setProperty('--larg-lateral', aplicada + 'px');
    lateral.dataset.colapsada = colapsada ? '1' : '0';
    puxador.setAttribute('aria-valuenow', aplicada);
    puxador.setAttribute('aria-valuemax', tetoLargura());
    btnLateral.setAttribute('aria-expanded', colapsada ? 'false' : 'true');
    btnLateral.setAttribute('aria-label', colapsada ? 'Abrir barra lateral' : 'Recolher barra lateral');
    btnLateral.title = colapsada ? 'Abrir a barra' : 'Recolher a barra (só os ícones)';
  }
  function guardaLateral() {
    try { localStorage.setItem('sd-lateral', JSON.stringify({ w: largura, c: colapsada })); }
    catch (e) {}
  }
  /* o palco mede a largura livre: refaz o enquadramento sem travar o arrasto */
  function refazPalco() {
    if (viewAtual !== 'carrossel') return;
    clearTimeout(tempoPalco);
    tempoPalco = setTimeout(pintaPalco, 60);
  }

  (function () {
    var g = null;
    try { g = JSON.parse(localStorage.getItem('sd-lateral') || 'null'); } catch (e) {}
    if (g) { largura = limiteLargura(g.w); colapsada = !!g.c; }
    aplicaLateral();
    /* so depois do primeiro desenho a largura passa a animar */
    setTimeout(function () { lateral.dataset.pronta = '1'; }, 0);
  })();

  puxador.addEventListener('pointerdown', function (ev) {
    if (colapsada || ev.button) return;
    ev.preventDefault();
    var x0 = ev.clientX, w0 = largura;
    lateral.dataset.arrastando = '1';
    puxador.setPointerCapture(ev.pointerId);
    var move = function (e) { largura = limiteLargura(w0 + e.clientX - x0); aplicaLateral(); refazPalco(); };
    var fim = function () {
      lateral.removeAttribute('data-arrastando');
      puxador.removeEventListener('pointermove', move);
      puxador.removeEventListener('pointerup', fim);
      puxador.removeEventListener('pointercancel', fim);
      guardaLateral(); refazPalco();
    };
    puxador.addEventListener('pointermove', move);
    puxador.addEventListener('pointerup', fim);
    puxador.addEventListener('pointercancel', fim);
  });
  puxador.addEventListener('dblclick', function () {
    largura = LAT_PADRAO; aplicaLateral(); guardaLateral(); refazPalco();
  });
  puxador.addEventListener('keydown', function (ev) {
    var passo = ev.key === 'ArrowLeft' ? -16 : (ev.key === 'ArrowRight' ? 16 : 0);
    if (!passo) return;
    ev.preventDefault();
    largura = limiteLargura(largura + passo); aplicaLateral(); guardaLateral(); refazPalco();
  });

  /* redimensionar a janela reaplica o teto, mas nao reescreve a preferencia */
  window.addEventListener('resize', aplicaLateral);

  btnLateral.addEventListener('click', function () {
    colapsada = !colapsada; aplicaLateral(); guardaLateral();
    setTimeout(refazPalco, 200);   /* depois da transicao de largura */
  });

  /* ---------- biblioteca: guarda no proprio navegador ---------- */
  var BD = null;
  function banco() {
    if (BD) return BD;
    BD = new Promise(function (res, rej) {
      var r = indexedDB.open('suno-design', 2);
      r.onupgradeneeded = function () {
        var db = r.result;
        if (!db.objectStoreNames.contains('pecas'))
          db.createObjectStore('pecas', { keyPath: 'id' });
        /* historico: uma versao por ponto marcado, e as fotos a parte para o
           mesmo arquivo nao ser guardado de novo a cada versao */
        if (!db.objectStoreNames.contains('versoes')) {
          var sv = db.createObjectStore('versoes', { keyPath: 'id' });
          sv.createIndex('peca', 'peca', { unique: false });
        }
        if (!db.objectStoreNames.contains('fotos'))
          db.createObjectStore('fotos', { keyPath: 'id' });
      };
      r.onsuccess = function () { res(r.result); };
      r.onerror = function () { rej(r.error); };
    }).catch(function () { return null; });
    return BD;
  }
  function comLoja(modo, fn) {
    return banco().then(function (db) {
      if (!db) return null;
      return new Promise(function (res, rej) {
        var t = db.transaction('pecas', modo), st = t.objectStore('pecas'), pedido = fn(st);
        t.oncomplete = function () { res(pedido && pedido.result); };
        t.onerror = function () { rej(t.error); };
      }).catch(function () { return null; });
    });
  }

  /* ---------- guarda automatica ----------
     Ninguem devia perder um carrossel por fechar a aba sem querer. A peca em
     edicao e gravada sozinha a cada pausa, sempre no MESMO registro, para a
     biblioteca nao virar uma pilha de copias da mesma coisa. */
  var pecaAtual = null;        /* id do registro que esta em edicao */
  var pecaExplicita = false;   /* ja passou pelo botao Salvar? */
  var assinaturaSalva = null;  /* estado gravado por ultimo */
  var assinaturaVista = null;  /* estado do tique anterior: e assim que a pausa aparece */
  var gravando = false;
  var miniBlob = null;         /* ultima miniatura gerada, reaproveitada entre gravacoes */
  var miniAssin = null;        /* estado da capa quando a miniatura foi feita */

  /* Resumo leve do documento. Entra tudo que muda a arte, menos os bytes das
     fotos — o nome do arquivo e o enquadramento ja denunciam a troca. */
  /* ordem fixa: JSON.stringify de um objeto depende da ordem de insercao,
     e ai duas laminas iguais dariam assinaturas diferentes */
  function ajusteStr(l) {
    var f = l.fonte || {}, w = l.larg || {};
    return ['titulo', 'sub', 'corpo'].map(function (c) {
      return (f[c] || 1) + '/' + (w[c] || 1);
    }).join(',');
  }

  function assinatura() {
    return JSON.stringify([marca, opts.disc, opts.discOn, opts.autofit, opts.topAlign,
      slides.map(function (l) {
        return [l.type, l.title, l.sub, l.body, l.numero, l.imgName,
                l.zoom, l.fx, l.fy, l.img ? 1 : 0, ajusteStr(l), l.semDisc ? 1 : 0].join('\u0001');
      })]);
  }
  /* so o que muda a miniatura da biblioteca: a primeira lamina */
  function assinaturaCapa() {
    var l = slides[0];
    if (!l) return '';
    return JSON.stringify([marca, opts.disc, opts.discOn, opts.autofit, opts.topAlign,
      l.type, l.title, l.sub, l.body, l.numero, l.imgName, l.zoom, l.fx, l.fy,
      l.img ? 1 : 0, ajusteStr(l), l.semDisc ? 1 : 0]);
  }
  function documentoVazio() {
    return !slides.some(function (l) {
      return ((l.title || '') + (l.sub || '') + (l.body || '') + (l.numero || '')).trim() || l.img;
    });
  }

  /* A miniatura e a parte cara da gravacao: obriga a redesenhar a lamina
     inteira em 1080x1350 e comprimir. O registro em si custa 1 a 3 ms. Por
     isso o texto e gravado a todo momento e a miniatura so e refeita quando
     vale a pena. */
  function fazMini() {
    var assinCapa = assinaturaCapa();
    var cv = document.createElement('canvas');
    render(cv, marca, slides[0], cfg());
    var mini = document.createElement('canvas');
    mini.width = 324; mini.height = 405;
    mini.getContext('2d').drawImage(cv, 0, 0, 324, 405);
    return new Promise(function (res) {
      mini.toBlob(function (capa) {
        miniBlob = capa; miniAssin = assinCapa;
        res(capa);
      }, 'image/jpeg', 0.82);
    });
  }

  function gravaPeca(explicita, comMini) {
    if (!slides.length) return Promise.resolve(false);
    if (explicita) pecaExplicita = true;
    var assin = assinatura();
    if (explicita || !miniBlob) comMini = true;
    return (comMini ? fazMini() : Promise.resolve(miniBlob)).then(function (capa) {
      return new Promise(function (res) {
        if (!pecaAtual) pecaAtual = 'p' + Date.now();
        var peca = {
          id: pecaAtual,
          marca: marca,
          quando: new Date().toISOString(),
          auto: !pecaExplicita,
          opts: { disc: opts.disc, discOn: opts.discOn, autofit: opts.autofit, topAlign: opts.topAlign },
          titulo: (slides[0].title || slides[0].body || '').replace(/\*\*|__/g, '').slice(0, 70) || 'Sem título',
          n: slides.length,
          capa: capa,
          laminas: slides.map(function (l) {
            return { type: l.type, title: l.title, sub: l.sub, body: l.body, numero: l.numero,
                     zoom: l.zoom, fx: l.fx, fy: l.fy, img: l.img ? l.img.src : null,
                     imgName: l.imgName, semDisc: !!l.semDisc,
                     fonte: Object.assign({}, l.fonte || {}), larg: Object.assign({}, l.larg || {}) };
          })
        };
        comLoja('readwrite', function (st) { return st.put(peca); }).then(function (chave) {
          /* comLoja devolve null quando a transacao falha — cota estourada,
             navegador em modo restrito. Melhor dizer do que fingir que salvou. */
          if (!chave) {
            assinaturaSalva = assin;   /* nao insiste a cada tique */
            toast('Não consegui salvar: o armazenamento do navegador está cheio.');
            return res(false);
          }
          assinaturaSalva = assin;
          if (viewAtual === 'home' || viewAtual === 'biblioteca') pintaGaleria();
          res(true);
        });
      });
    });
  }

  /* transacao cobrindo mais de uma loja; fn escreve o que precisar em `saida` */
  function comLojas(nomes, modo, fn) {
    return banco().then(function (db) {
      if (!db) return null;
      return new Promise(function (res, rej) {
        var t = db.transaction(nomes, modo), lojas = {}, saida = {};
        nomes.forEach(function (n) { lojas[n] = t.objectStore(n); });
        fn(lojas, saida);
        t.oncomplete = function () { res(saida); };
        t.onerror = function () { rej(t.error); };
      }).catch(function () { return null; });
    });
  }

  function salvarPeca() {
    if (!slides.length) { toast('Nada para salvar.'); return; }
    gravaPeca(true).then(function (ok) { if (ok) toast('Salvo na biblioteca.'); });
  }

  /* Grava a cada 250 ms enquanto houver mudanca — nao espera a pessoa parar de
     digitar. O que fica para a pausa e so a miniatura, que exige redesenhar a
     lamina inteira; o texto, que e o trabalho de verdade, vai na hora.
     Janela maxima de perda: um quarto de segundo. */
  var PASSO = 250;
  setInterval(function () {
    if (gravando || !slides.length) return;
    var a = assinatura();
    var fim = function () { gravando = false; };

    if (a === assinaturaSalva) {
      assinaturaVista = a;
      /* texto ja gravado, mas a capa mudou depois da ultima miniatura: e aqui,
         com a mao parada, que a miniatura da biblioteca se acerta */
      if (pecaAtual && miniBlob && assinaturaCapa() !== miniAssin) {
        gravando = true;
        gravaPeca(false, true).then(fim, fim);
      }
      return;
    }
    if (documentoVazio()) { assinaturaSalva = assinaturaVista = a; return; }

    var parou = (a === assinaturaVista);   /* passou um tique inteiro igual */
    assinaturaVista = a;
    gravando = true;
    gravaPeca(false, parou).then(fim, fim);   /* miniatura so quando a mao para */

    /* de tempos em tempos vira ponto de retorno, senao uma sessao longa de
       edicao ficaria sem nenhum lugar para onde voltar */
    if (!versionando && pecaAtual && a !== assinaturaVersao &&
        Date.now() - ultimaVersao > PAUSA_VERSAO) {
      versionando = true;
      marcaVersao('edição').then(function () { versionando = false; },
                                function () { versionando = false; });
    }
  }, PASSO);

  /* fechou a aba no meio da frase: ultima tentativa, sem promessa de sucesso */
  window.addEventListener('pagehide', function () {
    if (!slides.length || documentoVazio() || assinatura() === assinaturaSalva) return;
    gravaPeca(false, false);
  });

  function listarPecas() {
    return comLoja('readonly', function (st) { return st.getAll(); }).then(function (r) {
      var lista = r || [];
      lista.sort(function (a, b) { return b.quando.localeCompare(a.quando); });
      return lista;
    });
  }

  function pintaGaleria(qual) {
    var alvos = qual ? [qual] : ['galeria', 'galeria-home'];
    listarPecas().then(function (lista) {
      alvos.forEach(function (idAlvo) {
        var el = $(idAlvo); if (!el) return;
        var itens = (idAlvo === 'galeria-home') ? lista.slice(0, 8) : lista;
        if (!itens.length) {
          el.innerHTML = '<p class="galeria-vazia">Nada salvo ainda.<br>' +
            'Comece um carrossel no gerador: ele aparece aqui sozinho, sem você precisar salvar.</p>';
          return;
        }
        el.innerHTML = '';
        itens.forEach(function (p) {
          var b = document.createElement('button');
          b.className = 'peca'; b.dataset.id = p.id;
          b.title = 'Abrir “' + p.titulo + '”';
          var im = document.createElement('img');
          im.src = URL.createObjectURL(p.capa); im.alt = p.titulo;
          im.onload = function () { setTimeout(function () { URL.revokeObjectURL(im.src); }, 2000); };
          b.appendChild(im);
          var m = document.createElement('div'); m.className = 'meta';
          var d = new Date(p.quando);
          m.innerHTML = '<b></b><span></span>';
          m.querySelector('b').textContent = p.titulo;
          m.querySelector('span').textContent =
            txtDe((MARCAS[p.marca] || {}).arroba || p.marca) + ' · ' + p.n +
            (p.n === 1 ? ' lâmina · ' : ' lâminas · ') +
            d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
          if (p.auto) {
            var r = document.createElement('span');
            r.className = 'sd-rascunho'; r.textContent = 'rascunho';
            r.title = 'Guardado sozinho enquanto você editava';
            b.appendChild(r);
          }
          b.appendChild(m);
          var x = document.createElement('span');
          x.className = 'apagar'; x.dataset.apagar = p.id; x.setAttribute('role', 'button');
          x.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
          b.appendChild(x);
          el.appendChild(b);
        });
      });
    });
  }

  function abrirPeca(id) {
    listarPecas().then(function (lista) {
      var p = lista.filter(function (x) { return x.id === id; })[0];
      if (!p) return;
      marca = MARCAS[p.marca] ? p.marca : marca;
      var imgs = p.laminas.map(function (l) { return l.img ? loadImage(l.img) : Promise.resolve(null); });
      Promise.all(imgs).then(function (carregadas) {
        /* registros antigos tinham um interruptor unico para todas as laminas;
           quando ele estava desligado, isso vira "sem disclaimer" em cada uma */
        var velhoSemDisc = !!(p.opts && p.opts.discOn === false);
        if (p.opts) {
          opts.disc = p.opts.disc; opts.autofit = p.opts.autofit; opts.topAlign = p.opts.topAlign;
        }
        opts.discOn = true;
        slides = p.laminas.map(function (l, i) {
          return { type: l.type, title: l.title || '', sub: l.sub || '', body: l.body || '',
                   numero: l.numero || '', zoom: l.zoom || 1, fx: l.fx == null ? .5 : l.fx,
                   fy: l.fy == null ? .5 : l.fy, img: carregadas[i], imgName: l.imgName || '',
                   semDisc: !!l.semDisc || velhoSemDisc,
                   fonte: Object.assign({}, l.fonte || {}), larg: Object.assign({}, l.larg || {}) };
        });
        /* a partir daqui a edicao continua NESTE registro, sem criar copia */
        pecaAtual = p.id; pecaExplicita = !p.auto;
        foco = 0; sel = null;
        abrir('carrossel');
        assinaturaSalva = assinaturaVista = assinatura();
        miniBlob = p.capa; miniAssin = assinaturaCapa();
        toast('Aberto: ' + p.titulo);
      });
    });
  }


  document.addEventListener('click', function (ev) {
    var it = ev.target.closest('.item, .atalho');
    if (it) { abrir(it.dataset.view); return; }
    if (ev.target.closest('#ir-home')) { abrir('home'); return; }
    if (ev.target.closest('#btn-salvar')) { salvarPeca(); return; }
    if (ev.target.closest('#fechar-manual') || ev.target.id === 'cortina-manual') {
      $('cortina-manual').hidden = true; return;
    }
    if (ev.target.closest('#copiar-pedido')) {
      var t = $('manual-pedido');
      t.select(); t.setSelectionRange(0, t.value.length);
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      if (navigator.clipboard && navigator.clipboard.writeText)
        navigator.clipboard.writeText(t.value).then(function () { toast('Pedido copiado.'); },
                                                    function () { if (!ok) toast('Copie com Ctrl+C.'); });
      else toast(ok ? 'Pedido copiado.' : 'Copie com Ctrl+C.');
      return;
    }
    if (ev.target.closest('#manual-go')) { montaManual(); return; }
    if (ev.target.closest('#btn-versoes')) {
      $('cortina-versoes').hidden = false; pintaVersoes(); return;
    }
    if (ev.target.closest('#fechar-versoes') || ev.target.id === 'cortina-versoes') {
      $('cortina-versoes').hidden = true; return;
    }
    var rv = ev.target.closest('[data-restaura]');
    if (rv) {
      $('cortina-versoes').hidden = true;
      restauraVersao(rv.dataset.restaura).then(function (ok) {
        if (ok) toast('Versão restaurada. O estado anterior virou um ponto novo.');
      });
      return;
    }
    var x = ev.target.closest('[data-apagar]');
    if (x) {
      ev.preventDefault(); ev.stopPropagation();
      if (x.dataset.apagar === pecaAtual) {
        /* apagou a peca aberta: solta o vinculo e considera o estado atual ja
           gravado, senao a guarda automatica a ressuscita em 1,2s */
        pecaAtual = null; pecaExplicita = false;
        assinaturaSalva = assinaturaVista = assinatura();
        miniBlob = null; miniAssin = null;
      }
      apagaHistorico(x.dataset.apagar);
      comLoja('readwrite', function (st) { return st.delete(x.dataset.apagar); })
        .then(function () { pintaGaleria(); toast('Removido da biblioteca.'); });
      return;
    }
    var pc = ev.target.closest('.peca');
    if (pc) { abrirPeca(pc.dataset.id); return; }
  });

  /* =========================================================
     14. GERACAO POR PROMPT
     Uma frase em portugues vira laminas montadas. O servidor guarda a chave e
     a voz das marcas; aqui ficam duas coisas que so o navegador sabe fazer:
     dizer quanto texto cabe em cada campo, e conferir o que voltou.
     ========================================================= */
  var ENDPOINT = '/api/gerar';

  /* ---------- de que perfil a pessoa esta falando ----------
     So nomes de perfil entram aqui. "FIIs" e assunto, nao perfil: se virasse
     apelido, "um carrossel do @suno sobre FIIs" cairia no Funds Explorer. */
  var APELIDOS = {
    baroni:      ['professor baroni', 'professorbaroni', 'baroni'],
    suno:        ['suno investimentos', 'suno'],
    tiago:       ['tiago greis', 'tiagogreis', 'tiago reis', 'tiago'],
    noticias:    ['suno noticias', 'sunonoticias', 'noticias'],
    consultoria: ['suno consultoria', 'sunoconsultoria', 'consultoria'],
    funds:       ['funds explorer', 'fundsexplorer', 'funds']
  };
  function semAcento(t) {
    return String(t).normalize ? String(t).normalize('NFD').replace(/[̀-ͯ]/g, '') : String(t);
  }
  function marcaDaFrase(frase) {
    var f = semAcento(frase).toLowerCase(), achada = null, tam = 0;
    Object.keys(APELIDOS).forEach(function (m) {
      APELIDOS[m].forEach(function (a) {
        if (a.length <= tam) return;
        var re = new RegExp('(^|[^a-z0-9])' + a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^a-z0-9])');
        if (re.test(f)) { achada = m; tam = a.length; }
      });
    });
    return achada;
  }

  /* ---------- quanto texto cabe em cada campo ----------
     O modelo nao tem como saber que o titulo da capa do Baroni e Staatliches
     96px numa caixa de 736px. Este numero sai do proprio motor que desenha:
     cresce o texto por busca binaria ate a lamina acusar estouro, com a
     reducao de fonte desligada — ou seja, quanto cabe no tamanho projetado. */
  var ORC = {};
  var ENCHE = 'texto de exemplo para ocupar o espaco da lamina em tamanho medio ';
  function repete(n) {
    var t = '';
    while (t.length < n) t += ENCHE;
    return t.slice(0, n).replace(/\s+$/, '');
  }
  function camposDoTipo(m, tipo) {
    return (MARCAS[m].tipos[tipo].campos || []).filter(function (c) {
      return c !== 'img' && c !== 'numero';   /* foto e numero nao sao copy */
    });
  }
  function orcamentoDe(m) {
    if (ORC[m]) return ORC[m];
    var tipos = MARCAS[m].tipos, res = {}, cv = document.createElement('canvas');
    var base = { disc: opts.disc, discOn: !!MARCAS[m].disclaimer, autofit: false,
                 topAlign: !!MARCAS[m].topAlign, guias: false };
    Object.keys(tipos).forEach(function (tipo) {
      var campos = camposDoTipo(m, tipo), temNumero = (tipos[tipo].campos || []).indexOf('numero') >= 0;
      res[tipo] = {};
      campos.forEach(function (campo) {
        var lo = 4, hi = 700;
        while (lo < hi) {
          var mid = Math.ceil((lo + hi) / 2);
          var s = blank(tipo); s.type = tipo;
          if (temNumero) s.numero = '01';
          /* os vizinhos entram com enchimento: medir um campo com o resto da
             lamina vazio da um numero que na pratica nao se sustenta */
          campos.forEach(function (c) {
            s[c] = (c === campo) ? repete(mid) : repete(c === 'title' ? 60 : 150);
          });
          if (render(cv, m, s, base)) hi = mid - 1; else lo = mid;
        }
        res[tipo][campo] = lo;
      });
    });
    ORC[m] = res;
    return res;
  }

  /* ---------- o que o perfil aceita ----------
     Vai do navegador, nao do servidor: as tabelas de layout vivem aqui, e
     duplicar isso do outro lado criaria duas verdades que divergem. */
  function contratoDe(m) {
    var tipos = MARCAS[m].tipos, orc = orcamentoDe(m);
    var out = { marca: m, nome: txtDe(MARCAS[m].nome), arroba: txtDe(MARCAS[m].arroba),
                destaque: txtDe(MARCAS[m].dica), laminas: {} };
    Object.keys(tipos).forEach(function (tipo) {
      out.laminas[tipo] = {
        rotulo: txtDe(tipos[tipo].label),
        campos: orc[tipo],
        aceitaFoto: (tipos[tipo].campos || []).indexOf('img') >= 0
      };
    });
    return out;
  }

  /* ---------- traduz o que voltou em lamina do app ---------- */
  function paraLamina(m, l, i) {
    var tipos = MARCAS[m].tipos;
    var tipo = (l && tipos[l.type]) ? l.type : Object.keys(tipos)[0];
    var s = blank(tipo); s.type = tipo;
    ['title', 'sub', 'body'].forEach(function (c) {
      if (l && l[c] != null && camposDoTipo(m, tipo).indexOf(c) >= 0) s[c] = String(l[c]);
    });
    if ((tipos[tipo].campos || []).indexOf('numero') >= 0) s.numero = String(i + 1);
    return s;
  }

  /* ---------- conferencia: o que veio cabe mesmo? ---------- */
  function confere(m, laminas) {
    var cv = document.createElement('canvas'), orc = orcamentoDe(m), fora = [];
    var base = { disc: opts.disc, discOn: !!MARCAS[m].disclaimer, autofit: false,
                 topAlign: !!MARCAS[m].topAlign, guias: false };
    laminas.forEach(function (l, i) {
      var s = paraLamina(m, l, i);
      if (render(cv, m, s, base)) {
        var campo = s._estouro || 'corpo';
        var chave = { titulo: 'title', sub: 'sub', corpo: 'body' }[campo] || campo;
        fora.push({ i: i, type: s.type, campo: chave,
                    cabe: (orc[s.type] || {})[chave] || null,
                    tem: String(s[chave] || '').length });
      }
    });
    return fora;
  }

  /* ---------- conversa com o servidor ----------
     O endereco e publico, entao o endpoint tambem seria. A senha combinada
     fica guardada neste navegador e vai em cada pedido; quem nao tem, o
     servidor recusa antes de gastar chamada. */
  function senhaGuardada() {
    try { return localStorage.getItem('sd-senha') || ''; } catch (e) { return ''; }
  }
  function guardaSenha(v) {
    try { if (v) localStorage.setItem('sd-senha', v); else localStorage.removeItem('sd-senha'); }
    catch (e) {}
  }
  function pedir(corpo) {
    /* gancho de teste: deixa exercitar todo o caminho sem gastar chamada */
    if (window.__GERACAO_STUB__) return Promise.resolve(window.__GERACAO_STUB__(corpo));
    var cab = { 'Content-Type': 'application/json' };
    var sn = senhaGuardada();
    if (sn) cab['X-Senha'] = sn;
    return fetch(ENDPOINT, { method: 'POST', headers: cab, body: JSON.stringify(corpo) })
      .then(function (r) {
        if (r.status === 404) throw new Error('desligado');
        if (r.status === 401 || r.status === 403) throw new Error('acesso');
        if (r.status === 429) throw new Error('fila');
        if (r.status === 422) throw new Error('recusado');
        if (r.status === 503) throw new Error('semchave');
        if (!r.ok) throw new Error('http ' + r.status);
        return r.json();
      }, function () { throw new Error('rede'); });
  }

  function geraCarrossel(frase) {
    var m = marcaDaFrase(frase) || marca;
    var ct = contratoDe(m);
    return pedir({ pedido: frase, contrato: ct }).then(function (r) {
      var laminas = (r && r.laminas) || [];
      if (!laminas.length) throw new Error('vazio');
      var fora = confere(m, laminas);
      if (!fora.length) return { marca: m, laminas: laminas };
      /* uma unica rodada de correcao, com o limite explicito de cada campo */
      return pedir({ pedido: frase, contrato: ct, laminas: laminas, estouros: fora })
        .then(function (r2) {
          var l2 = (r2 && r2.laminas) || laminas;
          return { marca: m, laminas: l2.length ? l2 : laminas };
        }, function () { return { marca: m, laminas: laminas }; });
    });
  }

  function aplicaGeracao(m, laminas) {
    marcaVersao('antes de gerar outro carrossel');
    marca = m;
    slides = laminas.slice(0, 20).map(function (l, i) { return paraLamina(m, l, i); });
    if (!slides.length) return false;
    foco = 0; sel = null;
    /* carrossel gerado nasce documento novo: nao escreve por cima do aberto */
    pecaAtual = null; pecaExplicita = false; miniBlob = null; miniAssin = null;
    abrir('carrossel');
    return true;
  }

  /* ---------- modo manual ----------
     Enquanto a chave nao existe, a pessoa faz o papel do transporte: leva o
     pedido ao Claude e traz a resposta. Tudo o mais e o caminho de verdade —
     inclusive o texto do pedido, que e montado pela mesma funcao do servidor,
     e nao por uma copia aqui que sairia do lugar na primeira mudanca. */
  var manualFrase = '', manualMarca = null;

  function abreManual(frase) {
    var m = marcaDaFrase(frase) || marca;
    manualFrase = frase; manualMarca = m;
    $('manual-resposta').value = '';
    $('manual-aviso').textContent = '';
    $('manual-pedido').value = 'Montando o pedido…';
    $('cortina-manual').hidden = false;
    pedir({ montar: true, pedido: frase, contrato: contratoDe(m) }).then(function (r) {
      $('manual-pedido').value =
        (r.sistema || '') + '\n\n---\n\n' + (r.mensagem || '') +
        '\n\n---\n\nResponda SOMENTE com o JSON, no formato ' +
        '{"laminas":[{"type":"...","title":"...","sub":"...","body":"..."}]}.';
    }, function () {
      $('manual-pedido').value = '';
      $('manual-aviso').textContent = 'Não consegui montar o pedido: o servidor não respondeu.';
    });
  }

  /* aceita o JSON puro, dentro de cerca de crase, ou so a lista de laminas */
  function leResposta(txt) {
    var t = String(txt || '').trim();
    if (!t) return null;
    var cerca = t.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (cerca) t = cerca[1].trim();
    if (t.charAt(0) !== '{' && t.charAt(0) !== '[') {
      var i = t.indexOf('{'), j = t.lastIndexOf('}');
      if (i >= 0 && j > i) t = t.slice(i, j + 1);
    }
    var o;
    try { o = JSON.parse(t); } catch (e) { return null; }
    if (Array.isArray(o)) return o;
    if (o && Array.isArray(o.laminas)) return o.laminas;
    return null;
  }

  function nLaminas(n) { return n + (n === 1 ? ' lâmina' : ' lâminas'); }

  function montaManual() {
    var laminas = leResposta($('manual-resposta').value);
    if (!laminas || !laminas.length) {
      $('manual-aviso').textContent =
        'Não achei as lâminas nesse texto. Cole o JSON inteiro, do { ao }.';
      return;
    }
    var m = manualMarca || marca;
    var fora = confere(m, laminas);
    $('cortina-manual').hidden = true;
    aplicaGeracao(m, laminas);
    if (fora.length) {
      var lista = fora.map(function (f) {
        return 'lâmina ' + (f.i + 1) + ' (' + f.campo + '): cabem ' + f.cabe + ', vieram ' + f.tem;
      }).join(' · ');
      toast(nLaminas(slides.length) + ' montadas. ' + fora.length +
            (fora.length === 1 ? ' campo passou do limite — ' : ' campos passaram do limite — ') + lista);
    } else {
      toast(nLaminas(slides.length) + ' montadas em ' + txtDe(MARCAS[m].arroba) + '.');
    }
  }

  /* ---------- a barra da home ---------- */
  var RECADO = {
    desligado: 'A geração ainda não está ligada neste endereço. O gerador de carrossel continua funcionando.',
    semchave:  'O servidor está no ar, mas sem chave configurada. Quem cuida do ambiente precisa definir a chave.',
    fila:      'Muitos pedidos ao mesmo tempo. Tente de novo em alguns segundos.',
    rede:      'Não consegui falar com o servidor. Verifique a conexão e tente de novo.',
    recusado:  'O modelo não escreveu esta peça. Reformule o pedido — pode ser algo que ele evita tratar.',
    vazio:     'Não veio nenhuma lâmina. Tente descrever o assunto com um pouco mais de detalhe.'
  };
  /* a nota padrao tem um botao dentro (atalho para o gerador): guarda o HTML,
     senao a primeira mensagem de erro apaga o atalho para sempre */
  var NOTA_PADRAO = $('nota-prompt') ? $('nota-prompt').innerHTML : '';
  function nota(txt, erro) {
    var n = $('nota-prompt'); if (!n) return;
    n.textContent = txt;
    n.dataset.erro = erro ? '1' : '0';
  }
  function notaPadrao() {
    var n = $('nota-prompt'); if (!n) return;
    n.innerHTML = NOTA_PADRAO;
    n.dataset.erro = '0';
  }

  /* pede a senha no lugar da nota, e ja tenta de novo com ela */
  function pedeSenha(frase) {
    var n = $('nota-prompt'); if (!n) return;
    guardaSenha('');
    n.dataset.erro = '1';
    n.innerHTML = '';
    var t = document.createElement('span');
    t.textContent = 'Esta geração pede a senha combinada com quem cuida do ambiente. ';
    var f = document.createElement('form'); f.className = 'senha';
    var i = document.createElement('input');
    i.type = 'password'; i.required = true; i.autocomplete = 'current-password';
    i.placeholder = 'senha'; i.setAttribute('aria-label', 'Senha da geração');
    var b = document.createElement('button'); b.type = 'submit'; b.textContent = 'Entrar';
    f.appendChild(i); f.appendChild(b);
    n.appendChild(t); n.appendChild(f);
    i.focus();
    f.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!i.value) return;
      guardaSenha(i.value);
      notaPadrao();
      $('prompt').value = frase;
      forma.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
  }

  var forma = $('forma-prompt');
  if (forma) forma.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (forma.dataset.estado === 'indo') return;
    var frase = $('prompt').value.trim();
    if (frase.length < 10) {
      nota('Diga o perfil e o assunto — algo como “um carrossel para o Baroni sobre carteira diversificada de FIIs”.', true);
      return;
    }
    forma.dataset.estado = 'indo';
    $('prompt').disabled = true;
    nota('Escrevendo a copy e montando as lâminas…', false);
    var solta = function () { forma.dataset.estado = ''; $('prompt').disabled = false; };
    /* o Promise.resolve nao e enfeite: sem ele um erro sincrono — medir a
       caixa, montar o contrato — escapa do par de handlers e a barra fica
       travada em "escrevendo" sem jeito de voltar */
    Promise.resolve().then(function () { return geraCarrossel(frase); })
      .then(function (r) {
        solta();
        if (!aplicaGeracao(r.marca, r.laminas)) { nota(RECADO.vazio, true); return; }
        $('prompt').value = '';
        notaPadrao();
        toast(nLaminas(slides.length) + ' geradas em ' + txtDe(MARCAS[r.marca].arroba) + '.');
      }, function (e) {
        solta();
        if (e && e.message === 'acesso') { pedeSenha(frase); return; }
        if (e && (e.message === 'semchave' || e.message === 'desligado')) {
          nota(RECADO[e.message], true);
          abreManual(frase);
          return;
        }
        nota(RECADO[e && e.message] || 'Não consegui gerar agora. Tente de novo.', true);
      });
  });

  window.__abrir = abrir;
  window.__salvarPeca = salvarPeca; window.__listarPecas = listarPecas;

})();
