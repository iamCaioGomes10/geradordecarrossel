# Gerador de Carrossel — Suno

Você cola o texto das lâminas, o app monta o design e exporta os PNGs em 1080×1350.
Quatro perfis: **@ProfessorBaroni**, **@suno**, **@tiagogreis** e **@sunonoticias**.

## Como usar

Dê **duplo clique em `gerador-carrossel.html`**. Só isso — não precisa instalar nada,
não precisa de internet. Todo o app (fontes, logo, avatar) está dentro do arquivo.

1. Escolha o **perfil** no topo.
2. Cole o texto no campo **Colar texto corrido** e clique em **Gerar lâminas**.
3. Ajuste lâmina a lâmina: layout, texto, imagem, enquadramento, ordem.
4. **Baixar todas (.zip)** ou o PNG de uma lâmina só.

### Como o texto colado é dividido

| | @ProfessorBaroni | @suno |
|---|---|---|
| 1º bloco | 1ª linha = título da capa, resto = subtítulo | igual |
| demais blocos | agrupados até encher a lâmina | 1 bloco = 1 lâmina; 1ª linha = título |

A diferença existe porque no layout do @suno cada lâmina tem título próprio, e no
do @ProfessorBaroni o corpo é um bloco de texto corrido.

## Layouts

| Perfil | Layout | Nó no Figma | Fundo |
|---|---|---|---|
| Baroni | Capa | `6:233` | imagem + gradiente preto |
| Baroni | Corpo | `3:2` | branco |
| Baroni | Corpo + imagem | `6:193` | preto `#050505`, imagem 768×357 |
| Suno | Capa | `705:2` | imagem + gradiente preto, logo branco |
| Suno | Corpo + imagem | `630:104` | branco, imagem 825×422 |
| Suno | Só texto | `2290:18` | branco |
| Tiago | Capa | `2059:2` | imagem + gradiente preto |
| Tiago | Só texto | `2059:40` | gradiente claro |
| Tiago | Texto + foto | `2038:123` | gradiente claro, imagem 852×360 |
| Notícias | Capa | `2153:173` | imagem + papel rasgado embaixo |
| Notícias | Só texto | `2153:139` | papel rasgado + textura |
| Notícias | Texto + imagem | `2126:419` | papel rasgado + textura, imagem 768×394 |

Arquivos no Figma: PROF-BARONI `u2sVJDaj8RkhpcL0hIYpfG` · SUNO `fsm3eOqBWcd7TqjCnVpRY2`
· TIAGO REIS `kFDh5RPJoMBI4FUqOdW8JH` · SUNO NOTÍCIAS `JRfQEu6t4kO3NaDOUudfE9`.

## Formatação no texto

`**assim**` marca ênfase, e cada perfil pinta do seu jeito:

- **@ProfessorBaroni** → negrito (Inter SemiBold). `__assim__` vira sublinhado.
- **@suno** → vermelho, no mesmo gradiente do Figma (`#ff0000` → `#ab0101`).
- **@tiagogreis** → depende do campo: **azul** (`#42aff3`) no título, **negrito** no
  corpo. É assim no arquivo original, não é escolha do app.
- **@sunonoticias** → negrito (Caladea Bold).

Linha em branco vira parágrafo nos quatro. No @sunonoticias a capa não tem subtítulo,
então o primeiro bloco inteiro vira o título.

## Enquadramento de imagem

Toda imagem tem **Zoom** (100–300%) e posição **Horizontal** / **Vertical**. O eixo
sem folga fica desativado — com zoom 100% a imagem cobre exatamente um dos eixos, e
só o outro aceita ajuste. Aumentar o zoom libera os dois.

Isso existe porque nos dois arquivos do Figma a foto tinha recorte manual (a capa do
@suno estava com zoom de ~1,7× e deslocada para baixo). O padrão do app é recorte
centralizado; o controle serve para reproduzir enquadramentos assim.

## Opções

- **Disclaimer** — só no @ProfessorBaroni (os layouts do @suno não têm).
- **Reduzir a fonte quando o texto estourar** — ligado por padrão. Desligue para ver
  o aviso `texto longo demais` e cortar o texto na mão.
- **Alinhar corpo no topo** — só no @ProfessorBaroni.

## Fidelidade ao Figma

Medidas extraídas via Figma MCP e conferidas por diff de pixel contra os renders do
Figma. Nos **doze layouts**, todas as linhas de texto caem dentro de **1–3 px** do
original, com a mesma quebra de linha.

Nos layouts de corpo do @tiagogreis o conjunto inteiro (perfil + título + texto + foto)
é centralizado verticalmente — não é aproximação, a conta bate no pixel com o Figma.

No @suno o texto é preenchido por gradiente (`bg-clip-text`), não por cor sólida.
Comparando pelo mesmo caminho de reamostragem da referência, o gradiente cinza bate
exato (73/73 e 103/103 na média dos glifos) e o vermelho fica dentro de 7/255 — a
diferença vem de o CSS aplicar o gradiente por fragmento de linha e o app aplicar por
trecho destacado inteiro.

Dando o mesmo enquadramento de imagem do Figma, a lâmina inteira do @suno difere em
média **3/255** da referência.

Duas divergências conhecidas, ambas deliberadas:

- **Line-height do corpo do Baroni**: o Figma reporta 1,28 mas na prática usa 1,275 —
  3 px acumulados ao longo de 14 linhas. Mantive 1,28, que é o valor da spec.
- **Subtítulo da capa do @suno**: o Figma traz line-height 0,756 (30 px para fonte de
  40 px), que colapsaria linhas se o subtítulo passasse de uma. Uso 1,134, igual ao do
  título. Some se o subtítulo tiver só uma linha, que é o caso da referência.

## Distribuir para outras pessoas

Duas saídas, e elas convivem:

**Arquivo.** Manda `gerador-carrossel.html` por Drive, Slack ou e-mail. A pessoa dá
duplo clique. Sem versão central: se o layout mudar, quem tem cópia antiga não sabe.

**Artifact.** `python3 build.py --artifact` gera `artifact.html`, que é o mesmo app sem
`<!doctype>`/`<html>`/`<head>`/`<body>` — o Artifact injeta esse esqueleto. Publicado,
vira uma página privada no claude.ai com link, e republicar mantém o mesmo link.

O visualizador de artifact roda a página num iframe com
`sandbox="allow-scripts allow-same-origin allow-forms"`. Faltam dois tokens, e cada um
exigiu uma adaptação no código:

| Falta | Quebra | Como o app contorna |
|---|---|---|
| `allow-downloads` | `<a download>` é inerte | usa a capability `downloads` do artifact |
| `allow-modals` | `confirm()` não abre | "Limpar tudo" confirma em dois cliques |

A capability `downloads` **não aceita `.zip`** (só `png jpg jpeg gif webp mp4 webm txt
json md`, mais `docx pptx epub csv ttf html svg pdf` quando habilitado). Por isso, no
artifact o botão vira "Baixar todas (PNG)" e salva um PNG de cada vez, com uma
confirmação por arquivo — recusar um interrompe o lote. No arquivo local o zip continua
igual. O app detecta sozinho onde está rodando e troca o rótulo do botão.

### Publicar uma atualização

```bash
./publicar.sh "o que mudou"
```

Reconstrói, comita e envia. A Vercel publica sozinha depois do push, em ~30s.

Um hook de `pre-commit` roda `build.py` antes de cada commit e adiciona
`dist/` e `gerador-carrossel.html` junto — então é impossível enviar um `dist/`
atrasado em relação a `src/`. O hook vive em `.git/hooks/`, que **não vai no clone**:
quem clonar o repositório precisa recriá-lo, ou rodar o build na mão.

### Subir na Vercel

`python3 build.py --static` monta `dist/`, que é a pasta a publicar — **deploy a partir
dela**, não da raiz do projeto. O `vercel.json` fica dentro de `dist/`, então não precisa
configurar build command nem output directory: é um site estático puro.

```
dist/
  index.html     o app inteiro
  vercel.json    headers
  robots.txt     bloqueia crawler
  favicon.svg
```

**O deploy é por Git.** No projeto da Vercel:

| Campo | Valor |
|---|---|
| Repositório | `iamCaioGomes10/geradordecarrossel` |
| Root Directory | `dist` |
| Framework Preset | `Other` |
| Build Command | vazio |
| Output Directory | vazio |

`Root Directory = dist` é o que importa. Sem isso a Vercel serve a raiz do
repositório, que não tem `index.html`, e o resultado é `404: NOT_FOUND` — foi o que
aconteceu nas tentativas por upload manual.

**Atenção:** a CLI da Vercel roda em Node, que não está instalado nesta máquina
(ver `maquina-sem-node`). Ou instala o Node, ou usa o fluxo pelo painel.

Depois de qualquer mudança em `src/`, rode `python3 build.py --static` de novo e
publique. O `Cache-Control: must-revalidate` no `index.html` garante que a atualização
chega na hora — sem ele, o app inteiro sendo um arquivo só ficaria preso em cache.

#### Headers

| Header | Por quê |
|---|---|
| `Content-Security-Policy` | O app não faz nenhuma requisição de rede. `connect-src 'none'` transforma isso em garantia: o texto colado não sai do navegador. |
| `X-Content-Type-Options: nosniff` | Impede o navegador de adivinhar tipo de conteúdo. |
| `Referrer-Policy: no-referrer` | Não vaza a URL da ferramenta para terceiros. |
| `X-Robots-Tag` + `robots.txt` + meta | Fora de buscador. Não é controle de acesso. |
| `Cache-Control: must-revalidate` | Atualização chega sem espera de cache. |

A CSP foi testada com os headers aplicados de verdade: as três fontes carregam, os seis
layouts renderizam, upload de imagem funciona (esquema `data:`) e o zip é gerado. Zero
violação vinda do app.

**O endereço é público.** Quem tiver a URL usa. O `noindex` mantém fora do Google, mas
não impede acesso — se um dia precisar restringir, é o Deployment Protection da Vercel,
nos planos pagos.

## Mexer no código

```
src/index.html   estrutura da interface
src/style.css    estilo da interface
src/app.js       motor de render em canvas, layouts, zip
assets/          fontes (Inter, Staatliches, Poppins) e imagens dos perfis
build.py         junta tudo em gerador-carrossel.html
```

Depois de editar qualquer coisa em `src/`, rode:

```bash
python3 build.py
```

### Peso dos assets

O @sunonoticias trouxe texturas (papel rasgado e grão) que somavam **12,5 MB** no
Figma. Como tudo vai embutido no HTML, otimizei antes: cortei cada textura só na
faixa que aparece na lâmina e converti o grão para JPEG, já que não usa transparência.
Resultado: **454 KB**. O `sn-capa-grao.png` do Figma foi descartado — era a foto da
matéria, não asset de marca.

Se entrar outro perfil com textura, vale repetir isso: cortar o visível e escolher o
formato pelo uso de alfa. O arquivo hoje tem ~930 KB.

### Onde ficam as medidas

- `B` — layouts do @ProfessorBaroni
- `S` — layouts do @suno
- `T` — layouts do @tiagogreis
- `N` — layouts do @sunonoticias
- `MARCAS` — registro que liga cada perfil aos seus layouts, renderizadores e opções

Para adicionar um perfil novo: um objeto de layouts, uma função de render por layout,
e uma entrada em `MARCAS`. A interface se monta sozinha a partir do campo `campos` de
cada layout (`title`, `sub`, `body`, `img`).
