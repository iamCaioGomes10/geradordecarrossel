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
      new FontFace('Instrument Sans', b64ToBuf(A.instrument), { weight: '100 900' }),
      new FontFace('Archivo', b64ToBuf(A.archivo), { weight: '100 900' }),
      new FontFace('Instrument Serif', b64ToBuf(A.instrSerif), { weight: '400' })
    ];
    fonts.forEach(function (f) { document.fonts.add(f); });
    var svgName = atob(A.nameSvg), svgHandle = atob(A.handleSvg);
    var trNome = atob(A.trNomeSvg), trHandle = atob(A.trHandleSvg);
    var snNome = atob(A.snNomeSvg), snHandle = atob(A.snHandleSvg);
    var dnNome = atob(A.dnNomeSvg), dnHandle = atob(A.dnHandleSvg);
    var stAnel = atob(A.stAnelSvg), stNome = atob(A.stNomeSvg), stHandle = atob(A.stHandleSvg);
    var gkNome = atob(A.gkNomeSvg), gkHandle = atob(A.gkHandleSvg);
    var gkMono = atob(A.gkMonoSvg);
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
      loadImage(svgFill(snHandle, '#6F7377', '#6F7377')).then(function (i) { IMG.snHandleLight = i; }),
      loadImage('data:image/png;base64,' + A.gkAvatar).then(function (i) { IMG.gkAvatar = i; }),
      loadImage('data:image/jpeg;base64,' + A.gkTextura).then(function (i) { IMG.gkTextura = i; }),
      loadImage(svgUri(gkMono)).then(function (i) { IMG.gkMono = i; }),
      loadImage(svgFill(gkMono, 'white', 'black')).then(function (i) { IMG.gkMonoEscuro = i; }),
      loadImage('data:image/png;base64,' + A.gkBadge).then(function (i) { IMG.gkBadge = i; }),
      loadImage(svgFill(gkNome, '#E3E3E3', '#ededed')).then(function (i) { IMG.gkNomeDark = i; }),
      loadImage(svgFill(gkNome, '#E3E3E3', '#1b1b1b')).then(function (i) { IMG.gkNomeLight = i; }),
      loadImage(svgFill(gkHandle, '#868686', '#868686')).then(function (i) { IMG.gkHandleDark = i; }),
      loadImage(svgFill(gkHandle, '#868686', '#6f6f6f')).then(function (i) { IMG.gkHandleLight = i; }),
      loadImage('data:image/png;base64,' + A.dnAvatar).then(function (i) { IMG.dnAvatar = i; }),
      loadImage('data:image/png;base64,' + A.dnBadge).then(function (i) { IMG.dnBadge = i; }),
      loadImage(svgFill(dnNome, 'black', '#ffffff')).then(function (i) { IMG.dnNomeDark = i; }),
      loadImage(svgFill(dnNome, 'black', '#1b1b1b')).then(function (i) { IMG.dnNomeLight = i; }),
      loadImage(svgFill(dnHandle, '#868686', '#c9c9c9')).then(function (i) { IMG.dnHandleDark = i; }),
      loadImage(svgFill(dnHandle, '#868686', '#868686')).then(function (i) { IMG.dnHandleLight = i; }),
      loadImage('data:image/png;base64,' + A.stMarca).then(function (i) { IMG.stMarca = i; }),
      loadImage('data:image/png;base64,' + A.stLogo).then(function (i) { IMG.stLogo = i; }),
      loadImage('data:image/png;base64,' + A.stBadge).then(function (i) { IMG.stBadge = i; }),
      loadImage(svgFill(stAnel, '#D9D9D9', '#ffffff')).then(function (i) { IMG.stAnelDark = i; }),
      loadImage(svgFill(stAnel, '#D9D9D9', '#D9D9D9')).then(function (i) { IMG.stAnelLight = i; }),
      loadImage(svgFill(stNome, '#202020', '#ffffff')).then(function (i) { IMG.stNomeDark = i; }),
      loadImage(svgFill(stNome, '#202020', '#202020')).then(function (i) { IMG.stNomeLight = i; }),
      loadImage(svgFill(stHandle, '#B6B6B6', '#cfcfcf')).then(function (i) { IMG.stHandleDark = i; }),
      loadImage(svgFill(stHandle, '#B6B6B6', '#B6B6B6')).then(function (i) { IMG.stHandleLight = i; })
    ]).then(function () { return document.fonts.ready; });
  }

  /* =========================================================
     2. Motor de texto
     ========================================================= */
  var probe = document.createElement('canvas').getContext('2d');
  var HAS_LS = ('letterSpacing' in probe);

  function fontStr(spec, run) {
    /* __assim__ tambem pode mudar o peso, e nao so sublinhar: o titulo do
       @giankojikovski usa os dois marcadores no mesmo texto — ** pinta de
       dourado e __ engrossa — e sem isto o segundo destaque nao existiria */
    var w = spec.weight;
    if (run && run.em && spec.emWeight) w = spec.emWeight;
    else if (run && run.alt && spec.altWeight) w = spec.altWeight;
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

  /* ---------- tema claro / escuro por lamina ----------
     Cada marca ja tem as duas paletas dentro dela: a capa e o tratamento
     escuro, as laminas de texto sao o claro. Trocar o tema e usar as cores da
     propria marca, nao inventar cor nova. `nativo` diz qual e o tema que o
     Figma desenhou para aquele layout — sem escolha da pessoa, e ele que vale. */
  var TEMAS = {
    baroni: {
      escuro: { fundo: '#050505', titulo: '#f1f1f1', sub: '#ffffff', corpo: '#f0f0f0',
                cab: 'dark', disc: '#8b8f93' },
      claro:  { fundo: '#ffffff', titulo: '#111111', sub: '#3a3a3a', corpo: '#000000',
                cab: 'light', disc: '#6f7377' } },
    suno: {
      escuro: { fundo: '#0d0d0d', grad: 'GRAD_CAPA', sub: '#e5e5e5', cab: 'dark' },
      claro:  { fundo: '#ffffff', grad: 'GRAD_TITLE', sub: '#3a3a3a', cab: 'light' } },
    tiago: {
      escuro: { fundo: '#111111', titulo: '#ffffff', sub: '#ececec', corpo: '#ececec',
                cab: 'dark' },
      claro:  { fundo: 'TR_BG', titulo: '#1b1b1b', sub: '#3a3a3a', corpo: '#242424',
                cab: 'light' } },
    noticias: {
      escuro: { fundo: '#141414', titulo: '#ffffff', corpo: '#f0f0f0', cab: 'dark',
                semPapel: true },
      claro:  { fundo: 'PAPEL', titulo: '#111111', corpo: '#000000', cab: 'light' } },
    consultoria: {
      escuro: { fundo: '#141414', titulo: '#ffffff', sub: '#ffffff', corpo: '#ececec',
                cab: 'dark' },
      claro:  { fundo: '#f7f7f7', titulo: '#1e1e1e', sub: '#1e1e1e', corpo: '#1e1e1e',
                cab: 'light' } },
    funds: {
      escuro: { fundo: '#111111', titulo: '#ffffff', sub: '#ffffff', corpo: '#f0f0f0',
                cab: 'dark' },
      claro:  { fundo: 'TR_BG', titulo: '#1b1b1b', sub: '#1b1b1b', corpo: '#000000',
                cab: 'light' } },
    gian: {
      escuro: { fundo: 'GK_BG', titulo: '#ededed', sub: '#8a8a8a', cab: 'dark' },
      claro:  { fundo: '#ffffff', titulo: '#1b1b1b', sub: '#6f6f6f', cab: 'light' } },
    danielle: {
      escuro: { fundo: '#141414', titulo: '#fffbd2', corpo: '#ececec', cab: 'dark' },
      claro:  { fundo: 'DN_BG', titulo: '#1b1b1b', corpo: '#242424', cab: 'light' } },
    status: {
      escuro: { fundo: '#111111', titulo: '#efefef', sub: '#efefef', corpo: '#d2d2d2',
                cab: 'dark' },
      claro:  { fundo: 'ST_BG', titulo: '#1b1b1b', sub: '#3a3a3a', corpo: '#787878',
                cab: 'light' } }
  };
  /* qual tema o Figma desenhou para cada layout */
  var TEMA_NATIVO = {
    baroni:      { capa: 'escuro', corpo: 'claro',  corpoImg: 'escuro' },
    suno:        { capa: 'escuro', corpoImg: 'claro', texto: 'claro' },
    tiago:       { capa: 'escuro', texto: 'claro',  foto: 'claro' },
    noticias:    { capa: 'escuro', texto: 'claro',  imagem: 'claro' },
    consultoria: { capa: 'escuro', texto: 'claro',  imagem: 'claro' },
    funds:       { capa: 'escuro', texto: 'claro',  imagem: 'claro' },
    danielle:    { capa: 'escuro', texto: 'claro',  imagem: 'claro' },
    status:      { capa: 'escuro', texto: 'claro',  imagem: 'claro' },
    gian:        { capa: 'escuro', texto: 'escuro', imagem: 'escuro',
                   capaB: 'escuro', fotoB: 'escuro', claroTexto: 'claro',
                   claroFotoTopo: 'claro', claroFotoBaixo: 'claro',
                   claroFotoMeio: 'claro' }
  };

  var TEMA = null, TEMA_MARCA = null, TEMA_TIPO = null;

  function nativo() {
    return (TEMA_NATIVO[TEMA_MARCA] || {})[TEMA_TIPO] || 'claro';
  }
  /* o tema em vigor: o escolhido pela pessoa, ou o do projeto */
  function tema() { return TEMA || nativo(); }
  function paleta() { return (TEMAS[TEMA_MARCA] || {})[tema()] || {}; }
  /* true quando a pessoa pediu algo diferente do que o layout ja era */
  function temaTrocado() { return !!TEMA && TEMA !== nativo(); }

  /* pinta o fundo: o do projeto quando nao ha troca, o da paleta quando ha */
  function pintaFundo(ctx, padrao) {
    if (!temaTrocado()) return padrao();
    var f = paleta().fundo;
    if (f === 'TR_BG')      ctx.fillStyle = cssGrad(ctx, TR_BG.angle, 0, 0, W, H, TR_BG.stops);
    else if (f === 'DN_BG') return dnFundo(ctx);
    else if (f === 'PAPEL') return snPapel(ctx);
    else if (f === 'ST_BG') return stFundo(ctx);
    else if (f === 'GK_BG') return gkFundo(ctx);
    else                    ctx.fillStyle = f;
    ctx.fillRect(0, 0, W, H);
  }
  /* nas capas o fundo e a foto; esta e a base de quando ainda nao ha foto.
     Em tema claro ela precisa ser clara, senao o texto escuro some. */
  function baseCapa(padrao) {
    if (!temaTrocado()) return padrao;
    return tema() === 'claro' ? '#f2f2f2' : (paleta().fundo || padrao);
  }

  /* tema do cabecalho de perfil (nome e arroba tem versao clara e escura) */
  function cab(padrao) { return temaTrocado() ? paleta().cab : padrao; }

  /* os gradientes do @suno so existem depois; por isso a paleta guarda o nome */
  function gradDoTema() {
    var g = paleta().grad;
    if (g === 'GRAD_CAPA') return GRAD_CAPA;
    if (g === 'GRAD_TITLE') return GRAD_TITLE;
    return null;
  }

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
    if (!campo) return spec;
    /* cor do tema primeiro: quem manda no texto e a paleta da marca */
    if (temaTrocado()) {
      var cor = paleta()[campo];
      if (cor) spec = Object.assign({}, spec, { color: cor });
    }
    if (!AJUSTES) return spec;
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
    /* no @suno o texto e pintado por gradiente: trocar o tema troca o gradiente,
       nao a cor. O vermelho do destaque fica como esta nos dois temas. */
    if (temaTrocado()) {
      var g = gradDoTema();
      if (g) style = Object.assign({}, style, { grad: g });
    }
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
    /* nas capas o fundo e a foto: o que escurece (ou clareia) o pe da lamina
       para o texto ler e este veu. Em tema claro ele vira branco. */
    var claro = tema() === 'claro';
    var fim = claro ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)';
    var zero = claro ? 'rgba(255,255,255,0)' : 'rgba(0,0,0,0)';
    var de = claro ? String(from).replace('0,0,0', '255,255,255') : from;
    for (var k = 0; k < times; k++) {
      var g = ctx.createLinearGradient(0, ini, 0, H);
      if (entrada) {
        g.addColorStop(0, zero);
        g.addColorStop(entrada / alt, de);
      } else {
        g.addColorStop(0, de);
      }
      g.addColorStop(1, fim);
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
    var spec = { font: 'Inter', size: 24, lh: 1.28, ls: -0.96, w: 900, weight: 700,
                 color: temaTrocado() ? (paleta().disc || '#6f7377') : '#6f7377' };
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
    pintaFundo(ctx, function () { ctx.fillStyle = '#050505'; ctx.fillRect(0, 0, W, H); });
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
    baroniHeader(ctx, t.x, headTop, cab('dark'));
    paintSolid(ctx, tb, t.x, titleTop, "titulo"); paintSolid(ctx, sb, t.x, subTop, "sub");
    baroniDisc(ctx, t, cfg);
    return of;
  }

  function baroniCorpo(ctx, s, cfg) {
    var t = B.corpo, of = false;
    pintaFundo(ctx, function () { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H); });
    var spec = Object.assign({}, t.body), avail = t.regionBottom - t.regionTop, blk;
    for (var p = 0; p < 14; p++) {
      blk = layout(ctx, s.body || '', spec, 'corpo');
      if (blk.height <= avail || !cfg.autofit || spec.size < 22) break;
      spec.size = Math.round(spec.size * 0.94);
    }
    if (blk.height > avail) of = true, ESTOUROU = "corpo";
    var top = Math.max(t.regionTop,
      cfg.topAlign ? t.regionTop : t.regionTop + (avail - blk.height) / 2);
    /* o @ acompanha o texto em vez de ficar preso no alto: com pouco texto,
       ficava um vao enorme entre o perfil e a primeira linha. A distancia e a
       do proprio layout (regionTop - headY - avatar), entao com o texto cheio
       o cabecalho cai exatamente onde o Figma o desenhou. */
    var gapCab = t.regionTop - t.headY - HEAD.av;
    baroniHeader(ctx, t.x, top - gapCab - HEAD.av, cab('light'));
    paintSolid(ctx, blk, t.x, top, "corpo");
    baroniDisc(ctx, t, cfg);
    return of;
  }

  function baroniCorpoImg(ctx, s, cfg) {
    var t = B.corpoImg, of = false;
    pintaFundo(ctx, function () { ctx.fillStyle = '#050505'; ctx.fillRect(0, 0, W, H); });
    var spec = Object.assign({}, t.body), blk, headTop, textTop, imgTop = t.img.bottom - t.img.h;
    for (var p = 0; p < 14; p++) {
      blk = layout(ctx, s.body || '', spec, 'corpo');
      textTop = imgTop - t.gapTextImg - blk.height;
      headTop = textTop - t.gapHeadText - HEAD.av;
      if (headTop >= t.minTop || !cfg.autofit || spec.size < 22) break;
      spec.size = Math.round(spec.size * 0.94);
    }
    if (headTop < t.minTop) of = true, ESTOUROU = "titulo";
    baroniHeader(ctx, t.x, headTop, cab('dark'));
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
    } else ctx.fillStyle = baseCapa('#141414');   /* sem foto: base legivel */
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
    pintaFundo(ctx, function () { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H); });
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
    pintaFundo(ctx, function () { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H); });
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

  /* ---------- variantes de composicao ----------
     As telas extras de cada perfil nao inventam identidade: nascem da propria
     lamina de imagem da marca, com a mesma fonte, cor, margem, cabecalho e
     fundo. O que muda e onde a foto entra e se existe corpo de texto. */

  /* foto de borda a borda no alto da lamina, com o grupo de texto embaixo */
  function vFotoTopo(base, gapImgHead, alt) {
    var t = Object.assign({}, base, { label: 'Foto em cima', ordem: 'fotoTopo',
                                      gapImgHead: gapImgHead });
    t.img = Object.assign({}, base.img, { x: 0, w: W, r: 0 });
    if (alt) t.img.h = alt;
    delete t.topo;
    return t;
  }
  /* foto entre o titulo e o corpo, como a lamina da @SunoConsultoria */
  function vFotoMeio(base) {
    return Object.assign({}, base, { label: 'Foto no meio', ordem: 'fotoMeio' });
  }
  /* so a manchete, sem corpo: serve de abertura, virada e remate */
  function vDestaque(base, fator) {
    var t = Object.assign({}, base, { label: 'Só a manchete',
                                      campos: ['title'], semCorpo: true });
    t.title = Object.assign({}, base.title, { size: Math.round(base.title.size * (fator || 1.4)) });
    delete t.img; delete t.topo;
    return t;
  }

  function fotoEm(ctx, s, box, x, y, cor) {
    regiao('imagem', x, y, box.w, box.h);
    ctx.save(); roundRect(ctx, x, y, box.w, box.h, box.r); ctx.clip();
    if (s.img) drawCover(ctx, s.img, x, y, box.w, box.h, s);
    else { ctx.fillStyle = cor; ctx.fillRect(x, y, box.w, box.h); }
    ctx.restore();
  }

  /* motor comum das marcas em formato de tweet (@tiagogreis, @daniellelopesn,
     @status.invest): cabecalho, titulo e corpo, com a foto entrando no ponto
     que o layout pedir. As tres laminas originais passam por aqui com o mesmo
     resultado de antes — o que era `comImagem ? A : B` virou consulta por tipo. */
  function corpoTweet(ctx, s, cfg, m) {
    var t = m.tipos[s.type] || m.tipos[m.padrao], of = false;
    /* pintaFundo chama o padrao sem argumento: o ctx vem por fechamento */
    pintaFundo(ctx, function () { m.fundo(ctx); });
    var ordem = t.ordem || (t.img ? 'fotoFim' : 'semFoto');
    var semCorpo = !!t.semCorpo, noTopo = ordem === 'fotoTopo';
    var ts = Object.assign({}, t.title), bs = Object.assign({}, t.body || {});
    var tb, bb, grupo;
    var extra = (t.img && !noTopo) ? (t.gapBodyImg + t.img.h) : 0;
    var teto = noTopo ? (t.img.h + t.gapImgHead) : 0;
    var limite = H - m.folga - teto;
    for (var p = 0; p < 14; p++) {
      tb = layout(ctx, s.title || '', ts, 'titulo');
      bb = semCorpo ? { height: 0, runs: [] } : layout(ctx, s.body || '', bs, 'corpo');
      grupo = m.headAv + t.gapHeadTitle + tb.height +
              (semCorpo ? 0 : t.gapTitleBody + bb.height) + extra;
      if (grupo <= limite || !cfg.autofit) break;
      if (semCorpo) { if (ts.size < 40) break; }
      else { if (bs.size < 24) break; bs.size = Math.round(bs.size * 0.94); }
      ts.size = Math.round(ts.size * 0.96);
    }
    if (grupo > limite) { of = true; ESTOUROU = semCorpo ? 'titulo' : 'corpo'; }

    if (noTopo) fotoEm(ctx, s, t.img, 0, 0, m.placeholder);

    /* com a foto no alto, o texto se centra na sobra em vez de ficar colado
       nela: texto curto deixava um vao enorme no pe da lamina */
    var y = noTopo ? teto + Math.max(0, (H - (m.rodape || 60) - teto - grupo) / 2)
          : (t.topo != null ? t.topo : (H - grupo) / 2 + (t.bias || 0));
    var chao = H - 40;
    if (y + grupo > chao) y = Math.max(noTopo ? teto : 50, chao - grupo);
    if (!noTopo && y < 50) y = 50;

    m.header(ctx, t.x, y);
    y += m.headAv + t.gapHeadTitle;
    paintSolid(ctx, tb, t.x, y, 'titulo');
    y += tb.height;
    var ix = (t.img && t.img.x != null) ? t.img.x : m.imgX;
    if (ordem === 'fotoMeio') {
      y += t.gapTitleBody;
      fotoEm(ctx, s, t.img, ix, y, m.placeholder);
      y += t.img.h + t.gapBodyImg;
      paintSolid(ctx, bb, t.bodyX || t.x, y, 'corpo');
    } else if (!semCorpo) {
      y += t.gapTitleBody;
      paintSolid(ctx, bb, t.bodyX || t.x, y, 'corpo');
      y += bb.height;
      if (ordem === 'fotoFim') fotoEm(ctx, s, t.img, ix, y + t.gapBodyImg, m.placeholder);
    }
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
    /* base escura como nas outras capas: o gradiente claro do trFundo so
       aparecia quando nao havia foto, e ai o titulo branco sumia nele */
    pintaFundo(ctx, function () {
      ctx.fillStyle = baseCapa('#111111'); ctx.fillRect(0, 0, W, H);
    });
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
  T.fotoTopo = vFotoTopo(T.foto, 56);
  T.fotoMeio = vFotoMeio(T.foto);
  T.destaque = vDestaque(T.texto);

  var TR = { tipos: T, padrao: 'texto', headAv: TR_HEAD.av, folga: 120, imgX: 85,
             placeholder: '#e2e2e2',
             fundo: function (c) { trFundo(c); },
             header: function (c, x, y) { trHeader(c, x, y, cab('light')); } };
  function trCorpo(ctx, s, cfg) { return corpoTweet(ctx, s, cfg, TR); }

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
    ctx.fillStyle = baseCapa('#141414'); ctx.fillRect(0, 0, W, H);
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
    pintaFundo(ctx, function () { snPapel(ctx); });
    var bs = Object.assign({}, t.body), blk, headTop;
    for (var p = 0; p < 14; p++) {
      blk = layout(ctx, s.body || '', bs, 'corpo');
      headTop = (t.textCenter - blk.height / 2) - t.gapHeadText - SN_HEAD.av;
      if (headTop >= 60 || !cfg.autofit || bs.size < 26) break;
      bs.size = Math.round(bs.size * 0.94);
    }
    if (headTop < 60) of = true, ESTOUROU = "corpo";
    var top = t.textCenter - blk.height / 2;
    snHeader(ctx, t.x, headTop, cab('light'));
    paintSolid(ctx, blk, t.x, top, "corpo");
    return of;
  }

  /* aqui o conjunto inteiro e centralizado, como no arquivo */
  function snImagem(ctx, s, cfg) {
    var t = N.imagem, of = false;
    pintaFundo(ctx, function () { snPapel(ctx); });
    var bs = Object.assign({}, t.body), blk, total;
    for (var p = 0; p < 14; p++) {
      blk = layout(ctx, s.body || '', bs, 'corpo');
      total = SN_HEAD.av + t.gapHeadText + blk.height + t.gapTextImg + t.img.h;
      if (total <= H - 120 || !cfg.autofit || bs.size < 26) break;
      bs.size = Math.round(bs.size * 0.94);
    }
    if (total > H - 120) of = true, ESTOUROU = "corpo";
    var y = (H - total) / 2; if (y < 50) y = 50;
    snHeader(ctx, t.x, y, cab('light'));
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
    ctx.fillStyle = baseCapa('#000000'); ctx.fillRect(0, 0, W, H);
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
    pintaFundo(ctx, function () { ctx.fillStyle = '#f7f7f7'; ctx.fillRect(0, 0, W, H); });
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
    ctx.fillStyle = baseCapa('#0b0b0b'); ctx.fillRect(0, 0, W, H);
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
    pintaFundo(ctx, function () { feFundo(ctx); });
    var bs = Object.assign({}, t.body), blk, top, headTop;
    for (var p = 0; p < 14; p++) {
      blk = layout(ctx, s.body || '', bs, 'corpo');
      top = t.textCenter - blk.height / 2;
      /* sem teto em headY: com pouco texto o cabecalho ficava parado no alto e
         o texto descia para o centro, abrindo um vao. Seguindo o texto, com o
         texto cheio ele cai no mesmo lugar de antes. */
      headTop = top - t.gapHeadText - FE_HEAD.av * t.k;
      if (headTop >= 50 || !cfg.autofit || bs.size < 26) break;
      bs.size = Math.round(bs.size * 0.94);
    }
    if (headTop < 50) of = true, ESTOUROU = "corpo";
    feHeader(ctx, t.x, headTop, cab('light'), t.k);
    paintSolid(ctx, blk, t.x, top, "corpo");
    return of;
  }

  /* aqui o conjunto e centralizado e os dois vaos sao iguais */
  function feImagem(ctx, s, cfg) {
    var t = F.imagem, of = false;
    pintaFundo(ctx, function () { feFundo(ctx); });
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
     9b. MARCA: @daniellelopesn
     Figma 2480:282 (capa), 2480:196 (so texto), 2480:239 (texto + imagem).
     Titulo em Instrument Serif. O corpo e SF Pro no arquivo, que a Apple nao
     licencia para embutir: entra Instrument Sans, que foi a fonte do pacote
     cujas quebras de linha bateram com as do Figma depois de calibrar o
     espacamento em -2,75 (o arquivo pede -2,25). Medido, nao chutado.
     ========================================================= */
  /* o nome na arte e "Danielle Lopes": o SVG do Figma vinha com "Nicoli" no
     meio e foi cortado no proprio arquivo, entao a largura caiu de 263 para
     187,14 e o selo de verificado subiu junto, mantendo os 10px de folga */
  var DN_HEAD = { av: 92.779, nameDx: 109, nameDy: 15, nameW: 187.14, nameH: 30.601,
                  hDx: 109, hDy: 50.79, hW: 179, hH: 25.953, bDx: 306.14, bDy: 15, bW: 26.195 };

  function dnHeader(ctx, x, y, theme) {
    tweetHeader(ctx, DN_HEAD, { avatar: IMG.dnAvatar, badge: IMG.dnBadge,
      nameLight: IMG.dnNomeLight, nameDark: IMG.dnNomeDark,
      handleLight: IMG.dnHandleLight, handleDark: IMG.dnHandleDark }, x, y, theme);
  }

  /* fundo claro dos layouts de texto */
  function dnFundo(ctx) {
    ctx.fillStyle = cssGrad(ctx, 154.4523392216068, 0, 0, W, H,
      [[0.084259, 'rgb(255,255,255)'], [0.95185, 'rgb(240,240,240)']]);
    ctx.fillRect(0, 0, W, H);
  }

  var D = {
    capa: { label: 'Capa', campos: ['title', 'img'],
      x: 76, minTop: 40, shadeTop: 651, gapHeadTitle: 48.4, titleBottom: 1265.8,
      title: { font: 'Instrument Serif', size: 95, lh: 1.03, ls: -3.8, w: 928,
               weight: 400, color: '#fffbd2' } },
    texto: { label: 'S&oacute; texto', campos: ['title', 'body'],
      x: 131, gapHeadTitle: 39.62, gapTitleBody: 38.4,
      title: { font: 'Instrument Serif', size: 80, lh: 1.03, ls: -3.2, w: 784,
               weight: 400, color: '#1b1b1b' },
      body: { font: 'Instrument Sans', size: 45, lh: 1.23, ls: -2.75, w: 784,
              weight: 500, color: '#242424', emWeight: 700 } },
    imagem: { label: 'Texto + imagem', campos: ['title', 'body', 'img'],
      x: 131, gapHeadTitle: 45.6, gapTitleBody: 38.9, gapBodyImg: 52.45,
      title: { font: 'Instrument Serif', size: 80, lh: 1.03, ls: -3.2, w: 784,
               weight: 400, color: '#1b1b1b' },
      body: { font: 'Instrument Sans', size: 45, lh: 1.23, ls: -2.75, w: 784,
              weight: 500, color: '#242424', emWeight: 700 },
      img: { x: 124, w: 778, h: 398, r: 27 } }
  };

  function dnCapa(ctx, s, cfg) {
    var t = D.capa, of = false;
    var ts = Object.assign({}, t.title), tb, headTop;
    for (var p = 0; p < 14; p++) {
      tb = layout(ctx, s.title || '', ts, 'titulo');
      headTop = t.titleBottom - tb.height - t.gapHeadTitle - DN_HEAD.av;
      if (headTop >= t.minTop || !cfg.autofit || ts.size < 46) break;
      ts.size = Math.round(ts.size * 0.94);
    }
    if (headTop < t.minTop) of = true, ESTOUROU = 'titulo';
    ctx.fillStyle = baseCapa('#141414'); ctx.fillRect(0, 0, W, H);
    regiao('imagem', 0, 0, W, H);
    if (s.img) drawCover(ctx, s.img, 0, 0, W, H, s);
    /* o degrade nasce onde o Figma pos, mas sobe junto se o titulo crescer:
       senao o texto acaba caindo sobre a parte clara da foto */
    shade(ctx, Math.min(t.shadeTop, headTop - 40), 3, 'rgba(0,0,0,0)');
    dnHeader(ctx, t.x, headTop, cab('dark'));
    paintSolid(ctx, tb, t.x, t.titleBottom - tb.height, 'titulo');
    return of;
  }

  /* texto e imagem compartilham a composicao: o grupo inteiro — perfil, titulo,
     corpo e, quando existe, a foto — fica centrado na lamina, que e como o
     Figma posiciona os dois (margens de topo e base iguais no arquivo). */
  D.fotoTopo = vFotoTopo(D.imagem, 56);
  D.fotoMeio = vFotoMeio(D.imagem);
  D.destaque = vDestaque(D.texto, 1.3);

  var DN = { tipos: D, padrao: 'texto', headAv: DN_HEAD.av, folga: 120, imgX: 124,
             placeholder: '#e4e4e4',
             fundo: function (c) { dnFundo(c); },
             header: function (c, x, y) { dnHeader(c, x, y, cab('light')); } };
  function dnCorpo(ctx, s, cfg) { return corpoTweet(ctx, s, cfg, DN); }

  /* =========================================================
     9c. MARCA: @status.invest
     Figma 2023:422 (capa), 2021:2 (so texto), 2022:297 (texto + imagem).
     Inter nos dois pesos que o arquivo pede, e o fundo e o mesmo gradiente do
     @tiagogreis, com dois aneis da marca quase transparentes por cima.
     O destaque tem duas caras aqui: verde-agua no titulo, cinza escuro no
     corpo (que nasce cinza medio, nao preto).
     ========================================================= */
  var ST_HEAD = { av: 93, logoDx: 9, logoDy: 9, logo: 75,
                  nameDx: 100.1, nameDy: 20.35, nameW: 158.63, nameH: 21.919,
                  hDx: 99.98, hDy: 48.22, hW: 145.832, hH: 23.647,
                  bDx: 268, bDy: 21, bW: 22 };
  /* na capa o cabecalho e um pouco menor e os deslocamentos mudam 3px */
  var ST_HEAD_CAPA = { av: 87, logoDx: 6, logoDy: 6, logo: 75,
                  nameDx: 97.1, nameDy: 17.35, nameW: 158.631, nameH: 21.919,
                  hDx: 96.98, hDy: 45.22, hW: 145.832, hH: 23.647,
                  bDx: 265, bDy: 18, bW: 22 };

  function stHeader(ctx, m, x, y, theme) {
    var claro = theme === 'light';
    ctx.drawImage(claro ? IMG.stAnelLight : IMG.stAnelDark, x, y, m.av, m.av);
    ctx.drawImage(IMG.stLogo, x + m.logoDx, y + m.logoDy, m.logo, m.logo);
    ctx.drawImage(claro ? IMG.stNomeLight : IMG.stNomeDark,
      x + m.nameDx, y + m.nameDy, m.nameW, m.nameH);
    ctx.drawImage(claro ? IMG.stHandleLight : IMG.stHandleDark,
      x + m.hDx, y + m.hDy, m.hW, m.hH);
    ctx.drawImage(IMG.stBadge, x + m.bDx, y + m.bDy, m.bW, m.bW);
  }

  /* os dois aneis da marca: o arquivo os coloca em caixas centradas e giradas,
     entao aqui a conta e o centro de cada caixa mais o giro */
  var ST_ANEIS = [
    { cx: -115 + 1895.665 / 2, cy: 684 + 1895.665 / 2, giro: 145.21 },
    { cx: -430 + 1829.441 / 2, cy: -651.72 + 1829.441 / 2, giro: -26.77 }
  ];
  function stAneis(ctx, alfa) {
    ctx.save();
    ctx.globalAlpha = alfa;
    ST_ANEIS.forEach(function (a) {
      ctx.save();
      ctx.translate(a.cx, a.cy);
      ctx.rotate(a.giro * Math.PI / 180);
      ctx.drawImage(IMG.stMarca, -681, -681, 1362, 1362);
      ctx.restore();
    });
    ctx.restore();
  }
  function stFundo(ctx) {
    ctx.fillStyle = cssGrad(ctx, TR_BG.angle, 0, 0, W, H, TR_BG.stops);
    ctx.fillRect(0, 0, W, H);
    stAneis(ctx, 0.07);
  }

  var ST = {
    capa: { label: 'Capa', campos: ['title', 'sub', 'img'],
      x: 97, subX: 100, minTop: 40, shadeTop: 657,
      subBottom: 1252.85, gapTitleSub: 29.55, gapHeadTitle: 39.4,
      title: { font: 'Inter', size: 85, lh: 1.03, ls: -5.95, w: 868, weight: 600,
               color: '#efefef', emColor: '#00ab93' },
      sub: { font: 'Inter', size: 45, lh: 1.23, ls: -2.25, w: 865, weight: 500,
             color: '#efefef', emColor: '#cacaca' } },
    texto: { label: 'S&oacute; texto', campos: ['title', 'body'],
      /* vaos do arquivo; o bias existe porque a composicao do Figma nao esta
         exatamente centrada: fica 6,6px mais baixa que o centro da lamina */
      x: 128, gapHeadTitle: 46.66, gapTitleBody: 66.46, bias: 6.6,
      title: { font: 'Inter', size: 64, lh: 1.03, ls: -4.48, w: 762, weight: 600,
               color: '#1b1b1b', emColor: '#00ab93' },
      /* o Figma marca o corpo como SemiBold, mas 600 a 45px fica pesado na arte:
         500, como o corpo do @tiagogreis, que e a mesma fonte no mesmo tamanho.
         O destaque aqui e por cor, nao por peso, entao nao perde contraste. */
      body: { font: 'Inter', size: 45, lh: 1.23, ls: -2.25, w: 824, weight: 500,
              color: '#787878', emColor: '#3d3d3d' } },
    imagem: { label: 'Texto + imagem', campos: ['title', 'body', 'img'],
      x: 114, bodyX: 118, topo: 127,
      gapHeadTitle: 21.65, gapTitleBody: 24.45, gapBodyImg: 52,
      title: { font: 'Inter', size: 64, lh: 1.03, ls: -4.48, w: 762, weight: 600,
               color: '#1b1b1b', emColor: '#00ab93' },
      body: { font: 'Inter', size: 45, lh: 1.23, ls: -2.25, w: 824, weight: 500,
              color: '#787878', emColor: '#3d3d3d' },
      img: { x: 114, w: 852, h: 420, r: 27 } }
  };

  function stCapa(ctx, s, cfg) {
    var t = ST.capa, of = false;
    var ts = Object.assign({}, t.title), ss = Object.assign({}, t.sub), tb, sb, headTop;
    for (var p = 0; p < 14; p++) {
      tb = layout(ctx, s.title || '', ts, 'titulo');
      sb = layout(ctx, s.sub || '', ss, 'sub');
      headTop = (t.subBottom - sb.height) - t.gapTitleSub - tb.height
                - t.gapHeadTitle - ST_HEAD_CAPA.av;
      if (headTop >= t.minTop || !cfg.autofit || ts.size < 48) break;
      ts.size = Math.round(ts.size * 0.94);
      if (ts.size < 60) ss.size = Math.round(ss.size * 0.94);
    }
    if (headTop < t.minTop) of = true, ESTOUROU = 'titulo';
    pintaFundo(ctx, function () {
      ctx.fillStyle = baseCapa('#111111'); ctx.fillRect(0, 0, W, H);
    });
    regiao('imagem', 0, 0, W, H);
    if (s.img) drawCover(ctx, s.img, 0, 0, W, H, s);
    stAneis(ctx, 0.10);
    shade(ctx, Math.min(t.shadeTop, headTop - 40), 2, 'rgba(0,0,0,0)');
    stHeader(ctx, ST_HEAD_CAPA, t.x + 3, headTop, cab('dark'));
    var subTop = t.subBottom - sb.height;
    paintSolid(ctx, tb, t.x, subTop - t.gapTitleSub - tb.height, 'titulo');
    paintSolid(ctx, sb, t.subX, subTop, 'sub');
    return of;
  }

  /* so texto centra o grupo na lamina; texto + imagem ancora no topo, porque
     a foto entra depois do corpo e fecha a composicao embaixo */
  ST.fotoTopo = vFotoTopo(ST.imagem, 56);
  ST.fotoMeio = vFotoMeio(ST.imagem);
  ST.destaque = vDestaque(ST.texto);

  var STM = { tipos: ST, padrao: 'texto', headAv: ST_HEAD.av, folga: 160, imgX: 114,
              placeholder: '#e4e4e4',
              fundo: function (c) { stFundo(c); },
              header: function (c, x, y) { stHeader(c, ST_HEAD, x, y, cab('light')); } };
  function stCorpo(ctx, s, cfg) { return corpoTweet(ctx, s, cfg, STM); }

  /* =========================================================
     9d. MARCA: @giankojikovski
     Figma 3006:50 (capa), 3025:48 (so texto), 3025:15 (texto + imagem).

     Instrument Sans com entrelinha 0,87 — menor que 1 — e espacamento -8. E
     isso que da o bloco compacto, com as linhas quase encostando. O titulo usa
     DOIS destaques ao mesmo tempo: ** pinta de dourado e __ engrossa para
     Medium, que foi o que levou o altWeight ao motor de texto.
     ========================================================= */
  var GK_HEAD = { av: 87.35, nameDx: 101.68, nameDy: 12.24, nameW: 207.126, nameH: 32.774,
                  hDx: 103.56, hDy: 48.96, hW: 168.543, hH: 26.019,
                  bDx: 316.34, bDy: 14.12, bW: 24.662 };
  /* na capa o bloco vem menor, e nome e arroba foram reduzidos em proporcoes
     diferentes no arquivo (0,63 e 0,50). Numeros do Figma, nao derivados da
     escala do avatar — derivar erraria a arroba em 22px. */
  var GK_HEAD_CAPA = { av: 55.0, nameDx: 64.57, nameDy: 9.57, nameW: 130.331, nameH: 20.326,
                       hDx: 64.57, hDy: 32.28, hW: 83.699, hH: 13.153,
                       bDx: 199.68, bDy: 10.76, bW: 15.544 };

  function gkHeader(ctx, x, y, theme, metrica) {
    tweetHeader(ctx, metrica || GK_HEAD, { avatar: IMG.gkAvatar, badge: IMG.gkBadge,
      nameLight: IMG.gkNomeLight, nameDark: IMG.gkNomeDark,
      handleLight: IMG.gkHandleLight, handleDark: IMG.gkHandleDark }, x, y, theme);
  }

  /* Monograma gk gigante, branco a 2% de opacidade — ja vem no proprio SVG.
     Em tema claro ele vira preto, senao branco sobre branco some. */
  function gkMonograma(ctx, dy) {
    var im = tema() === 'claro' ? IMG.gkMonoEscuro : IMG.gkMono;
    if (im) ctx.drawImage(im, -191, dy || 0, 1406.49, 1350);
  }

  /* Grao de concreto por cima de tudo. No arquivo e screen, que sobre fundo
     claro nao faz nada — ali vira multiply, para a textura seguir existindo
     quando a pessoa troca o fundo da lamina. */
  function gkTextura(ctx, alfa) {
    if (!IMG.gkTextura) return;
    var a = ctx.globalAlpha, op = ctx.globalCompositeOperation;
    ctx.globalAlpha = alfa;
    ctx.globalCompositeOperation = tema() === 'claro' ? 'multiply' : 'screen';
    ctx.drawImage(IMG.gkTextura, -730, 0, 1810, 1350);
    ctx.globalAlpha = a; ctx.globalCompositeOperation = op;
  }

  function gkFundo(ctx) {
    ctx.fillStyle = cssGrad(ctx, 154.4523392216068, 0, 0, W, H,
      [[0.084259, 'rgb(0,0,0)'], [0.95185, 'rgb(16,16,16)']]);
    ctx.fillRect(0, 0, W, H);
  }

  /* ---------- sistema B: Archivo Bold ----------
     As seis laminas novas do arquivo formam um segundo sistema dentro da mesma
     marca: Archivo Bold 90 com entrelinha 0,92 e espacamento -5,4, no lugar da
     Instrument Sans 0,87/-8. O destaque tambem muda — laranja nas de foto,
     azul nas claras — e nao ha segundo peso, so cor.

     As caixas de texto do Figma tem 334 de altura para um texto de tres linhas
     que ocupa 248: o texto e centrado numa caixa maior. Por isso os numeros
     abaixo sao vao entre blocos, calculados a partir do centro declarado, e nao
     a posicao da caixa. Deu 36,45 entre perfil e titulo e 42,8 entre titulo e
     apoio em todas as claras — consistente, o que confirma a leitura. */
  var GK_HEAD_MINI = { av: 67.004, nameDx: 78.657, nameDy: 11.652,
                       nameW: 158.770, nameH: 24.761,
                       hDx: 78.657, hDy: 39.326, hW: 101.963, hH: 16.023,
                       bDx: 243.254, bDy: 13.109, bW: 18.935 };

  var GK_LARANJA = '#fd592b', GK_AZUL = '#0459fb';
  function titB(cor, em) {
    return { font: 'Archivo', size: 90, lh: 0.92, ls: -5.4, w: 938,
             weight: 700, color: cor, emColor: em };
  }
  function subB(cor, larg) {
    return { font: 'Inter', size: 40, lh: 1.23, ls: -2, w: larg || 309,
             weight: 400, color: cor };
  }

  function gkFundoClaro(ctx) {
    ctx.fillStyle = cssGrad(ctx, 154.4523392216068, 0, 0, W, H,
      [[0.084259, 'rgb(255,255,255)'], [0.95185, 'rgb(229,229,229)']]);
    ctx.fillRect(0, 0, W, H);
  }

  /* Uma funcao para as seis. O que muda entre elas: o fundo, onde a foto entra,
     e se o bloco nasce no topo ou pendurado pelo pe do titulo. */
  function gkCorpoB(ctx, s, cfg, t) {
    var of = false, metrica = t.headMini ? GK_HEAD_MINI : GK_HEAD;
    var ts = Object.assign({}, t.title), tb, sb, alturaBloco;
    var temSub = !!t.sub;

    for (var p = 0; p < 14; p++) {
      tb = layout(ctx, s.title || '', ts, 'titulo');
      sb = temSub ? layout(ctx, s.sub || '', t.sub, 'sub') : null;
      alturaBloco = metrica.av + t.gapHeadTitle + tb.height +
                    (temSub && s.sub ? t.gapTitleSub + sb.height : 0);
      if (alturaBloco <= H - 150 || !cfg.autofit || ts.size < 44) break;
      ts.size = Math.round(ts.size * 0.94);
      ts.ls = t.title.ls * (ts.size / t.title.size);
    }
    if (alturaBloco > H - 150) of = true, ESTOUROU = 'titulo';

    /* ancoras, antes de desenhar: o degrade depende de onde o titulo comeca */
    var tituloTop = (t.titleBottom != null)
      ? t.titleBottom - tb.height
      : t.topo + metrica.av + t.gapHeadTitle;
    if (tituloTop < 30) tituloTop = 30;
    var headTop = (t.headFixo != null)
      ? t.headFixo
      : tituloTop - t.gapHeadTitle - metrica.av;

    if (t.fundo === 'foto') {
      ctx.fillStyle = baseCapa('#141414'); ctx.fillRect(0, 0, W, H);
      regiao('imagem', 0, 0, W, H);
      if (s.img) drawCover(ctx, s.img, 0, 0, W, H, s);
      shade(ctx, Math.min(t.shadeTop, tituloTop - 40), 2, 'rgba(0,0,0,0)');
    } else if (t.fundo === 'branco') {
      pintaFundo(ctx, function () { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H); });
    } else {
      pintaFundo(ctx, function () { gkFundoClaro(ctx); });
    }
    gkMonograma(ctx, t.monoDy || 0);

    /* foto em area propria, quando o layout reserva uma */
    if (t.img) {
      var r = t.img;
      regiao('imagem', r.x, r.y, r.w, r.h);
      ctx.save();
      if (r.raio) { roundRect(ctx, r.x, r.y, r.w, r.h, r.raio); ctx.clip(); }
      if (s.img) drawCover(ctx, s.img, r.x, r.y, r.w, r.h, s);
      else { ctx.fillStyle = tema() === 'claro' ? '#e4e4e4' : '#242424';
             ctx.fillRect(r.x, r.y, r.w, r.h); }
      ctx.restore();
    }

    gkHeader(ctx, t.headCentro != null ? t.headCentro : t.x, headTop,
             cab(t.cab || 'dark'), metrica);
    paintSolid(ctx, tb, t.centrado ? (W - ts.w) / 2 : t.x, tituloTop, 'titulo');
    if (temSub) {
      paintSolid(ctx, sb, t.x,
                 tituloTop + tb.height + (s.sub ? t.gapTitleSub : 0), 'sub');
    }
    gkTextura(ctx, t.textura || 0.20);
    return of;
  }

  var G = {
    capa: { label: 'Capa', campos: ['title', 'img'],
      shadeTop: 616, minTop: 40,
      /* 1132 e nao os 1125 da caixa do Figma: a caixa de texto de la reporta
         246 de altura para tres linhas que, na entrelinha 0,87, ocupam 261. A
         referencia foi a tinta medida no render do proprio Figma (878..1144),
         nao o retangulo declarado. */
      titleBottom: 1132, headX: 431.84, headY: 1236,
      tagY: 1262.5, tagEsqCx: 137, tagDirCx: 928.5,
      title: { font: 'Instrument Sans', size: 100, lh: 0.87, ls: -8, w: 938,
               weight: 400, color: '#f1f1f1', emColor: '#cab580', altWeight: 500,
               align: 'center' },
      tag: { font: 'Instrument Sans', size: 24, lh: 0.87, ls: -1.68, w: 320,
             weight: 600, color: 'rgba(255,255,255,0.7)', align: 'center' } },
    texto: { label: 'S&oacute; texto', campos: ['title', 'sub'],
      /* 44,1 e nao os 33 que a distancia entre as caixas do Figma sugere: a
         caixa do titulo la reporta 246 e as tres linhas ocupam 234,9, entao
         medir de caixa a caixa deixaria o subtitulo 11px alto. O valor poe a
         caixa do subtitulo exatamente no 536 do arquivo. */
      x: 124, topo: 121, gapHeadTitle: 48.65, gapTitleSub: 44.1,
      title: { font: 'Instrument Sans', size: 90, lh: 0.87, ls: -7.2, w: 831,
               weight: 400, color: '#ededed', emColor: '#cab580', altWeight: 500 },
      sub: { font: 'Inter', size: 40, lh: 1.23, ls: -2, w: 309,
             weight: 400, color: '#cacaca' } },
    imagem: { label: 'Texto + imagem', campos: ['title', 'sub', 'img'],
      /* ancorado pelo pe do titulo, e nao pelo pe do bloco: a caixa de texto
         do Figma reporta 246 para tres linhas que na entrelinha 0,87 ocupam
         261, entao ancorar embaixo subia o cabecalho 20px. 1171 e o valor que
         faz a tinta cair onde ela cai no render do proprio Figma (918..1185). */
      /* 39,75 e nao os 48,65 do arquivo: como a ancora e o pe do titulo e meu
         bloco de tres linhas e 15px mais alto que a caixa declarada, o vao do
         arquivo deixaria o cabecalho 9px alto. Assim as duas pontas — perfil
         em 783 e pe do titulo em 1171 — caem onde o Figma poe. */
      x: 87, titleBottom: 1171, shadeTop: 598, gapHeadTitle: 39.75, gapTitleSub: 43,
      title: { font: 'Instrument Sans', size: 100, lh: 0.87, ls: -8, w: 938,
               weight: 400, color: '#f1f1f1', emColor: '#cab580', altWeight: 500 },
      sub: { font: 'Inter', size: 45, lh: 1.23, ls: -2.25, w: 341,
             weight: 500, color: '#ececec' } }
  };

  /* GESTAO e NEGOCIOS sao chapa fixa da marca, como o nome e a arroba do
     perfil: nao entram como campo editavel nem como subtitulo. */
  function gkRodape(ctx, t) {
    var pinta = function (txt, cx, weight) {
      var spec = Object.assign({}, t.tag, { weight: weight });
      var b = layout(ctx, txt, spec);
      paintSolid(ctx, b, cx - spec.w / 2, t.tagY - b.height / 2);
    };
    pinta('GEST\u00c3O', t.tagEsqCx, 600);
    pinta('NEG\u00d3CIOS', t.tagDirCx, 400);
  }

  function gkCapa(ctx, s, cfg) {
    var t = G.capa, of = false;
    var ts = Object.assign({}, t.title), tb, topo;
    for (var p = 0; p < 14; p++) {
      tb = layout(ctx, s.title || '', ts, 'titulo');
      topo = t.titleBottom - tb.height;
      if (topo >= t.minTop || !cfg.autofit || ts.size < 44) break;
      ts.size = Math.round(ts.size * 0.94); ts.ls = t.title.ls * (ts.size / t.title.size);
    }
    if (topo < t.minTop) of = true, ESTOUROU = 'titulo';

    ctx.fillStyle = baseCapa('#141414'); ctx.fillRect(0, 0, W, H);
    regiao('imagem', 0, 0, W, H);
    /* sem desfoque: o arquivo do Figma traz 3,4px de blur, mas aquilo e do
       mock. A foto que a pessoa sobe tem de sair nitida — quem da leitura a
       manchete e o degrade do pe, nao o borrao. */
    if (s.img) drawCover(ctx, s.img, 0, 0, W, H, s);
    shade(ctx, Math.min(t.shadeTop, topo - 40), 2, 'rgba(0,0,0,0)');
    paintSolid(ctx, tb, (W - ts.w) / 2, topo, 'titulo');
    gkRodape(ctx, t);
    gkHeader(ctx, t.headX, t.headY, cab('dark'), GK_HEAD_CAPA);
    /* na capa o monograma fica ACIMA do texto no arquivo, e desce 41px */
    gkMonograma(ctx, -41);
    gkTextura(ctx, 0.20);
    return of;
  }

  /* texto e imagem tem a mesma pilha — perfil, titulo, subtitulo. O que muda e
     a ancora: so texto nasce no topo, texto+imagem encosta o bloco no pe da
     lamina, sobre a foto. */
  function gkCorpo(ctx, s, cfg, comImagem) {
    var t = comImagem ? G.imagem : G.texto, of = false;
    var ts = Object.assign({}, t.title), ss = Object.assign({}, t.sub), tb, sb, total;
    for (var p = 0; p < 14; p++) {
      tb = layout(ctx, s.title || '', ts, 'titulo');
      sb = layout(ctx, s.sub || '', ss, 'sub');
      total = GK_HEAD.av + t.gapHeadTitle + tb.height + (s.sub ? t.gapTitleSub + sb.height : 0);
      if (total <= H - 160 || !cfg.autofit || ts.size < 44) break;
      ts.size = Math.round(ts.size * 0.94); ts.ls = t.title.ls * (ts.size / t.title.size);
      ss.size = Math.round(ss.size * 0.96);
    }
    if (total > H - 160) of = true, ESTOUROU = 'titulo';

    if (comImagem) {
      ctx.fillStyle = baseCapa('#141414'); ctx.fillRect(0, 0, W, H);
      regiao('imagem', 0, 0, W, H);
      if (s.img) drawCover(ctx, s.img, 0, 0, W, H, s);
    } else {
      pintaFundo(ctx, function () { gkFundo(ctx); });
      /* so texto e o unico em que o monograma fica ATRAS do texto */
      gkMonograma(ctx, 0);
    }

    /* so texto nasce no topo; texto+imagem pendura o bloco pelo pe do titulo,
       entao um titulo mais longo empurra o cabecalho para cima e o subtitulo
       fica onde esta */
    var y = comImagem ? (t.titleBottom - tb.height - t.gapHeadTitle - GK_HEAD.av) : t.topo;
    if (y < 40) y = 40;
    if (comImagem) shade(ctx, Math.min(t.shadeTop, y - 40), 2, 'rgba(0,0,0,0)');
    gkHeader(ctx, t.x, y, cab('dark'));
    y += GK_HEAD.av + t.gapHeadTitle;
    paintSolid(ctx, tb, t.x, y, 'titulo');
    /* mesmo vazio o subtitulo e desenhado, senao o campo some da interface */
    paintSolid(ctx, sb, t.x, y + tb.height + (s.sub ? t.gapTitleSub : 0), 'sub');
    /* ordens do arquivo: no texto+imagem a textura entra antes do monograma e
       com 30% em vez de 20%; no so texto o monograma ja foi, antes do texto */
    if (comImagem) { gkTextura(ctx, 0.30); gkMonograma(ctx, 0); }
    else gkTextura(ctx, 0.20);
    return of;
  }

  /* As seis do arquivo novo. Numeros do Figma, com os vaos calculados a partir
     do centro de cada caixa — ver a nota acima sobre a caixa de 334. */
  var GB = {
    capaB: { label: 'Capa manchete', campos: ['title', 'img'],
      fundo: 'foto', shadeTop: 616, monoDy: -41, centrado: true, headMini: true,
      headCentro: 409, headFixo: 1201, titleBottom: 1129.2,
      gapHeadTitle: 71.8, x: 71, textura: 0.20,
      title: titB('#f1f1f1', GK_LARANJA) },

    fotoB: { label: 'Foto + manchete', campos: ['title', 'sub', 'img'],
      fundo: 'foto', shadeTop: 598, x: 87, titleBottom: 1170.2,
      gapHeadTitle: 51.45, gapTitleSub: 43.8, textura: 0.30,
      title: titB('#f1f1f1', GK_LARANJA), sub: subB('#cacaca', 341) },

    claroTexto: { label: 'Claro &middot; s&oacute; texto', campos: ['title', 'sub'],
      fundo: 'claro', x: 91, topo: 121, cab: 'light',
      gapHeadTitle: 36.45, gapTitleSub: 42.8,
      title: titB('#2b2b2b', GK_AZUL), sub: subB('#4a4a4a') },

    claroFotoMeio: { label: 'Claro &middot; foto no meio', campos: ['title', 'sub', 'img'],
      fundo: 'claro', x: 91, topo: 121, cab: 'light',
      gapHeadTitle: 36.45, gapTitleSub: 42.8,
      img: { x: 91, y: 675, w: 881, h: 578, raio: 37 },
      title: titB('#2b2b2b', GK_AZUL), sub: subB('#4a4a4a') },

    claroFotoBaixo: { label: 'Claro &middot; foto embaixo', campos: ['title', 'sub', 'img'],
      fundo: 'branco', x: 71, topo: 101, cab: 'light',
      gapHeadTitle: 36.45, gapTitleSub: 42.8,
      img: { x: 0, y: 642, w: 1080, h: 708 },
      title: titB('#2b2b2b', GK_AZUL), sub: subB('#4a4a4a') },

    claroFotoTopo: { label: 'Claro &middot; foto em cima', campos: ['title', 'sub', 'img'],
      fundo: 'claro', x: 71, topo: 779, cab: 'light',
      gapHeadTitle: 36.45, gapTitleSub: 42.8,
      img: { x: 0, y: 0, w: 1080, h: 708 },
      title: titB('#2b2b2b', GK_AZUL), sub: subB('#4a4a4a') }
  };
  Object.keys(GB).forEach(function (k) { G[k] = GB[k]; });

  function gkB(chave) {
    return function (ctx, s, cfg) { return gkCorpoB(ctx, s, cfg, G[chave]); };
  }

  function gkTexto(ctx, s, cfg) { return gkCorpo(ctx, s, cfg, false); }
  function gkImagem(ctx, s, cfg) { return gkCorpo(ctx, s, cfg, true); }

  /* =========================================================
     10. Registro de marcas
     ========================================================= */

  /* ---------- motor das telas extras ----------
     Serve as marcas cujas laminas originais tem ancoragem propria: elas
     continuam com a funcao de render de sempre, intocada, e as telas novas
     passam por aqui. A pilha e montada na ordem que o layout pedir. */
  function corpoVar(ctx, s, cfg, m) {
    var t = m.spec[s.type], of = false;
    pintaFundo(ctx, function () { (t.fundo || m.fundo)(ctx); });
    var ts = t.title ? Object.assign({}, t.title) : null;
    var bs = t.body ? Object.assign({}, t.body) : null;
    var noTopo = t.ordem === 'fotoTopo', v = t.vaos;
    var teto = noTopo ? t.img.h + v.imgCab : 0;
    var limite = H - m.folga - teto;
    var tb, bb, pecas, grupo;
    for (var p = 0; p < 14; p++) {
      tb = ts ? layout(ctx, s.title || '', ts, 'titulo') : null;
      bb = bs ? layout(ctx, s.body || '', bs, 'corpo') : null;
      pecas = [];
      if (m.headAv) pecas.push({ o: 'cab', h: m.headAv, v: 0 });
      if (tb) pecas.push({ o: 'tit', h: tb.height, v: m.headAv ? v.cabTit : 0 });
      if (t.ordem === 'fotoMeio') pecas.push({ o: 'img', h: t.img.h, v: v.titImg });
      if (bb) pecas.push({ o: 'cor', h: bb.height,
                           v: t.ordem === 'fotoMeio' ? v.imgCor : (tb ? v.titCor : (m.headAv ? v.cabTit : 0)) });
      if (t.ordem === 'fotoFim') pecas.push({ o: 'img', h: t.img.h, v: v.corImg });
      grupo = 0;
      pecas.forEach(function (q) { grupo += q.v + q.h; });
      if (grupo <= limite || !cfg.autofit) break;
      var pode = (bs && bs.size > 24) || (ts && ts.size > 36);
      if (!pode) break;
      if (bs && bs.size > 24) bs.size = Math.round(bs.size * 0.94);
      if (ts && ts.size > 36) ts.size = Math.round(ts.size * 0.96);
    }
    if (grupo > limite) { of = true; ESTOUROU = bb ? 'corpo' : 'titulo'; }

    if (noTopo) fotoEm(ctx, s, t.img, 0, 0, m.placeholder);
    if (m.antes) m.antes(ctx, t, s);

    var piso = noTopo ? teto : (m.minTop || 50);
    /* idem: o grupo se centra no que sobrou abaixo da foto, a nao ser que o
       cromo da marca esteja amarrado ao texto (o caso da @SunoConsultoria) */
    var y = noTopo
      ? (t.fixo ? teto : teto + Math.max(0, (H - (m.rodape || 60) - teto - grupo) / 2))
      : (H - grupo) / 2 + (t.bias || 0);
    if (y < piso) y = piso;
    if (y + grupo > H - 40) y = Math.max(piso, H - 40 - grupo);

    pecas.forEach(function (q) {
      y += q.v;
      if (q.o === 'cab') m.header(ctx, t.x, y);
      else if (q.o === 'tit') (m.pintaTit || paintSolid)(ctx, tb, t.x, y, 'titulo');
      else if (q.o === 'cor') (m.pintaCor || paintSolid)(ctx, bb, t.bodyX || t.x, y, 'corpo');
      else fotoEm(ctx, s, t.img, t.img.x != null ? t.img.x : m.imgX, y, m.placeholder);
      y += q.h;
    });
    if (m.depois) m.depois(ctx, t, cfg, s);
    return of;
  }

  /* ---------- telas extras por perfil ----------
     Cada variante sai da lamina de imagem da propria marca: mesma fonte, cor,
     margem, cabecalho e fundo. Muda onde a foto entra e se ha corpo. */
  function tituloMaior(base, fator) {
    return Object.assign({}, base, { size: Math.round(base.size * (fator || 1.4)) });
  }

  /* @suno */
  S.fotoTopo = { label: 'Foto em cima', campos: ['title', 'body', 'img'],
    ordem: 'fotoTopo', x: 127,
    title: S.corpoImg.title, body: S.corpoImg.body,
    img: { x: 0, w: W, h: 430, r: 0 },
    vaos: { imgCab: 72, cabTit: 0, titCor: S.corpoImg.gapTitleBody } };
  S.fotoMeio = { label: 'Foto no meio', campos: ['title', 'body', 'img'],
    ordem: 'fotoMeio', x: 127,
    title: S.corpoImg.title, body: S.corpoImg.body,
    img: { x: 130, w: 825, h: 422, r: 27 },
    vaos: { titImg: 52, imgCor: 56 } };
  S.destaque = { label: 'Só a manchete', campos: ['title'], x: 127, bias: -16,
    title: tituloMaior(S.texto.title), vaos: {} };

  var SUM = { spec: S, folga: 160, minTop: 60, imgX: 130, placeholder: '#ececec',
    headAv: 0,
    fundo: function (c) { c.fillStyle = '#ffffff'; c.fillRect(0, 0, W, H); },
    pintaTit: function (c, b, x, y, k) { paintGrad(c, b, x, y, { grad: GRAD_TITLE, emGrad: GRAD_EM }, k); },
    pintaCor: function (c, b, x, y, k) { paintGrad(c, b, x, y, { grad: GRAD_BODY, emGrad: GRAD_EM }, k); } };
  function sunoVar(ctx, s, cfg) { return corpoVar(ctx, s, cfg, SUM); }

  /* @ProfessorBaroni — as laminas de texto da marca nao tem titulo, so corpo */
  B.fotoTopo = { label: 'Foto em cima', campos: ['body', 'img'],
    ordem: 'fotoTopo', x: 156, discX: 153, discY: 1076,
    body: B.corpoImg.body, img: { x: 0, w: W, h: 420, r: 0 },
    vaos: { imgCab: 68, cabTit: B.corpoImg.gapHeadText },
    fundo: function (c) { c.fillStyle = '#050505'; c.fillRect(0, 0, W, H); } };
  B.destaque = { label: 'Frase solta', campos: ['body'], x: 125, discX: 124, discY: 1139,
    body: tituloMaior(B.corpo.body, 1.55), vaos: { cabTit: 52 } };

  var BAM = { spec: B, folga: 200, minTop: 90, rodape: 310, imgX: 0, placeholder: '#15181c',
    headAv: HEAD.av,
    fundo: function (c) { c.fillStyle = '#ffffff'; c.fillRect(0, 0, W, H); },
    header: function (c, x, y) { baroniHeader(c, x, y, cab(BAM._cab || 'light')); },
    antes: function (c, t) { BAM._cab = t.fundo ? 'dark' : 'light'; },
    depois: function (c, t, cfg) { baroniDisc(c, t, cfg); } };
  function baroniVar(ctx, s, cfg) { return corpoVar(ctx, s, cfg, BAM); }

  /* @sunonoticias */
  N.fotoTopo = { label: 'Foto em cima', campos: ['body', 'img'],
    ordem: 'fotoTopo', x: 138,
    body: N.imagem.body, img: { x: 0, w: W, h: 430, r: 0 },
    vaos: { imgCab: 64, cabTit: N.imagem.gapHeadText } };
  N.destaque = { label: 'Frase solta', campos: ['body'], x: 115,
    body: tituloMaior(N.texto.body, 1.5), vaos: { cabTit: 76 } };

  var NOM = { spec: N, folga: 150, minTop: 60, imgX: 0, placeholder: '#e2e2e2',
    headAv: SN_HEAD.av,
    fundo: function (c) { snPapel(c); },
    header: function (c, x, y) { snHeader(c, x, y, cab('light')); } };
  function snVar(ctx, s, cfg) { return corpoVar(ctx, s, cfg, NOM); }

  /* @fundsexplorer */
  F.fotoTopo = { label: 'Foto em cima', campos: ['body', 'img'],
    ordem: 'fotoTopo', x: 95, k: 0.93947,
    body: F.imagem.body, img: { x: 0, w: W, h: 430, r: 0 },
    vaos: { imgCab: 60, cabTit: F.imagem.gap } };
  F.destaque = { label: 'Frase solta', campos: ['body'], x: 117, k: 1,
    body: tituloMaior(F.texto.body, 1.5), vaos: { cabTit: 46 } };

  var FEM = { spec: F, folga: 130, minTop: 50, imgX: 0, placeholder: '#e2e2e2',
    headAv: FE_HEAD.av,
    fundo: function (c) { feFundo(c); },
    header: function (c, x, y) { feHeader(c, x, y, cab('light'), FEM._k || 1); } };
  function feVar(ctx, s, cfg) {
    FEM._k = (F[s.type] || {}).k || 1;
    FEM.headAv = FE_HEAD.av * FEM._k;
    return corpoVar(ctx, s, cfg, FEM);
  }

  /* @SunoConsultoria — a lamina de imagem da marca ja tem a foto no meio,
     entao aqui as extras sao a foto em cima e a foto no fim */
  /* a seta vermelha e cromo fixo da marca, em x 920..980. As telas novas tem a
     coluna estreitada para 790 para nao cruzar com ela — no arquivo do Figma
     quem garantia isso era o comprimento do texto de exemplo. */
  var CO_W = 790;
  function coEstreito(f, fator) {
    return Object.assign({}, f, { w: CO_W, size: Math.round(f.size * (fator || 1)) });
  }
  C.fotoTopo = { label: 'Foto em cima', campos: ['numero', 'title', 'body', 'img'],
    ordem: 'fotoTopo', x: 85,
    badge: { x: 84, y: 500, d: 80 }, logo: { x: 190, y: 521, w: 109, h: 44 },
    arrow: { x: 920, y: 648, s: 60 },
    title: coEstreito(C.imagem.title), body: coEstreito(C.imagem.body),
    img: { x: 0, w: W, h: 430, r: 0 }, fixo: true,
    vaos: { imgCab: 176, cabTit: 0, titCor: 48 } };
  C.fotoFim = { label: 'Foto embaixo', campos: ['numero', 'title', 'body', 'img'],
    ordem: 'fotoFim', x: 85,
    badge: { x: 84, y: 71, d: 80 }, logo: { x: 190, y: 92, w: 109, h: 44 },
    arrow: { x: 920, y: 648, s: 60 },
    title: coEstreito(C.imagem.title), body: coEstreito(C.imagem.body),
    img: { x: 85, w: 705, h: 328, r: 22 },
    vaos: { cabTit: 0, titCor: 44, corImg: 54 }, bias: 66 };
  C.destaque = { label: 'Só a manchete', campos: ['numero', 'title'], x: 101,
    badge: { x: 100, y: 303, d: 80 }, logo: { x: 206, y: 324, w: 109, h: 44 },
    arrow: { x: 920, y: 648, s: 60 },
    title: coEstreito(C.texto.title, 1.4), vaos: {} };

  var COM = { spec: C, folga: 200, minTop: 240, imgX: 85, placeholder: '#e2e2e2',
    headAv: 0,
    fundo: function (c) { c.fillStyle = '#f7f7f7'; c.fillRect(0, 0, W, H); },
    antes: function (c, t, s) {
      coBadge(c, t.badge, s.numero);
      c.drawImage(IMG.coLogoRed, t.logo.x, t.logo.y, t.logo.w, t.logo.h);
      coArrow(c, t.arrow);
    } };
  function coVar(ctx, s, cfg) { return corpoVar(ctx, s, cfg, COM); }

  var MARCAS = {
    baroni: { nome: 'Professor Baroni', arroba: '@ProfessorBaroni', cor: '#3fbf68', disclaimer: true, topAlign: true,
      dica: '<kbd>**negrito**</kbd> <kbd>__sublinhado__</kbd>',
      tipos: { capa: B.capa, corpo: B.corpo, corpoImg: B.corpoImg,
               fotoTopo: B.fotoTopo, destaque: B.destaque },
      render: { capa: baroniCapa, corpo: baroniCorpo, corpoImg: baroniCorpoImg,
                fotoTopo: baroniVar, destaque: baroniVar } },
    suno: { nome: 'Suno', arroba: '@suno', cor: '#ff2020', disclaimer: false, topAlign: false,
      dica: '<kbd>**destaque**</kbd> pinta o trecho em vermelho',
      tipos: { capa: S.capa, corpoImg: S.corpoImg, texto: S.texto,
               fotoTopo: S.fotoTopo, fotoMeio: S.fotoMeio, destaque: S.destaque },
      render: { capa: sunoCapa, corpoImg: sunoCorpoImg, texto: sunoTexto,
                fotoTopo: sunoVar, fotoMeio: sunoVar, destaque: sunoVar } },
    tiago: { nome: 'Tiago Reis', arroba: '@tiagogreis', cor: '#42aff3', disclaimer: false, topAlign: false,
      dica: '<kbd>**destaque**</kbd> fica azul no t&iacute;tulo e negrito no texto',
      tipos: { capa: T.capa, texto: T.texto, foto: T.foto,
               fotoTopo: T.fotoTopo, fotoMeio: T.fotoMeio, destaque: T.destaque },
      render: { capa: trCapa, texto: trCorpo, foto: trCorpo,
                fotoTopo: trCorpo, fotoMeio: trCorpo, destaque: trCorpo } },
    noticias: { nome: 'Suno Not&iacute;cias', arroba: '@sunonoticias', cor: '#c9c2b4', disclaimer: false, topAlign: false,
      dica: '<kbd>**destaque**</kbd> deixa o trecho em negrito',
      tipos: { capa: N.capa, texto: N.texto, imagem: N.imagem,
               fotoTopo: N.fotoTopo, destaque: N.destaque },
      render: { capa: snCapa, texto: snTexto, imagem: snImagem,
                fotoTopo: snVar, destaque: snVar } },
    consultoria: { nome: 'Suno Consultoria', arroba: '@SunoConsultoria', cor: '#d42126', disclaimer: false, topAlign: false,
      dica: '<kbd>**destaque**</kbd> fica vermelho na capa e negrito no texto',
      tipos: { capa: C.capa, texto: C.texto, imagem: C.imagem,
               fotoTopo: C.fotoTopo, fotoFim: C.fotoFim, destaque: C.destaque },
      render: { capa: coCapa, texto: coTexto, imagem: coImagem,
                fotoTopo: coVar, fotoFim: coVar, destaque: coVar } },
    funds: { nome: 'Funds Explorer', arroba: '@fundsexplorer', cor: '#00c0f5', disclaimer: false, topAlign: false,
      dica: '<kbd>**destaque**</kbd> fica azul na capa e negrito no texto &middot; <kbd>__sublinhado__</kbd>',
      tipos: { capa: F.capa, texto: F.texto, imagem: F.imagem,
               fotoTopo: F.fotoTopo, destaque: F.destaque },
      render: { capa: feCapa, texto: feTexto, imagem: feImagem,
                fotoTopo: feVar, destaque: feVar } },
    danielle: { nome: 'Danielle Lopes', arroba: '@daniellelopesn', cor: '#289aff',
      disclaimer: false, topAlign: false,
      dica: '<kbd>**destaque**</kbd> deixa o trecho em negrito no texto',
      tipos: { capa: D.capa, texto: D.texto, imagem: D.imagem,
               fotoTopo: D.fotoTopo, fotoMeio: D.fotoMeio, destaque: D.destaque },
      render: { capa: dnCapa, texto: dnCorpo, imagem: dnCorpo,
                fotoTopo: dnCorpo, fotoMeio: dnCorpo, destaque: dnCorpo } },
    gian: { nome: 'Gian Kojikovski', arroba: '@giankojikovski', cor: '#cab580',
      disclaimer: false, topAlign: false,
      dica: '<kbd>**dourado**</kbd> pinta o trecho &middot; <kbd>__grosso__</kbd> engrossa',
      tipos: { capa: G.capa, texto: G.texto, imagem: G.imagem,
               capaB: G.capaB, fotoB: G.fotoB, claroTexto: G.claroTexto,
               claroFotoTopo: G.claroFotoTopo, claroFotoBaixo: G.claroFotoBaixo,
               claroFotoMeio: G.claroFotoMeio },
      render: { capa: gkCapa, texto: gkTexto, imagem: gkImagem,
                capaB: gkB('capaB'), fotoB: gkB('fotoB'),
                claroTexto: gkB('claroTexto'), claroFotoTopo: gkB('claroFotoTopo'),
                claroFotoBaixo: gkB('claroFotoBaixo'),
                claroFotoMeio: gkB('claroFotoMeio') } },
    status: { nome: 'Status Invest', arroba: '@status.invest', cor: '#00ab93',
      disclaimer: false, topAlign: false,
      dica: '<kbd>**destaque**</kbd> fica verde no t&iacute;tulo e escuro no texto',
      tipos: { capa: ST.capa, texto: ST.texto, imagem: ST.imagem,
               fotoTopo: ST.fotoTopo, fotoMeio: ST.fotoMeio, destaque: ST.destaque },
      render: { capa: stCapa, texto: stCorpo, imagem: stCorpo,
                fotoTopo: stCorpo, fotoMeio: stCorpo, destaque: stCorpo } }
  };

  function render(canvas, marca, s, cfg) {
    var ctx = canvas.getContext('2d');
    canvas.width = W; canvas.height = H;
    ctx.clearRect(0, 0, W, H); ctx.textAlign = 'left';
    GUIAS = cfg.guias !== false;
    AJUSTES = s;
    TEMA = s && s.tema ? s.tema : null;
    TEMA_MARCA = marca; TEMA_TIPO = s ? s.type : null;
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
             fonte: {}, larg: {}, semDisc: false, tema: null };
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
  function celular() {
    return window.matchMedia && window.matchMedia('(max-width:760px)').matches;
  }
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
    /* no celular so a lamina em foco aparece; dividir a largura por tres
       deixaria a arte pequena a toa */
    var vizinhas = !celular();
    var porLarg = ((p.clientWidth - (vizinhas ? 108 : 20)) / (vizinhas ? 2.48 : 1)) / 0.8;
    var altF = Math.max(200, Math.min(porAlt, porLarg, 620));
    (vizinhas ? [foco - 1, foco, foco + 1] : [foco]).forEach(function (i) {
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


  /* ---------- coluna de modelos ----------
     Menu de texto nao serve para escolher layout: "Claro - foto no meio" nao
     diz nada a quem monta carrossel. Aqui a pessoa ve a tela desenhada, com o
     proprio texto dela dentro. Clicar troca o layout da lamina em foco (era o
     que o menu suspenso fazia); arrastar ate o palco soma uma lamina nova no
     ponto onde soltar. */
  var EXEMPLO = { title: 'Assim fica a manchete nesta tela',
                  sub: 'E o texto de apoio',
                  body: 'Assim fica o corpo do texto nesta tela, com algumas linhas para dar ideia do espaco.' };

  /* a amostra usa o conteudo da lamina em foco: a pergunta de quem escolhe nao
     e "como e esse layout" e sim "como o MEU texto fica nele" */
  function amostraDe(tipo) {
    var lam = blank(tipo); lam.type = tipo;
    var base = slides[foco] || {};
    camposDoTipo(marca, tipo).forEach(function (c) {
      var v = base[c];
      lam[c] = (v && String(v).trim()) ? v : (EXEMPLO[c] || '');
    });
    if ((tipos()[tipo].campos || []).indexOf('numero') >= 0) lam.numero = base.numero || '01';
    if (base.img) {
      lam.img = base.img; lam.zoom = base.zoom; lam.fx = base.fx; lam.fy = base.fy;
    }
    return lam;
  }

  function desenhaModelos() {
    var el = $('mlista'); if (!el) return;
    el.innerHTML = '';
    var t = tipos(), minis = [];
    Object.keys(t).forEach(function (k) {
      var b = document.createElement('button');
      b.className = 'modelo'; b.dataset.tipo = k;
      b.dataset.atual = (slides[foco] && slides[foco].type === k) ? '1' : '0';
      b.title = 'Clique para trocar o layout, ou arraste at\u00e9 a tela';
      var cx = document.createElement('div'); cx.className = 'mini';
      var cv = document.createElement('canvas');
      render(cv, marca, amostraDe(k), cfg());
      cx.appendChild(cv); b.appendChild(cx); minis.push(cx);
      var r = document.createElement('div'); r.className = 'mrot';
      r.textContent = labelDe(k);
      b.appendChild(r);
      el.appendChild(b);
    });
    /* a coluna e fluida: a escala so da para ser medida com a grade ja no ar */
    minis.forEach(function (cx) {
      cx.firstChild.style.transform = 'scale(' + (cx.clientWidth / W) + ')';
    });
    ligaArrasto();
  }

  /* clique: troca o layout da lamina em foco. Sem lamina nenhuma, cria a primeira */
  function usaModelo(tipo) {
    if (!slides.length) { slides.push(blank(tipo)); foco = 0; sel = null; pinta(); return; }
    if (slides[foco].type === tipo) return;
    marcaVersao('antes de trocar o layout');
    slides[foco].type = tipo; sel = null; pinta();
  }

  function insereModelo(tipo, onde) {
    if (slides.length >= 20) { toast('O limite \u00e9 20 l\u00e2minas.'); return; }
    marcaVersao('antes de somar lamina');
    var i = (onde == null) ? foco + 1 : onde;
    if (i < 0) i = 0; if (i > slides.length) i = slides.length;
    slides.splice(i, 0, blank(tipo));
    foco = i; sel = null; pinta();
    toast(txtDe(labelDe(tipo)) + ' somada como l\u00e2mina ' + pad(i + 1) + '.');
  }

  /* ---------- arrastar o modelo ate a tela ----------
     Com ponteiro em vez do arrasto nativo do HTML: o nativo nao existe em
     tela de toque, e aqui o carrossel tambem e montado no celular. */
  var arr = null;

  /* onde entra a lamina nova, comparando o x do ponteiro com o meio de cada
     peca ja desenhada. No palco as pecas sao .lam (que trazem o indice real);
     na esteira sao .quadro, em ordem. */
  function alvoEm(caixa) {
    var pecas = caixa.querySelectorAll('.lam, .quadro');
    for (var i = 0; i < pecas.length; i++) {
      var r = pecas[i].getBoundingClientRect(), n = +pecas[i].dataset.i;
      if (arr.x < r.left + r.width / 2) return { i: n, antes: pecas[i] };
    }
    if (!pecas.length) return { i: slides.length, antes: null };
    var ult = +pecas[pecas.length - 1].dataset.i;
    return { i: ult + 1, antes: caixa.querySelector('#add') };
  }
  function limpaAlvo() {
    ['palco', 'esteira'].forEach(function (k) {
      var c = $(k); if (!c) return;
      c.dataset.solto = '0';
      var m = c.querySelector('.marca-solta'); if (m) m.remove();
    });
  }
  function caixaSob(x, y) {
    var c = [$('palco'), $('esteira')];
    for (var i = 0; i < c.length; i++) {
      if (!c[i]) continue;
      var r = c[i].getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return c[i];
    }
    return null;
  }

  function ligaArrasto() {
    var lista = $('mlista');
    if (!lista || lista.dataset.pronto === '1') return;
    lista.dataset.pronto = '1';

    lista.addEventListener('pointerdown', function (ev) {
      var b = ev.target.closest('.modelo');
      if (!b || ev.button > 0) return;
      arr = { tipo: b.dataset.tipo, x0: ev.clientX, y0: ev.clientY,
              x: ev.clientX, alvo: b, vale: false, idx: null };
      try { b.setPointerCapture(ev.pointerId); } catch (e) {}
    });

    lista.addEventListener('pointermove', function (ev) {
      if (!arr) return;
      arr.x = ev.clientX;
      if (!arr.vale) {
        if (Math.abs(ev.clientX - arr.x0) + Math.abs(ev.clientY - arr.y0) < 8) return;
        arr.vale = true;
        var g = arr.alvo.querySelector('.mini').cloneNode(true);
        g.className = 'fantasma';
        document.body.appendChild(g); arr.ghost = g;
        document.body.classList.add('arrastando');
      }
      arr.ghost.style.left = (ev.clientX - 26) + 'px';
      arr.ghost.style.top = (ev.clientY - 32) + 'px';
      limpaAlvo();
      var caixa = caixaSob(ev.clientX, ev.clientY);
      if (!caixa) { arr.idx = null; return; }
      var a = alvoEm(caixa);
      arr.idx = a.i;
      caixa.dataset.solto = '1';
      var m = document.createElement('div'); m.className = 'marca-solta';
      caixa.insertBefore(m, a.antes);
    });

    lista.addEventListener('pointerup', function (ev) {
      if (!arr) return;
      var a = arr; arr = null;
      if (a.ghost) a.ghost.remove();
      document.body.classList.remove('arrastando');
      limpaAlvo();
      if (!a.vale) return;                 /* nao arrastou: o clique resolve */
      a.alvo.dataset.soltou = '1';         /* segura o clique que vem depois */
      setTimeout(function () { delete a.alvo.dataset.soltou; }, 0);
      if (a.idx != null) insereModelo(a.tipo, a.idx);
    });

    lista.addEventListener('pointercancel', function () {
      if (arr && arr.ghost) arr.ghost.remove();
      arr = null; document.body.classList.remove('arrastando'); limpaAlvo();
    });
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

    h.push('<div><div class="rot mono">LAYOUT</div><div class="mlista" id="mlista"></div>' +
      '<div class="mdica">Clique para trocar o layout desta l\u00e2mina. ' +
      'Arraste at\u00e9 a tela para somar uma nova.</div></div>');

    var tm = lam.tema || '';
    h.push('<div><div class="rot mono">FUNDO DESTA LÂMINA</div><div class="segmento">' +
      '<button class="seg' + (tm === '' ? ' on' : '') + '" data-tema="">Do layout</button>' +
      '<button class="seg' + (tm === 'escuro' ? ' on' : '') + '" data-tema="escuro">Escuro</button>' +
      '<button class="seg' + (tm === 'claro' ? ' on' : '') + '" data-tema="claro">Claro</button>' +
      '</div></div>');

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
    desenhaModelos();
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
    if (marca === 'suno' || marca === 'tiago' || marca === 'consultoria' ||
        marca === 'danielle' || marca === 'status') {
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
    var mod = ev.target.closest('.modelo');
    if (mod) { if (!mod.dataset.soltou) usaModelo(mod.dataset.tipo); return; }
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
    var bt = ev.target.closest('[data-tema]');
    if (bt) {
      slides[foco].tema = bt.dataset.tema || null;
      pinta(); return;
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
    clearTimeout(reTempo); reTempo = setTimeout(function () { pinta(); }, 120);
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
    if (v === 'ideias') carregaPautas(false);
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
               semDisc: !!l.semDisc, tema: l.tema || null,
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
                   semDisc: !!l.semDisc || velhoSemDisc, tema: l.tema || null,
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

  /* ---------- gaveta do menu no celular ---------- */
  function gaveta(abrirGaveta) {
    lateral.dataset.aberta = abrirGaveta ? '1' : '0';
    $('veu-menu').hidden = !abrirGaveta;
    $('abre-menu').setAttribute('aria-expanded', abrirGaveta ? 'true' : 'false');
  }
  $('abre-menu').addEventListener('click', function () {
    gaveta(lateral.dataset.aberta !== '1');
  });
  $('veu-menu').addEventListener('click', function () { gaveta(false); });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && lateral.dataset.aberta === '1') gaveta(false);
  });

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
                l.zoom, l.fx, l.fy, l.img ? 1 : 0, ajusteStr(l), l.semDisc ? 1 : 0,
                l.tema || ''].join('\u0001');
      })]);
  }
  /* so o que muda a miniatura da biblioteca: a primeira lamina */
  function assinaturaCapa() {
    var l = slides[0];
    if (!l) return '';
    return JSON.stringify([marca, opts.disc, opts.discOn, opts.autofit, opts.topAlign,
      l.type, l.title, l.sub, l.body, l.numero, l.imgName, l.zoom, l.fx, l.fy,
      l.img ? 1 : 0, ajusteStr(l), l.semDisc ? 1 : 0, l.tema || '']);
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
                     imgName: l.imgName, semDisc: !!l.semDisc, tema: l.tema || null,
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
                   semDisc: !!l.semDisc || velhoSemDisc, tema: l.tema || null,
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
    if (it) { abrir(it.dataset.view); gaveta(false); return; }
    if (ev.target.closest('#ir-home')) { abrir('home'); gaveta(false); return; }
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
        if (r.status === 423) throw new Error('pausado');
        if (r.status === 402) throw new Error('saldo');
        if (r.status === 529) throw new Error('congestionado');
        if (r.status === 429) throw new Error('fila');
        if (r.status === 422) throw new Error('recusado');
        if (r.status === 503) throw new Error('semchave');
        if (!r.ok) throw new Error('http ' + r.status);
        return r.json();
      }, function () { throw new Error('rede'); });
  }

  function geraCarrossel(frase, forcada) {
    var m = forcada || marcaDaFrase(frase) || marca;
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
    /* o modo manual pode ter ficado aberto por uma tentativa anterior que
       falhou: sem isso o carrossel novo nasce atras da cortina */
    var cm = $('cortina-manual'); if (cm) cm.hidden = true;
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
     Sem chave, ou com chave sem saldo, a pessoa faz o papel do transporte: leva o
     pedido ao modelo e traz a resposta. Tudo o mais e o caminho de verdade —
     inclusive o texto do pedido, que e montado pela mesma funcao do servidor,
     e nao por uma copia aqui que sairia do lugar na primeira mudanca. */
  var manualFrase = '', manualMarca = null;

  function abreManual(frase, forcada) {
    var m = forcada || marcaDaFrase(frase) || marca;
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
    pausado:   'A escrita automática está pausada. O gerador de carrossel continua inteiro, e dá para montar a copy por fora sem gastar nada.',
    semchave:  'O servidor está no ar, mas sem chave configurada. Quem cuida do ambiente precisa definir a chave.',
    fila:      'O fornecedor recusou por limite de uso. Na camada gratuita há um teto por minuto e outro por dia: se for o do minuto, passa em instantes; se for o do dia, só amanhã. Dá para montar por fora enquanto isso.',
    congestionado: 'O modelo gratuito está congestionado agora — já tentei algumas vezes. Isso costuma passar em alguns minutos. Enquanto isso, dá para montar por fora sem gastar nada.',
    saldo:     'A chave é válida, mas a conta do fornecedor está sem saldo ou no teto de gasto. Isso não passa esperando: precisa de crédito ou de limite maior no painel do fornecedor.',
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

  /* A barra pergunta ao servidor se a escrita esta ligada. Sem isso ela
     aceita o pedido, espera meio minuto e so entao conta que estava pausada —
     e quem digitou perde o tempo e a frase. */
  function conferePausa() {
    if (!forma) return;
    fetch(ENDPOINT, { headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { if (d && d.geracao === false) bloqueiaBarra(); },
            function () {});
  }

  function bloqueiaBarra() {
    var campo = $('prompt'); if (!campo || !forma) return;
    forma.dataset.pausada = '1';
    campo.disabled = true;
    campo.placeholder = 'Escrita automática pausada';
    var b = forma.querySelector('button[type="submit"]');
    if (b) b.disabled = true;
    nota(RECADO.pausado, false);
  }

  var forma = $('forma-prompt');
  if (forma) forma.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (forma.dataset.estado === 'indo' || forma.dataset.pausada === '1') return;
    var frase = $('prompt').value.trim();
    if (frase.length < 10) {
      nota('Diga o perfil e o assunto — algo como “um carrossel para o Baroni sobre carteira diversificada de FIIs”.', true);
      return;
    }
    /* pauta escolhida na aba de ideias ja traz o perfil: adivinhar pelo
       titulo erraria, porque manchete de FII cita "Suno" o tempo todo */
    var forcada = forma.dataset.marca || null;
    forma.dataset.marca = '';
    forma.dataset.estado = 'indo';
    $('prompt').disabled = true;
    nota('Escrevendo a copy e montando as lâminas…', false);
    var solta = function () { forma.dataset.estado = ''; $('prompt').disabled = false; };
    /* o Promise.resolve nao e enfeite: sem ele um erro sincrono — medir a
       caixa, montar o contrato — escapa do par de handlers e a barra fica
       travada em "escrevendo" sem jeito de voltar */
    Promise.resolve().then(function () { return geraCarrossel(frase, forcada); })
      .then(function (r) {
        solta();
        if (!aplicaGeracao(r.marca, r.laminas)) { nota(RECADO.vazio, true); return; }
        $('prompt').value = '';
        notaPadrao();
        toast(nLaminas(slides.length) + ' geradas em ' + txtDe(MARCAS[r.marca].arroba) + '.');
      }, function (e) {
        solta();
        if (e && e.message === 'acesso') { pedeSenha(frase); return; }
        if (e && (e.message === 'semchave' || e.message === 'desligado'
                  || e.message === 'saldo' || e.message === 'congestionado'
                  || e.message === 'fila' || e.message === 'pausado')) {
          nota(RECADO[e.message], true);
          if (e.message === 'pausado' || e.message === 'desligado') bloqueiaBarra();
          abreManual(frase, forcada);
          return;
        }
        nota(RECADO[e && e.message] || 'Não consegui gerar agora. Tente de novo.', true);
      });
  });


  /* =========================================================
     15. GERADOR DE IDEIAS
     As pautas sao lidas dos feeds pelo servidor (o navegador nao alcanca
     dominio de fora: a CSP so libera 'self') e chegam prontas: titulo, fonte,
     hora e link. Nada aqui e escrito por modelo — o que aparece na tela saiu
     do feed do veiculo e leva o link para conferir. Numa casa que fala de
     investimento, manchete sem origem nao serve.
     ========================================================= */
  var PAUTAS_ENDPOINT = '/api/pautas';
  var pautas = null, escoposPauta = {}, horaPautas = 0, perfilPauta = 'suno', estadoPautas = '';
  var VALIDADE_PAUTAS = 10 * 60 * 1000;

  function haQuanto(ts) {
    if (!ts) return '';
    /* o feed do Valor marca a hora adiantada; data no futuro vira "agora"
       em vez de "ha -3 h", que seria so exibir o defeito deles */
    var min = Math.max(0, (Date.now() / 1000 - ts) / 60);
    if (min < 60) return 'há ' + Math.max(1, Math.round(min)) + ' min';
    if (min < 1440) return 'há ' + Math.round(min / 60) + ' h';
    var d = Math.round(min / 1440);
    return d === 1 ? 'ontem' : 'há ' + d + ' dias';
  }

  function carregaPautas(forcar) {
    if (estadoPautas === 'indo') return;
    if (!forcar && pautas && Date.now() - horaPautas < VALIDADE_PAUTAS) {
      pintaPautas(); return;
    }
    /* no arquivo solto nao ha servidor nenhum para chamar: falar em conexao
       ali seria mandar a pessoa conferir o wi-fi por um problema que nao e esse */
    if (location.protocol === 'file:') { estadoPautas = 'solto'; pintaPautas(); return; }
    estadoPautas = 'indo';
    pintaPautas();
    fetch(PAUTAS_ENDPOINT, { headers: { 'Accept': 'application/json' } })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status === 404 ? 'desligado' : 'http');
        return r.json();
      })
      .then(function (d) {
        pautas = (d && d.pautas) || {};
        escoposPauta = (d && d.escopos) || {};
        horaPautas = Date.now();
        estadoPautas = (d && d.aviso) ? 'fontes' : 'ok';
        pintaPautas();
      }, function (e) {
        estadoPautas = (e && e.message === 'desligado') ? 'desligado' : 'rede';
        pintaPautas();
      });
  }

  function pintaChips() {
    var caixa = $('perfis-pauta'); if (!caixa) return;
    if (caixa.dataset.pronto === '1') { marcaChip(); return; }
    var html = '';
    Object.keys(MARCAS).forEach(function (m) {
      var n = pautas && pautas[m] ? pautas[m].length : 0;
      html += '<button class="chip-perfil" data-perfil="' + m + '" aria-pressed="false">' +
        '<i style="background:' + (MARCAS[m].cor || '#7e848b') + '"></i>' +
        '<span>' + txtDe(MARCAS[m].arroba || MARCAS[m].nome) + '</span>' +
        '<b data-n="' + m + '">' + (n || '') + '</b></button>';
    });
    caixa.innerHTML = html;
    caixa.dataset.pronto = '1';
    marcaChip();
  }

  function marcaChip() {
    var caixa = $('perfis-pauta'); if (!caixa) return;
    caixa.querySelectorAll('.chip-perfil').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.perfil === perfilPauta ? 'true' : 'false');
      var n = pautas && pautas[b.dataset.perfil] ? pautas[b.dataset.perfil].length : 0;
      var alvo = b.querySelector('b');
      if (alvo) alvo.textContent = n ? String(n) : '';
    });
  }

  function recadoPautas(txt) {
    var lista = $('lista-pautas'); if (!lista) return;
    lista.innerHTML = '';
    var d = document.createElement('div');
    d.className = 'vazio-pautas';
    d.textContent = txt;
    lista.appendChild(d);
  }

  function pintaPautas() {
    var lista = $('lista-pautas'), rodape = $('rodape-pautas');
    if (!lista) return;
    pintaChips();
    if (rodape) rodape.textContent = '';

    if (estadoPautas === 'indo' && !pautas) { recadoPautas('Lendo as fontes…'); return; }
    if (estadoPautas === 'solto') {
      recadoPautas('Esta c\u00f3pia \u00e9 o arquivo solto, aberto direto do computador, e ' +
        'sem servidor n\u00e3o d\u00e1 para ler os feeds. As pautas aparecem na vers\u00e3o ' +
        'publicada; o gerador de carrossel funciona normalmente aqui.');
      return;
    }
    if (estadoPautas === 'desligado') {
      recadoPautas('A leitura de pautas ainda não está ligada neste endereço. ' +
        'Ela roda no servidor, porque o navegador não pode buscar feed de outro domínio daqui.');
      return;
    }
    if (estadoPautas === 'rede') {
      recadoPautas('Não consegui falar com o servidor para buscar as pautas. ' +
        'Verifique a conexão e tente de novo.');
      return;
    }
    if (estadoPautas === 'fontes') {
      recadoPautas('Nenhuma fonte respondeu agora. Pode ser instabilidade nos feeds — ' +
        'tente daqui a pouco.');
      return;
    }

    /* limpa sempre, antes de qualquer coisa: deixar isso dentro de um if faz
       a lista duplicar no caminho em que o if nao entra */
    lista.innerHTML = '';

    /* o escopo do perfil na tela: sem ele a lista parece arbitraria, e quem
       usa nao tem como saber por que aquela pauta entrou e a outra nao */
    var esc = escoposPauta[perfilPauta];
    if (esc) {
      var lin = document.createElement('p');
      lin.className = 'escopo-perfil';
      lin.textContent = esc;
      lista.appendChild(lin);
    }

    var itens = (pautas && pautas[perfilPauta]) || [];
    if (!itens.length) {
      recadoPautas('Nada casou com o assunto deste perfil nas fontes de hoje. ' +
        'Os outros perfis podem ter pauta — e o gerador continua aceitando tema escrito à mão.');
      return;
    }

    /* titulo e link vem de site de fora: entram como texto, nunca como HTML */
    itens.forEach(function (it, i) {
      var art = document.createElement('article');
      art.className = 'pauta';

      var h = document.createElement('h3');
      h.textContent = it.titulo;
      art.appendChild(h);

      var de = document.createElement('p');
      de.className = 'de';

      var selo = document.createElement('span');
      selo.className = 'selo-pauta';
      /* assunto que varios veiculos cobriram hoje: e o unico sinal de "esta
         se falando disso agora" que da para ler de um feed */
      if (it.quente) {
        selo.dataset.tipo = 'quente';
        selo.textContent = 'quente \u00b7 ' + it.veiculos + ' ve\u00edculos';
      } else {
        selo.dataset.tipo = it.tipo || 'dia';
        selo.textContent = it.tipo === 'atemporal' ? 'tema atemporal' : 'do dia';
      }
      de.appendChild(selo);

      var fonte = document.createElement('span');
      fonte.textContent = it.fonte;
      de.appendChild(fonte);

      var quando = haQuanto(it.quando);
      if (quando && it.tipo !== 'atemporal') {
        var pt = document.createElement('span'); pt.className = 'pt'; pt.textContent = '·';
        var q = document.createElement('span'); q.textContent = quando;
        de.appendChild(pt); de.appendChild(q);
      }

      if (/^https?:\/\//i.test(it.link || '')) {
        var pt2 = document.createElement('span'); pt2.className = 'pt'; pt2.textContent = '·';
        var a = document.createElement('a');
        a.href = it.link; a.target = '_blank'; a.rel = 'noopener noreferrer';
        a.textContent = 'ler a matéria';
        de.appendChild(pt2); de.appendChild(a);
      }
      art.appendChild(de);

      /* as outras materias do mesmo assunto: e nelas que costuma estar o
         angulo de mercado por tras do gancho */
      if (it.ligadas && it.ligadas.length) {
        var mais = document.createElement('ul');
        mais.className = 'ligadas';
        it.ligadas.forEach(function (r) {
          var li = document.createElement('li');
          var v = document.createElement('span');
          v.className = 'v'; v.textContent = r.fonte;
          li.appendChild(v);
          if (/^https?:\/\//i.test(r.link || '')) {
            var a = document.createElement('a');
            a.href = r.link; a.target = '_blank'; a.rel = 'noopener noreferrer';
            a.textContent = r.titulo;
            li.appendChild(a);
          } else {
            var t = document.createElement('span');
            t.textContent = r.titulo;
            li.appendChild(t);
          }
          mais.appendChild(li);
        });
        art.appendChild(mais);
      }

      var acoes = document.createElement('div');
      acoes.className = 'acoes-pauta';
      var b = document.createElement('button');
      b.className = 'usar';
      b.dataset.pauta = String(i);
      b.textContent = 'Criar carrossel';
      acoes.appendChild(b);
      art.appendChild(acoes);

      lista.appendChild(art);
    });

    if (rodape) {
      rodape.textContent = 'Manchetes dos próprios veículos, sem resumo nosso. ' +
        'Confira a matéria antes de publicar: número e data saem da fonte, ' +
        'e recomendação de terceiro não vira recomendação da Suno.';
    }
  }


  /* A pauta abre o gerador com o perfil escolhido e o titulo na capa. O resto
     e de quem escreve: a ferramenta poe a pessoa no lugar certo com o assunto
     na mao, nao tenta adivinhar o carrossel inteiro. */
  function usaPauta(i) {
    var itens = (pautas && pautas[perfilPauta]) || [];
    var it = itens[i]; if (!it) return;
    var m = perfilPauta;
    var tCapa = Object.keys(MARCAS[m].tipos)[0];
    var campos = camposDoTipo(m, tCapa);
    var capa = { type: tCapa };
    capa[campos.indexOf('title') >= 0 ? 'title' : campos[0]] = it.titulo;
    if (!aplicaGeracao(m, [capa])) { toast('Não consegui abrir o gerador.'); return; }
    toast('Capa pronta em ' + txtDe(MARCAS[m].arroba) + '. Escreva o resto.');
  }

  var paginaIdeias = document.querySelector('.view[data-view="ideias"]');
  if (paginaIdeias) paginaIdeias.addEventListener('click', function (ev) {
    var chip = ev.target.closest('.chip-perfil');
    if (chip) { perfilPauta = chip.dataset.perfil; marcaChip(); pintaPautas(); return; }
    var usar = ev.target.closest('.usar');
    if (usar) usaPauta(parseInt(usar.dataset.pauta, 10));
  });

  conferePausa();

  window.__abrir = abrir;
  window.__salvarPeca = salvarPeca; window.__listarPecas = listarPecas;

})();
