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
      new FontFace('Caladea', b64ToBuf(A.caladea700), { weight: '700' })
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

  function layout(ctx, text, spec) {
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
    return { lines: lines, lh: lh, height: lines.length * lh, spec: spec };
  }

  /* baseline no modelo half-leading do CSS */
  function baselineOffset(ctx, spec) {
    applyFont(ctx, spec, null);
    var m = ctx.measureText('Hxg');
    var a = m.fontBoundingBoxAscent, d = m.fontBoundingBoxDescent;
    if (!isFinite(a) || !a) { a = spec.size * 0.96; d = spec.size * 0.24; }
    return (spec.size * spec.lh - (a + d)) / 2 + a;
  }

  /* --- pintura com cor solida (Baroni) --- */
  function paintSolid(ctx, blk, x, top) {
    var off = baselineOffset(ctx, blk.spec);
    ctx.textBaseline = 'alphabetic';
    blk.lines.forEach(function (line, i) {
      var base = top + i * blk.lh + off;
      line.items.forEach(function (it) {
        if (!it.text.trim()) return;
        ctx.fillStyle = (it.run.em && blk.spec.emColor) ? blk.spec.emColor : blk.spec.color;
        drawRun(ctx, blk.spec, it.run, it.text, x + it.x, base);
        if (it.run.alt && blk.spec.underlineAlt) {
          ctx.fillRect(x + it.x, base + blk.spec.size * 0.15, it.w, Math.max(2, blk.spec.size * 0.05));
        }
      });
    });
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
  function paintGrad(ctx, blk, x, top, style) {
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
        var em = it.run.em || it.run.alt;
        drawRun(em ? hc : bc, blk.spec, it.run, it.text, x + it.x - ox, bl - oy);
        if (em) {
          var lx = x + it.x, ly = top + i * blk.lh;
          box = box ? { x: Math.min(box.x, lx), y: Math.min(box.y, ly),
                        r: Math.max(box.r, lx + it.w), b: Math.max(box.b, ly + blk.lh) }
                    : { x: lx, y: ly, r: lx + it.w, b: ly + blk.lh };
        }
      });
    });

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
  function shade(ctx, top, times, from) {
    for (var k = 0; k < times; k++) {
      var g = ctx.createLinearGradient(0, top, 0, H);
      g.addColorStop(0, from); g.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = g; ctx.fillRect(0, top, W, H - top);
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
    var t = B.capa, of = false;
    ctx.fillStyle = '#050505'; ctx.fillRect(0, 0, W, H);
    var ts = Object.assign({}, t.title), ss = Object.assign({}, t.sub), tb, sb, headTop;
    for (var p = 0; p < 14; p++) {
      tb = layout(ctx, s.title || '', ts); sb = layout(ctx, s.sub || '', ss);
      headTop = (t.subBottom - sb.height) - t.gapTitleSub - tb.height - t.gapHeadTitle - HEAD.av;
      if (headTop >= t.minTop || !cfg.autofit) break;
      ts.size = Math.round(ts.size * 0.94);
      if (ts.size < 48) ss.size = Math.round(ss.size * 0.94);
    }
    if (headTop < t.minTop) of = true;
    var subTop = t.subBottom - sb.height, titleTop = subTop - t.gapTitleSub - tb.height;
    if (s.img) drawCover(ctx, s.img, 0, 0, W, H, s);
    shade(ctx, Math.min(616, headTop), 2, 'rgba(0,0,0,0.06)');
    baroniHeader(ctx, t.x, headTop, 'dark');
    paintSolid(ctx, tb, t.x, titleTop); paintSolid(ctx, sb, t.x, subTop);
    baroniDisc(ctx, t, cfg);
    return of;
  }

  function baroniCorpo(ctx, s, cfg) {
    var t = B.corpo, of = false;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
    var spec = Object.assign({}, t.body), avail = t.regionBottom - t.regionTop, blk;
    for (var p = 0; p < 14; p++) {
      blk = layout(ctx, s.body || '', spec);
      if (blk.height <= avail || !cfg.autofit || spec.size < 22) break;
      spec.size = Math.round(spec.size * 0.94);
    }
    if (blk.height > avail) of = true;
    var top = cfg.topAlign ? t.regionTop : t.regionTop + (avail - blk.height) / 2;
    baroniHeader(ctx, t.x, t.headY, 'light');
    paintSolid(ctx, blk, t.x, Math.max(top, t.regionTop));
    baroniDisc(ctx, t, cfg);
    return of;
  }

  function baroniCorpoImg(ctx, s, cfg) {
    var t = B.corpoImg, of = false;
    ctx.fillStyle = '#050505'; ctx.fillRect(0, 0, W, H);
    var spec = Object.assign({}, t.body), blk, headTop, textTop, imgTop = t.img.bottom - t.img.h;
    for (var p = 0; p < 14; p++) {
      blk = layout(ctx, s.body || '', spec);
      textTop = imgTop - t.gapTextImg - blk.height;
      headTop = textTop - t.gapHeadText - HEAD.av;
      if (headTop >= t.minTop || !cfg.autofit || spec.size < 22) break;
      spec.size = Math.round(spec.size * 0.94);
    }
    if (headTop < t.minTop) of = true;
    baroniHeader(ctx, t.x, headTop, 'dark');
    paintSolid(ctx, blk, t.x, textTop);
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
      tb = layout(ctx, s.title || '', ts); sb = layout(ctx, s.sub || '', ss);
      logoTop = (t.subBottom - sb.height) - t.gapTitleSub - tb.height - t.gapLogoTitle - t.logo.h;
      if (logoTop >= t.minTop || !cfg.autofit) break;
      ts.size = Math.round(ts.size * 0.94);
      if (ts.size < 46) ss.size = Math.round(ss.size * 0.94);
    }
    if (logoTop < t.minTop) of = true;
    var subTop = t.subBottom - sb.height, titleTop = subTop - t.gapTitleSub - tb.height;

    if (s.img) drawCover(ctx, s.img, 0, 0, W, H, s);
    shade(ctx, Math.min(t.shadeTop, logoTop), t.shadeN, 'rgba(0,0,0,0)');
    ctx.drawImage(IMG.sunoLogo, t.x, logoTop, t.logo.w, t.logo.h);
    paintGrad(ctx, tb, t.x, titleTop, { grad: GRAD_CAPA });
    paintSolid(ctx, sb, t.x, subTop);
    return of;
  }

  function sunoCorpoImg(ctx, s, cfg) {
    var t = S.corpoImg, of = false;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
    var ts = Object.assign({}, t.title), bs = Object.assign({}, t.body), tb, bb, titleTop;
    for (var p = 0; p < 14; p++) {
      tb = layout(ctx, s.title || '', ts); bb = layout(ctx, s.body || '', bs);
      titleTop = (t.img.top - t.gapBodyImg - bb.height) - t.gapTitleBody - tb.height;
      if (titleTop >= t.minTop || !cfg.autofit || bs.size < 24) break;
      bs.size = Math.round(bs.size * 0.94); ts.size = Math.round(ts.size * 0.96);
    }
    if (titleTop < t.minTop) of = true;
    var bodyTop = t.img.top - t.gapBodyImg - bb.height;

    paintGrad(ctx, tb, t.x, titleTop, { grad: GRAD_TITLE });
    paintGrad(ctx, bb, t.x, bodyTop, { grad: GRAD_BODY, emGrad: GRAD_EM });
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
      tb = layout(ctx, s.title || '', ts); bb = layout(ctx, s.body || '', bs);
      total = tb.height + t.gapTitleBody + bb.height;
      if (total <= H - 160 || !cfg.autofit || bs.size < 24) break;
      bs.size = Math.round(bs.size * 0.94); ts.size = Math.round(ts.size * 0.96);
    }
    if (total > H - 160) of = true;
    var top = (H - total) / 2 + t.bias;
    if (top < 60) top = 60;
    paintGrad(ctx, tb, t.x, top, { grad: GRAD_TITLE });
    paintGrad(ctx, bb, t.x, top + tb.height + t.gapTitleBody, { grad: GRAD_BODY, emGrad: GRAD_EM });
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
      sub: { font: 'Inter', size: 45, lh: 1.23, ls: -2.25, w: 341, weight: 500, color: '#ececec' },
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
      tb = layout(ctx, s.title || '', ts); sb = layout(ctx, s.sub || '', ss);
      headTop = (t.subBottom - sb.height) - t.gapTitleSub - tb.height - t.gapHeadTitle - TR_HEAD.av;
      if (headTop >= t.minTop || !cfg.autofit) break;
      ts.size = Math.round(ts.size * 0.94);
      if (ts.size < 52) ss.size = Math.round(ss.size * 0.94);
    }
    if (headTop < t.minTop) of = true;
    var subTop = t.subBottom - sb.height, titleTop = subTop - t.gapTitleSub - tb.height;
    if (s.img) drawCover(ctx, s.img, 0, 0, W, H, s);
    shade(ctx, Math.min(t.shadeTop, headTop), t.shadeN, 'rgba(0,0,0,0)');
    trHeader(ctx, t.x, headTop, 'dark');
    paintSolid(ctx, tb, t.x, titleTop);
    paintSolid(ctx, sb, t.x, subTop);
    return of;
  }

  /* nos dois layouts de corpo o conjunto inteiro e centralizado na vertical */
  function trCorpo(ctx, s, cfg, comFoto) {
    var t = comFoto ? T.foto : T.texto, of = false;
    trFundo(ctx);
    var ts = Object.assign({}, t.title), bs = Object.assign({}, t.body), tb, bb, total;
    var extra = comFoto ? (t.gapBodyImg + t.img.h) : 0;
    for (var p = 0; p < 14; p++) {
      tb = layout(ctx, s.title || '', ts); bb = layout(ctx, s.body || '', bs);
      total = TR_HEAD.av + t.gapHeadTitle + tb.height + t.gapTitleBody + bb.height + extra;
      if (total <= H - 120 || !cfg.autofit || bs.size < 24) break;
      bs.size = Math.round(bs.size * 0.94); ts.size = Math.round(ts.size * 0.96);
    }
    if (total > H - 120) of = true;

    var y = (H - total) / 2;
    if (y < 50) y = 50;
    trHeader(ctx, t.x, y, 'light');
    y += TR_HEAD.av + t.gapHeadTitle;
    paintSolid(ctx, tb, t.x, y);
    y += tb.height + t.gapTitleBody;
    paintSolid(ctx, bb, t.x, y);

    if (comFoto) {
      y += bb.height + t.gapBodyImg;
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
      tb = layout(ctx, s.title || '', ts);
      headTop = t.titleBottom - tb.height - t.gapHeadTitle - SN_HEAD.av;
      if (headTop >= t.minTop || !cfg.autofit || ts.size < 46) break;
      ts.size = Math.round(ts.size * 0.94);
    }
    if (headTop < t.minTop) of = true;
    var titleTop = t.titleBottom - tb.height;

    if (s.img) drawCover(ctx, s.img, 0, 0, W, H, s);
    /* as duas sombras do arquivo tem alturas diferentes */
    var g1 = ctx.createLinearGradient(0, 616, 0, H);
    g1.addColorStop(0, 'rgba(0,0,0,0.06)'); g1.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = g1; ctx.fillRect(0, 616, W, H - 616);
    var g2 = ctx.createLinearGradient(0, 456, 0, H);
    g2.addColorStop(0, 'rgba(0,0,0,0.06)'); g2.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = g2; ctx.fillRect(0, 456, W, H - 456);

    snHeader(ctx, t.x, headTop, 'dark');
    paintSolid(ctx, tb, t.x, titleTop);
    ctx.drawImage(IMG.snRasgoBase, 0, t.rasgoTop, 1080, 508);
    return of;
  }

  function snTexto(ctx, s, cfg) {
    var t = N.texto, of = false;
    snPapel(ctx);
    var bs = Object.assign({}, t.body), blk, headTop;
    for (var p = 0; p < 14; p++) {
      blk = layout(ctx, s.body || '', bs);
      headTop = (t.textCenter - blk.height / 2) - t.gapHeadText - SN_HEAD.av;
      if (headTop >= 60 || !cfg.autofit || bs.size < 26) break;
      bs.size = Math.round(bs.size * 0.94);
    }
    if (headTop < 60) of = true;
    var top = t.textCenter - blk.height / 2;
    snHeader(ctx, t.x, headTop, 'light');
    paintSolid(ctx, blk, t.x, top);
    return of;
  }

  /* aqui o conjunto inteiro e centralizado, como no arquivo */
  function snImagem(ctx, s, cfg) {
    var t = N.imagem, of = false;
    snPapel(ctx);
    var bs = Object.assign({}, t.body), blk, total;
    for (var p = 0; p < 14; p++) {
      blk = layout(ctx, s.body || '', bs);
      total = SN_HEAD.av + t.gapHeadText + blk.height + t.gapTextImg + t.img.h;
      if (total <= H - 120 || !cfg.autofit || bs.size < 26) break;
      bs.size = Math.round(bs.size * 0.94);
    }
    if (total > H - 120) of = true;
    var y = (H - total) / 2; if (y < 50) y = 50;
    snHeader(ctx, t.x, y, 'light');
    y += SN_HEAD.av + t.gapHeadText;
    paintSolid(ctx, blk, t.x, y);
    y += blk.height + t.gapTextImg;
    ctx.save(); roundRect(ctx, t.x, y, t.img.w, t.img.h, t.img.r); ctx.clip();
    if (s.img) drawCover(ctx, s.img, t.x, y, t.img.w, t.img.h, s);
    else { ctx.fillStyle = '#e2e2e2'; ctx.fillRect(t.x, y, t.img.w, t.img.h); }
    ctx.restore();
    ctx.strokeStyle = t.img.border; ctx.lineWidth = 1;
    roundRect(ctx, t.x + .5, y + .5, t.img.w - 1, t.img.h - 1, t.img.r); ctx.stroke();
    return of;
  }

  /* =========================================================
     8. Registro de marcas
     ========================================================= */
  var MARCAS = {
    baroni: { nome: 'Professor Baroni', disclaimer: true, topAlign: true,
      dica: '<kbd>**negrito**</kbd> <kbd>__sublinhado__</kbd>',
      tipos: { capa: B.capa, corpo: B.corpo, corpoImg: B.corpoImg },
      render: { capa: baroniCapa, corpo: baroniCorpo, corpoImg: baroniCorpoImg } },
    suno: { nome: 'Suno', disclaimer: false, topAlign: false,
      dica: '<kbd>**destaque**</kbd> pinta o trecho em vermelho',
      tipos: { capa: S.capa, corpoImg: S.corpoImg, texto: S.texto },
      render: { capa: sunoCapa, corpoImg: sunoCorpoImg, texto: sunoTexto } },
    tiago: { nome: 'Tiago Reis', disclaimer: false, topAlign: false,
      dica: '<kbd>**destaque**</kbd> fica azul no t&iacute;tulo e negrito no texto',
      tipos: { capa: T.capa, texto: T.texto, foto: T.foto },
      render: { capa: trCapa, texto: trTexto, foto: trFoto } },
    noticias: { nome: 'Suno Not&iacute;cias', disclaimer: false, topAlign: false,
      dica: '<kbd>**destaque**</kbd> deixa o trecho em negrito',
      tipos: { capa: N.capa, texto: N.texto, imagem: N.imagem },
      render: { capa: snCapa, texto: snTexto, imagem: snImagem } }
  };

  function render(canvas, marca, s, cfg) {
    var ctx = canvas.getContext('2d');
    canvas.width = W; canvas.height = H;
    ctx.clearRect(0, 0, W, H); ctx.textAlign = 'left';
    var M = MARCAS[marca];
    var fn = M.render[s.type] || M.render[Object.keys(M.render)[0]];
    return fn(ctx, s, cfg);
  }

  /* =========================================================
     9. ZIP (metodo store) + download
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
     10. Interface
     ========================================================= */
  var $ = function (id) { return document.getElementById(id); };
  var slides = [], sel = 0, marca = 'baroni';

  function cfg() {
    return { disc: $('disc').value, discOn: $('disc-on').checked,
             autofit: $('autofit').checked, topAlign: $('topalign').checked };
  }
  function tipos() { return MARCAS[marca].tipos; }
  function tipoPadrao() { var k = Object.keys(tipos()); return k.indexOf('corpo') >= 0 ? 'corpo' : (k.indexOf('texto') >= 0 ? 'texto' : k[1] || k[0]); }
  function blank(type) { return { type: type || tipoPadrao(), title: '', sub: '', body: '', img: null, imgName: '', zoom: 1, fx: 0.5, fy: 0.5 }; }
  function labelDe(t) { var d = document.createElement('div'); d.innerHTML = (tipos()[t] || {}).label || t; return d.textContent; }

  function toast(m) {
    var t = $('toast'); t.textContent = m; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }
  function summary(s) {
    var txt = ((s.title || '') + ' ' + (s.sub || '') + ' ' + (s.body || '')).replace(/\s+/g, ' ').trim();
    return labelDe(s.type) + (txt ? ' - ' + txt.slice(0, 38) : ' - (vazia)');
  }

  function buildEditor() {
    var host = $('slides'); host.innerHTML = '';
    slides.forEach(function (s, i) {
      var card = document.createElement('div');
      card.className = 'slide-card' + (i === sel ? ' sel' : '');
      var head = document.createElement('div');
      head.className = 'slide-head';
      head.innerHTML = '<div class="slide-n">' + (i + 1) + '</div><div class="slide-title"></div>';
      head.querySelector('.slide-title').textContent = summary(s);
      head.onclick = function () { sel = i; buildEditor(); draw(); };

      var tools = document.createElement('div'); tools.className = 'row tight';
      [['↑', function () { if (i > 0) { slides.splice(i - 1, 0, slides.splice(i, 1)[0]); sel = i - 1; buildEditor(); draw(); } }],
       ['↓', function () { if (i < slides.length - 1) { slides.splice(i + 1, 0, slides.splice(i, 1)[0]); sel = i + 1; buildEditor(); draw(); } }],
       ['✕', function () { slides.splice(i, 1); if (sel >= slides.length) sel = slides.length - 1; buildEditor(); draw(); }]
      ].forEach(function (p) {
        var b = document.createElement('button'); b.className = 'btn tiny ghost'; b.textContent = p[0];
        b.onclick = function (e) { e.stopPropagation(); p[1](); }; tools.appendChild(b);
      });
      head.appendChild(tools); card.appendChild(head);

      var body = document.createElement('div'); body.className = 'slide-body';
      var sl = document.createElement('label'); sl.className = 'field';
      sl.innerHTML = '<span>Layout</span>';
      var se = document.createElement('select');
      Object.keys(tipos()).forEach(function (k) {
        var o = document.createElement('option'); o.value = k; o.textContent = labelDe(k);
        if (s.type === k) o.selected = true; se.appendChild(o);
      });
      se.onchange = function () { s.type = se.value; buildEditor(); draw(); };
      sl.appendChild(se); body.appendChild(sl);

      function textField(lb, key, hint, rows) {
        var l = document.createElement('label'); l.className = 'field';
        l.innerHTML = '<span></span>'; l.querySelector('span').textContent = lb;
        var ta = document.createElement('textarea'); ta.value = s[key] || ''; ta.rows = rows || 3;
        ta.oninput = function () { s[key] = ta.value; head.querySelector('.slide-title').textContent = summary(s); draw(); };
        l.appendChild(ta);
        if (hint) { var h = document.createElement('p'); h.className = 'hint'; h.innerHTML = hint; l.appendChild(h); }
        body.appendChild(l);
      }
      function imgField(lb) {
        var l = document.createElement('label'); l.className = 'field';
        l.innerHTML = '<span></span>'; l.querySelector('span').textContent = lb;
        var inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*';
        inp.onchange = function () {
          var f = inp.files[0]; if (!f) return;
          var r = new FileReader();
          r.onload = function () { loadImage(r.result).then(function (im) { s.img = im; s.imgName = f.name; buildEditor(); draw(); }); };
          r.readAsDataURL(f);
        };
        l.appendChild(inp);
        if (s.img) {
          var th = document.createElement('div'); th.className = 'thumb';
          var im = document.createElement('img'); im.src = s.img.src; th.appendChild(im);
          var rm = document.createElement('button'); rm.className = 'btn tiny ghost'; rm.textContent = 'Remover';
          rm.onclick = function (e) { e.preventDefault(); s.img = null; s.imgName = ''; buildEditor(); draw(); };
          th.appendChild(rm); l.appendChild(th);

          var t2 = tipos()[s.type];
          var cw = t2.img ? t2.img.w : W, ch = t2.img ? t2.img.h : H;

          function slider(rotulo, min, max, val, aoMudar) {
            var wrap = document.createElement('div');
            wrap.className = 'row'; wrap.style.marginTop = '7px';
            var cap = document.createElement('span');
            cap.className = 'hint'; cap.style.margin = '0'; cap.style.minWidth = '78px';
            cap.textContent = rotulo;
            var rg = document.createElement('input');
            rg.type = 'range'; rg.min = min; rg.max = max; rg.step = '1'; rg.value = String(val);
            rg.style.flex = '1'; rg.style.accentColor = 'var(--accent)';
            rg.oninput = function (e) { e.stopPropagation(); aoMudar(+rg.value); draw(); };
            rg.onclick = function (e) { e.stopPropagation(); };
            wrap.appendChild(cap); wrap.appendChild(rg); l.appendChild(wrap);
            return wrap;
          }

          var wH, wV;
          /* um eixo so aceita ajuste quando a imagem sobra nele;
             atualizado sem refazer o editor, para nao perder o arraste */
          function sincronizaEixos() {
            var f = folga(s.img, cw, ch, s.zoom);
            [[wH, f.x], [wV, f.y]].forEach(function (par) {
              if (!par[0]) return;
              var ativo = par[1] > 1;
              par[0].style.opacity = ativo ? '1' : '.35';
              par[0].querySelector('input').disabled = !ativo;
            });
          }

          slider('Zoom', 100, 300, Math.round((s.zoom || 1) * 100), function (v) {
            s.zoom = v / 100; sincronizaEixos();
          });
          wH = slider('Horizontal', 0, 100, Math.round((s.fx == null ? .5 : s.fx) * 100),
            function (v) { s.fx = v / 100; });
          wV = slider('Vertical', 0, 100, Math.round((s.fy == null ? .5 : s.fy) * 100),
            function (v) { s.fy = v / 100; });
          sincronizaEixos();
        }
        body.appendChild(l);
      }

      var campos = (tipos()[s.type] || {}).campos || ['body'];
      var dica = MARCAS[marca].dica;
      if (campos.indexOf('title') >= 0) textField('Título', 'title', s.type === 'capa' && marca === 'baroni' ? 'Staatliches 96px, vira caixa alta.' : null, 3);
      if (campos.indexOf('sub') >= 0) textField('Subtítulo', 'sub', null, 2);
      if (campos.indexOf('body') >= 0) textField('Texto', 'body', dica + ' · linha em branco = parágrafo', 5);
      if (campos.indexOf('img') >= 0) imgField(s.type === 'capa' ? 'Imagem de fundo' : 'Imagem');

      card.appendChild(body); host.appendChild(card);
    });
  }

  var canvases = [];
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function draw() {
    var c = cfg(), grid = $('grid');
    $('count').textContent = slides.length + (slides.length === 1 ? ' lâmina' : ' lâminas');
    if (!slides.length) {
      grid.innerHTML = '<p class="empty">Nenhuma lâmina ainda. Cole o texto ao lado e clique em <strong>Gerar lâminas</strong>.</p>';
      canvases = []; return;
    }
    grid.innerHTML = ''; canvases = [];
    slides.forEach(function (s, i) {
      var frame = document.createElement('div');
      frame.className = 'frame' + (i === sel ? ' sel' : '');
      var cv = document.createElement('canvas'); frame.appendChild(cv);
      if (render(cv, marca, s, c)) {
        var b = document.createElement('div'); b.className = 'badge-of';
        b.textContent = 'texto longo demais'; frame.appendChild(b);
      }
      var bar = document.createElement('div'); bar.className = 'frame-bar';
      bar.innerHTML = '<span class="grow"></span>';
      bar.querySelector('.grow').textContent = (i + 1) + '. ' + labelDe(s.type);
      var dl = document.createElement('button'); dl.className = 'btn tiny'; dl.textContent = 'PNG';
      dl.onclick = function () { cv.toBlob(function (b2) { save(b2, pad(i + 1) + '.png'); }, 'image/png'); };
      bar.appendChild(dl); frame.appendChild(bar);
      cv.onclick = function () { sel = i; buildEditor(); draw(); };
      grid.appendChild(frame); canvases.push(cv);
    });
  }

  /* divisao automatica do texto colado */
  function autoSplit(raw) {
    var ctx = document.createElement('canvas').getContext('2d');
    var paras = raw.replace(/\r/g, '').split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean);
    if (!paras.length) return [];
    var out = [], first = paras.shift().split('\n');
    var capa = blank('capa');
    if (marca === 'noticias') {
      /* a capa deste perfil nao tem subtitulo: o bloco inteiro vira o titulo */
      capa.title = first.join(' ');
    } else {
      capa.title = first[0] || ''; capa.sub = first.slice(1).join(' ');
    }
    out.push(capa);

    if (marca === 'noticias') {
      var ctxN = document.createElement('canvas').getContext('2d');
      var espaco = 640, atual = '';
      paras.forEach(function (pp) {
        var teste = atual ? atual + '\n\n' + pp : pp;
        if (atual && layout(ctxN, teste, N.texto.body).height > espaco) {
          var sn = blank('texto'); sn.body = atual; out.push(sn); atual = pp;
        } else atual = teste;
      });
      if (atual) { var sn2 = blank('texto'); sn2.body = atual; out.push(sn2); }
      return out;
    }

    if (marca === 'suno' || marca === 'tiago') {
      /* no Suno cada lamina tem titulo proprio: 1a linha do bloco vira titulo */
      paras.forEach(function (p) {
        var ls = p.split('\n'), s = blank('texto');
        s.title = ls[0]; s.body = ls.slice(1).join('\n');
        if (!s.body) { s.body = s.title; s.title = ''; }
        out.push(s);
      });
      return out;
    }
    var t = B.corpo, avail = t.regionBottom - t.regionTop, cur = '';
    paras.forEach(function (p) {
      var test = cur ? cur + '\n\n' + p : p;
      if (cur && layout(ctx, test, t.body).height > avail) {
        var s = blank('corpo'); s.body = cur; out.push(s); cur = p;
      } else cur = test;
    });
    if (cur) { var s2 = blank('corpo'); s2.body = cur; out.push(s2); }
    return out;
  }

  function aplicaMarca() {
    var M = MARCAS[marca];
    $('opt-disc').style.display = M.disclaimer ? '' : 'none';
    $('opt-topalign').style.display = M.topAlign ? '' : 'none';
    $('brand-hint').innerHTML = 'Formatação no texto: ' + M.dica + ' · linha em branco = parágrafo.';
    var validos = Object.keys(tipos());
    slides.forEach(function (s) { if (validos.indexOf(s.type) < 0) s.type = tipoPadrao(); });
    buildEditor(); draw();
  }

  function wire() {
    $('marca').onchange = function () { marca = $('marca').value; aplicaMarca(); };
    $('bulk-go').onclick = function () {
      var raw = $('bulk').value.trim();
      if (!raw) { toast('Cole algum texto primeiro.'); return; }
      slides = autoSplit(raw); sel = 0; buildEditor(); draw();
      toast(slides.length + ' lâminas geradas.');
    };
    /* confirmacao em dois cliques: `confirm()` e bloqueado em iframe sandbox */
    var armado = null;
    $('bulk-clear').onclick = function () {
      var b = $('bulk-clear');
      if (!slides.length) { $('bulk').value = ''; return; }
      if (!armado) {
        b.textContent = 'Confirmar?'; b.classList.add('primary');
        armado = setTimeout(function () {
          armado = null; b.textContent = 'Limpar tudo'; b.classList.remove('primary');
        }, 3500);
        return;
      }
      clearTimeout(armado); armado = null;
      b.textContent = 'Limpar tudo'; b.classList.remove('primary');
      $('bulk').value = ''; slides = []; sel = 0; buildEditor(); draw();
    };
    $('add').onclick = function () { slides.push(blank()); sel = slides.length - 1; buildEditor(); draw(); };
    ['disc', 'disc-on', 'autofit', 'topalign'].forEach(function (id) {
      $(id).addEventListener('input', draw); $(id).addEventListener('change', draw);
    });
    $('dl-one').onclick = function () {
      if (!canvases[sel]) { toast('Nada para baixar.'); return; }
      canvases[sel].toBlob(function (b) { save(b, pad(sel + 1) + '.png'); }, 'image/png');
    };
    $('dl-all').onclick = function () {
      if (!canvases.length) { toast('Nada para baixar.'); return; }
      var pngs = canvases.map(function (cv, i) {
        return new Promise(function (res) {
          cv.toBlob(function (b) { res({ name: pad(i + 1) + '.png', blob: b }); }, 'image/png');
        });
      });
      Promise.all(pngs).then(function (files) {
        return capDownloads.then(function (d) {
          if (!d) {
            return Promise.all(files.map(function (f) {
              return f.blob.arrayBuffer().then(function (ab) {
                return { name: f.name, data: new Uint8Array(ab) };
              });
            })).then(function (entries) {
              saveLocal(zip(entries), 'carrossel-' + marca + '.zip');
              toast(entries.length + ' PNGs no zip.');
            });
          }
          /* um pedido por vez: a capability so mantem um prompt aberto */
          var n = 0;
          return files.reduce(function (chain, f) {
            return chain.then(function (parar) {
              if (parar) return true;
              return save(f.blob, f.name).then(function (r) {
                if (r === 'salvo') { n++; return false; }
                return r === 'recusado';
              });
            });
          }, Promise.resolve(false)).then(function () {
            toast(n + ' de ' + files.length + ' PNGs salvos.');
          });
        });
      });
    };
  }

  bootAssets().then(function () {
    $('fontstat').textContent = HAS_LS ? '' : 'aviso: navegador sem letter-spacing em canvas';
    capDownloads.then(function (d) {
      if (d) {
        $('dl-all').textContent = 'Baixar todas (PNG)';
        $('dl-hint').textContent = 'Cada PNG pede uma confirmação sua.';
      }
    });
    wire(); aplicaMarca();
    window.__render = render; window.__slides = function () { return slides; };
    window.__blank = blank; window.__setMarca = function (m) { marca = m; $('marca').value = m; aplicaMarca(); };
    window.__redraw = draw; window.__ready = true;
  }).catch(function (e) {
    document.body.innerHTML = '<p style="padding:40px;font:16px sans-serif;color:#e5484d">Falha ao carregar fontes/assets: ' + e + '</p>';
  });

})();
