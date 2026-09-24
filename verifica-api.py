#!/usr/bin/env python3
"""Importa cada modulo da api. Sai diferente de zero se algum quebrar.

Checar sintaxe nao basta: ja subiu para producao um arquivo em que a classe
base estava declarada depois de quem herdava dela. A sintaxe estava correta,
o import morria, e a funcao respondia 500 em zero segundo.
"""
import pathlib
import sys

RAIZ = pathlib.Path(__file__).parent
sys.path.insert(0, str(RAIZ / "api"))

falhou = False
for arquivo in sorted((RAIZ / "api").glob("*.py")):
    nome = arquivo.stem
    try:
        __import__(nome)
        print("  ok    %s" % nome)
    except ImportError as e:
        # pacote de fornecedor nao instalado aqui nao e erro nosso
        print("  pula  %s (%s)" % (nome, e))
    except Exception as e:
        falhou = True
        print("  FALHA %s: %s: %s" % (nome, type(e).__name__, e))
raise SystemExit(1 if falhou else 0)
