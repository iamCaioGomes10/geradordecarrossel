# -*- coding: utf-8 -*-
"""Quem escreve a copy: Claude ou GPT, atras da mesma porta.

O resto do app nao sabe qual dos dois respondeu. Contrato do perfil, vozes das
marcas, orcamento de caracteres medido na arte e conferencia do que voltou sao
iguais nos dois caminhos — o que muda e so a chamada e o nome dos erros.

Escolha por variavel de ambiente:
  PROVEDOR         'gemini', 'openai' ou 'anthropic'; sem ela, vale a chave
                   que existir — com mais de uma, defina esta explicitamente
  GEMINI_API_KEY / OPENAI_API_KEY / ANTHROPIC_API_KEY
  GEMINI_MODELO  / OPENAI_MODELO  / ANTHROPIC_MODELO  (opcional)
  OPENAI_ESFORCO   'low' | 'medium' | 'high', so nos modelos que raciocinam

Nome de modelo envelhece rapido e errar o identificador da um erro obscuro.
Por isso o modelo e variavel, e a sonda de saude sabe listar os modelos que a
chave enxerga: melhor perguntar a API do que chutar no codigo.
"""
import json
import os
import time


# ---------- erros do app, sem marca de fornecedor ----------
class Recusa(Exception):
    """o modelo se negou a escrever a peca"""


class Fila(Exception):
    """limite de uso no fornecedor"""


class ChaveRuim(Exception):
    pass


class SemSaldo(Exception):
    """Chave valida, conta sem credito ou no teto de gasto.

    Os dois fornecedores devolvem isso junto com limite de taxa — a OpenAI
    manda 429 nos dois casos —, e tratar como fila manda a pessoa reetentar
    para sempre um problema que so o faturamento resolve.
    """


class ErroApi(Exception):
    """Erro que o fornecedor nao classificou em nada que saibamos tratar.

    Carrega o recado dele junto: um 502 com "status 503" e so um numero, e
    quem esta olhando nao tem como saber se e modelo sobrecarregado, parametro
    recusado ou nome de modelo que nao serve.
    """

    def __init__(self, status=0, detalhe=""):
        Exception.__init__(self, "status %s %s" % (status, detalhe))
        self.status = status
        self.detalhe = (detalhe or "")[:300]


class SemResposta(Exception):
    pass


class SobreCarga(Exception):
    """Modelo congestionado. Na camada gratuita isso e rotina, nao excecao."""


def _codigo(e):
    """Codigo que o fornecedor mandou, sem depender do formato do SDK."""
    for campo in ("code", "type"):
        v = getattr(e, campo, None)
        if isinstance(v, str) and v:
            return v.lower()
    corpo = getattr(e, "body", None)
    if isinstance(corpo, dict):
        err = corpo.get("error") or {}
        for campo in ("code", "type"):
            v = err.get(campo)
            if isinstance(v, str) and v:
                return v.lower()
    return str(e).lower()


def _e_saldo(e):
    marcas = ("insufficient_quota", "billing", "credit balance",
              "credit_balance", "exceeded your current quota", "payment")
    texto = (_codigo(e) + " " + str(e)).lower()
    return any(m in texto for m in marcas)


def sem_extras(esquema):
    """Copia do esquema sem `additionalProperties`, que nem todo validador aceita."""
    if not isinstance(esquema, dict):
        return esquema
    novo = {k: v for k, v in esquema.items() if k != "additionalProperties"}
    if isinstance(novo.get("properties"), dict):
        novo["properties"] = {k: sem_extras(v) for k, v in novo["properties"].items()}
    if isinstance(novo.get("items"), dict):
        novo["items"] = sem_extras(novo["items"])
    return novo


def estrito(esquema):
    """Versao do esquema que o modo estrito da OpenAI aceita.

    Ela exige que toda propriedade esteja em `required`, mas nossas laminas tem
    campos opcionais de proposito: a lamina de corpo do Baroni nao tem titulo, a
    capa do Notícias nao tem subtitulo. A saida e declarar todas obrigatorias e
    deixar as opcionais aceitarem null, que o app ja trata como campo ausente.
    """
    if not isinstance(esquema, dict):
        return esquema
    novo = dict(esquema)
    props = novo.get("properties")
    if isinstance(props, dict):
        obrigatorias = set(novo.get("required") or [])
        saida = {}
        for nome, sub in props.items():
            sub = estrito(sub)
            if nome not in obrigatorias:
                tipo = sub.get("type")
                if isinstance(tipo, str) and tipo != "null":
                    sub = dict(sub, type=[tipo, "null"])
            saida[nome] = sub
        novo["properties"] = saida
        novo["required"] = list(props.keys())
        novo["additionalProperties"] = False
    if isinstance(novo.get("items"), dict):
        novo["items"] = estrito(novo["items"])
    return novo


class Claude(object):
    nome = "anthropic"
    env_chave = "ANTHROPIC_API_KEY"
    DEFAULT = "claude-opus-5"

    def __init__(self):
        import anthropic
        self.sdk = anthropic
        self.cliente = anthropic.Anthropic()
        self.modelo = os.environ.get("ANTHROPIC_MODELO") or self.DEFAULT

    def modelos(self):
        return [m.id for m in self.cliente.models.list(limit=40).data]

    def gera(self, voz, regras, mensagens, esquema):
        try:
            r = self.cliente.messages.create(
                model=self.modelo,
                max_tokens=16000,
                system=[
                    {"type": "text", "text": voz,
                     "cache_control": {"type": "ephemeral"}},
                    {"type": "text", "text": regras},
                ],
                thinking={"type": "adaptive"},
                output_config={
                    "effort": "medium",
                    "format": {"type": "json_schema", "schema": esquema},
                },
                messages=mensagens,
            )
        except self.sdk.RateLimitError as e:
            raise SemSaldo() if _e_saldo(e) else Fila()
        except self.sdk.AuthenticationError:
            raise ChaveRuim()
        except self.sdk.APIConnectionError:
            raise SemResposta()
        except self.sdk.APIStatusError as e:
            if _e_saldo(e):
                raise SemSaldo()
            raise ErroApi(e.status_code, str(e))
        if r.stop_reason == "refusal":
            d = getattr(r, "stop_details", None)
            raise Recusa(getattr(d, "category", None) or "sem categoria")
        try:
            return json.loads(next(b.text for b in r.content if b.type == "text"))
        except (ValueError, StopIteration):
            raise SemResposta()


class Gpt(object):
    nome = "openai"
    env_chave = "OPENAI_API_KEY"
    DEFAULT = "gpt-5"

    def __init__(self):
        import openai
        self.sdk = openai
        self.cliente = openai.OpenAI()
        self.modelo = os.environ.get("OPENAI_MODELO") or self.DEFAULT
        self.esforco = os.environ.get("OPENAI_ESFORCO") or ""

    def modelos(self):
        return sorted(m.id for m in self.cliente.models.list().data)

    # parametros que mudaram de nome ou de suporte entre familias de modelo
    AJUSTAVEIS = ("max_completion_tokens", "max_tokens", "reasoning_effort")

    def _chama(self, corpo):
        """Tira o parametro que a propria API reclamar e tenta de novo.

        A familia de modelos ja trocou de nome de parametro mais de uma vez, e
        fixar a versao certa no codigo quebra na proxima troca de modelo. O
        recado de erro diz qual parametro incomodou, entao nao ha o que
        adivinhar: so se mexe no que foi citado, e o resto sobe como erro.
        """
        corpo = dict(corpo)
        for _ in range(len(self.AJUSTAVEIS) + 1):
            try:
                return self.cliente.chat.completions.create(**corpo)
            except self.sdk.BadRequestError as e:
                recado = str(e)
                alvo = None
                for nome in self.AJUSTAVEIS:
                    if nome in corpo and nome in recado:
                        alvo = nome
                        break
                if alvo is None:
                    raise
                if alvo == "max_completion_tokens":
                    corpo["max_tokens"] = corpo.pop(alvo)
                else:
                    corpo.pop(alvo)
        return self.cliente.chat.completions.create(**corpo)

    def gera(self, voz, regras, mensagens, esquema):
        corpo = {
            "model": self.modelo,
            "max_completion_tokens": 16000,
            "response_format": {
                "type": "json_schema",
                "json_schema": {"name": "laminas", "strict": True,
                                "schema": estrito(esquema)},
            },
            "messages": [{"role": "system", "content": voz + "\n\n" + regras}] + mensagens,
        }
        if self.esforco:
            corpo["reasoning_effort"] = self.esforco
        try:
            r = self._chama(corpo)
        except self.sdk.RateLimitError as e:
            raise SemSaldo() if _e_saldo(e) else Fila()
        except self.sdk.AuthenticationError:
            raise ChaveRuim()
        except self.sdk.APIConnectionError:
            raise SemResposta()
        except self.sdk.APIStatusError as e:
            if _e_saldo(e):
                raise SemSaldo()
            raise ErroApi(getattr(e, "status_code", 0), str(e))
        msg = r.choices[0].message
        if getattr(msg, "refusal", None):
            raise Recusa(str(msg.refusal)[:200])
        try:
            return json.loads(msg.content)
        except (ValueError, TypeError):
            raise SemResposta()


class Gemini(object):
    nome = "gemini"
    env_chave = "GEMINI_API_KEY"
    # O alias -latest apontava para o modelo mais disputado e respondia 503 na
    # hora; o 2.5-flash a propria API recusa, dizendo que nao serve mais conta
    # nova. Quando um nome parar de valer, o detalhe do erro diz o substituto e
    # GEMINI_MODELO resolve sem mexer em codigo.
    DEFAULT = "gemini-3.6-flash"
    ESPERAS = (2, 5, 9)          # segundos entre as tentativas quando lota

    def __init__(self):
        from google import genai
        from google.genai import errors, types
        self.genai, self.erros, self.tipos = genai, errors, types
        self.cliente = genai.Client()
        self.modelo = os.environ.get("GEMINI_MODELO") or self.DEFAULT

    def modelos(self):
        return sorted(m.name.replace("models/", "") for m in self.cliente.models.list())

    def _erro(self, e):
        codigo = getattr(e, "code", 0) or 0
        if _e_saldo(e):
            return SemSaldo()
        if codigo == 503:
            return SobreCarga()
        if codigo == 429:
            return Fila()
        if codigo in (401, 403):
            return ChaveRuim()
        return ErroApi(codigo, getattr(e, "message", "") or str(e))

    def gera(self, voz, regras, mensagens, esquema):
        # a voz e as regras vao como instrucao de sistema; o pedido, como conteudo
        pedido = "\n\n".join(m["content"] for m in mensagens)
        cfg = self.tipos.GenerateContentConfig(
            system_instruction=voz + "\n\n" + regras,
            response_mime_type="application/json",
            # o suporte a JSON Schema aqui e parcial e additionalProperties nao
            # e garantido; tirar e inofensivo, porque o cliente ja ignora campo
            # que nao conhece ao montar a lamina
            response_json_schema=sem_extras(esquema),
        )
        # congestionamento e esperado aqui: insiste um pouco antes de desistir,
        # em vez de mandar a pessoa apertar o botao de novo na mao
        r = None
        for i, espera in enumerate((0,) + self.ESPERAS):
            if espera:
                time.sleep(espera)
            try:
                r = self.cliente.models.generate_content(
                    model=self.modelo, contents=pedido, config=cfg)
                break
            except self.erros.APIError as e:
                problema = self._erro(e)
                if isinstance(problema, SobreCarga) and i < len(self.ESPERAS):
                    continue
                raise problema
            except (ConnectionError, TimeoutError, OSError):
                raise SemResposta()

        bloqueio = getattr(getattr(r, "prompt_feedback", None), "block_reason", None)
        if bloqueio:
            raise Recusa(str(bloqueio))
        texto = getattr(r, "text", None)
        if not texto:
            cands = getattr(r, "candidates", None) or []
            motivo = getattr(cands[0], "finish_reason", None) if cands else None
            if motivo and "STOP" not in str(motivo).upper():
                raise Recusa(str(motivo))
            raise SemResposta()
        try:
            return json.loads(texto)
        except (ValueError, TypeError):
            raise SemResposta()


TIPOS = {"gemini": Gemini, "openai": Gpt, "anthropic": Claude}


def qual():
    """Nome do provedor configurado, sem construir cliente nem exigir pacote."""
    pedido = (os.environ.get("PROVEDOR") or "").strip().lower()
    if pedido in TIPOS:
        return pedido
    for nome, tipo in (("gemini", Gemini), ("openai", Gpt), ("anthropic", Claude)):
        if os.environ.get(tipo.env_chave):
            return nome
    return ""


def tem_chave():
    nome = qual()
    return bool(nome and os.environ.get(TIPOS[nome].env_chave))


def escolhe():
    nome = qual()
    if not nome:
        raise ChaveRuim()
    return TIPOS[nome]()
