# -*- coding: utf-8 -*-
"""Geracao de copy de carrossel.

Recebe do navegador a frase da pessoa e o contrato do perfil — quais laminas
existem, quais campos cada uma aceita e quantos caracteres cabem em cada campo,
medidos pelo proprio motor que desenha a arte. Devolve as laminas em JSON.

O contrato vem do cliente de proposito: as tabelas de layout vivem no app.js e
duplicar isso aqui criaria duas verdades que divergem no primeiro ajuste de
layout. O que mora deste lado e o que nao pode viver numa pagina estatica: a
chave da API e a voz das marcas.

Quem escreve — Claude ou GPT — fica em provedores.py. Aqui esta o que nao muda
com o fornecedor: o contrato do perfil, as regras de formato e a conferencia.

Variaveis de ambiente:
  OPENAI_API_KEY ou ANTHROPIC_API_KEY   uma das duas
  PROVEDOR       opcional; 'openai' ou 'anthropic' quando houver as duas chaves
  SENHA_GERACAO  opcional; quando definida, exigida no header X-Senha
"""
import json
import os
from http.server import BaseHTTPRequestHandler

try:
    from vozes import brief
    import provedores
except ImportError:                      # runtime que nao poe a pasta no path
    import sys
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    from vozes import brief
    import provedores

Recusa = provedores.Recusa

LIMITE_PEDIDO = 4000        # caracteres da frase da pessoa
LIMITE_CORPO = 300_000      # bytes do POST

ESQUEMA = {
    "type": "object",
    "properties": {
        "laminas": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "type": {"type": "string"},
                    "title": {"type": "string"},
                    "sub": {"type": "string"},
                    "body": {"type": "string"},
                },
                "required": ["type"],
                "additionalProperties": False,
            },
        }
    },
    "required": ["laminas"],
    "additionalProperties": False,
}


def instrucoes(contrato):
    """Descreve, em texto, o que aquele perfil aceita."""
    linhas = [
        "Formato da resposta: um objeto com a lista `laminas`. Cada lamina tem",
        "`type` (o nome exato de um layout abaixo) e apenas os campos que aquele",
        "layout aceita. Nao invente campo e nao use layout que nao esta na lista.",
        "",
        "Layouts deste perfil:",
    ]
    for tipo, info in contrato.get("laminas", {}).items():
        campos = info.get("campos", {}) or {}
        if not campos:
            continue
        partes = ", ".join(
            "%s (ate %d caracteres)" % (c, n) for c, n in campos.items()
        )
        extra = " — este layout tambem comporta uma foto" if info.get("aceitaFoto") else ""
        linhas.append("- %s: %s%s" % (tipo, partes, extra))
    linhas += [
        "",
        "Os limites de caracteres nao sao sugestao: foram medidos na arte real.",
        "Passar do limite obriga o app a encolher a fonte e a lamina perde forca.",
        "Escreva perto do limite quando o assunto pedir, nunca acima.",
        "",
        "Foto voce nao produz. Prefira os layouts sem foto. Use um layout com",
        "foto so quando a imagem for de fato necessaria — a pessoa coloca depois.",
        "",
        "Destaque: **assim** marca um trecho curto (o app pinta conforme a marca)",
        "e __assim__ sublinha. No maximo um destaque por lamina, e so quando",
        "houver uma palavra que realmente carrega a frase. Nunca na capa inteira.",
        "",
        "Tamanho do carrossel: entre 4 e 8 laminas. A primeira e sempre a capa.",
    ]
    return "\n".join(linhas)


def monta_mensagens(dados):
    contrato = dados["contrato"]
    pedido = dados["pedido"][:LIMITE_PEDIDO]
    partes = ["Pedido de quem vai publicar:\n\n" + pedido]

    estouros = dados.get("estouros")
    if estouros:
        partes.append(
            "Voce ja escreveu esta versao:\n\n"
            + json.dumps(dados.get("laminas", []), ensure_ascii=False, indent=1)
        )
        detalhe = "\n".join(
            "- lamina %d (%s), campo %s: cabem %s caracteres, voce escreveu %s"
            % (e.get("i", 0) + 1, e.get("type"), e.get("campo"),
               e.get("cabe"), e.get("tem"))
            for e in estouros[:20]
        )
        partes.append(
            "Estes campos nao couberam na arte:\n\n" + detalhe + "\n\n"
            "Reescreva o carrossel inteiro mantendo o sentido e o tom, com esses"
            " campos dentro do limite. Cortar palavra e melhor que resumir a"
            " ideia: prefira tirar adjetivo e reduto a perder o argumento."
        )
    return [{"role": "user", "content": "\n\n".join(partes)}]


def gera(dados):
    contrato = dados["contrato"]
    return provedores.escolhe().gera(
        brief(contrato.get("marca", "suno")),
        instrucoes(contrato),
        monta_mensagens(dados),
        ESQUEMA,
    )


class handler(BaseHTTPRequestHandler):
    def _responde(self, codigo, payload):
        corpo = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(codigo)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(corpo)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(corpo)

    def do_POST(self):
        senha = os.environ.get("SENHA_GERACAO")
        if senha and self.headers.get("X-Senha") != senha:
            return self._responde(403, {"erro": "acesso"})

        try:
            tamanho = int(self.headers.get("Content-Length") or 0)
        except ValueError:
            tamanho = 0
        if tamanho <= 0 or tamanho > LIMITE_CORPO:
            return self._responde(400, {"erro": "corpo invalido"})

        try:
            dados = json.loads(self.rfile.read(tamanho).decode("utf-8"))
        except (ValueError, UnicodeDecodeError):
            return self._responde(400, {"erro": "json invalido"})

        if not isinstance(dados, dict) or not dados.get("pedido") \
           or not isinstance(dados.get("contrato"), dict):
            return self._responde(400, {"erro": "faltou pedido ou contrato"})

        # modo manual: devolve o pedido montado para uma pessoa levar ao modelo
        # por fora. Nao chama a API, logo nao precisa de chave — e usa as MESMAS
        # funcoes do caminho normal, para o que se testa ser o que vai rodar.
        if dados.get("montar"):
            contrato = dados["contrato"]
            return self._responde(200, {
                "sistema": brief(contrato.get("marca", "suno")) + "\n\n" + instrucoes(contrato),
                "mensagem": monta_mensagens(dados)[0]["content"],
            })

        if not provedores.tem_chave():
            return self._responde(503, {"erro": "sem chave configurada"})

        try:
            return self._responde(200, gera(dados))
        except Recusa as e:
            return self._responde(422, {"erro": "recusado", "motivo": str(e)})
        except provedores.SemSaldo:
            return self._responde(402, {"erro": "sem saldo"})
        except provedores.Fila:
            return self._responde(429, {"erro": "fila"})
        except provedores.ChaveRuim:
            return self._responde(503, {"erro": "chave rejeitada"})
        except provedores.ErroApi as e:
            return self._responde(502, {"erro": "api", "status": e.status,
                                        "detalhe": e.detalhe})
        except provedores.SemResposta:
            return self._responde(504, {"erro": "sem resposta da api"})
        except ImportError as e:
            return self._responde(503, {"erro": "pacote do provedor ausente",
                                        "detalhe": str(e)})

    def do_GET(self):
        """Sonda de saude: diz se esta de pe e se a chave existe, nunca o valor.

        Com ?modelos=1 pergunta ao fornecedor quais modelos a chave enxerga.
        Nome de modelo envelhece, e errar o identificador da erro obscuro na
        primeira geracao: melhor ler a lista da propria API do que chutar.
        """
        nome = provedores.qual()
        fora = {
            "ok": True,
            "provedor": nome or "nenhum",
            "chave": provedores.tem_chave(),
            "senha": bool(os.environ.get("SENHA_GERACAO")),
        }
        if nome:
            fora["modelo"] = (os.environ.get(nome.upper() + "_MODELO")
                              or provedores.TIPOS[nome].DEFAULT)
        if "modelos=1" in (self.path or "") and provedores.tem_chave():
            try:
                fora["modelos"] = provedores.escolhe().modelos()
            except Exception as e:
                fora["modelos_erro"] = type(e).__name__
        self._responde(200, fora)
