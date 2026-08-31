# Comparador de pixels

Prova que uma mudança no código não alterou a arte. Renderiza os 18 layouts em dois
builds do app e compara `getImageData` pixel a pixel.

```bash
# gere o build "antes" (versão anterior) e o "depois" na mesma pasta:
git stash && python3 build.py && cp gerador-carrossel.html testes/antes.html
git stash pop && python3 build.py && cp gerador-carrossel.html testes/index.html
# sirva a pasta testes/ e abra comparar-pixels.html
```

O título da página vira `IDENTICOS` ou `DIFERENCAS` quando termina.

**As capas são testadas com foto.** Sem imagem elas caem no fundo quase preto, onde
diferença de degradê some no arredondamento — foi assim que um degrau visível na capa
do @ProfessorBaroni passou despercebido por três rodadas de regressão.
