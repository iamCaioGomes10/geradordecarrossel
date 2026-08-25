#!/bin/sh
# Reconstroi tudo, comita e envia. A Vercel publica sozinha depois do push.
#   ./publicar.sh "o que mudou"
set -e
cd "$(dirname "$0")"

python3 build.py          >/dev/null
python3 build.py --static >/dev/null

git add -A
if git diff --cached --quiet; then
  echo "nada mudou desde o ultimo envio."
  exit 0
fi

git commit -m "${1:-atualiza carrossel}"

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "commit feito, mas nao ha remoto configurado ainda — nada foi enviado."
  exit 0
fi

git push
echo
echo "enviado. a Vercel publica em ~30s."
