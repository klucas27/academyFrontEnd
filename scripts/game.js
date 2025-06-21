/**
 * Config para a pagina Game, gera perguntas aleatorias para o usuario
 */

import { accessOpen } from './accessOpenAi.js'

import {editUser, atualizarStatusUsuario} from '../scripts/updateUser.js'

editUser();

let resp_question = ""
let questoesAnteriores = [] // Armazena os enunciados já exibidos

document.addEventListener("DOMContentLoaded", () => {
    carregarPergunta();

    document.getElementById("btn-proxima-questao").addEventListener("click", (e) => {
        e.preventDefault();
        carregarPergunta();
    });

    document.getElementById("resp-01").addEventListener("click", (e) => {
        e.preventDefault();
        verResposta('a');
    });
    document.getElementById("resp-02").addEventListener("click", (e) => {
        e.preventDefault();
        verResposta('b');
    });
    document.getElementById("resp-03").addEventListener("click", (e) => {
        e.preventDefault();
        verResposta('c');
    });
    document.getElementById("resp-04").addEventListener("click", (e) => {
        e.preventDefault();
        verResposta('d');
    });
})

async function carregarPergunta() {
    // Adiciona os enunciados anteriores ao prompt
    const enunciadosAnteriores = questoesAnteriores.length > 0 
        ? `Não repita nenhuma das seguintes questões já exibidas (elabore questoẽs totalmente diferentes, de outros topicos outras formas): ${questoesAnteriores.join(" | ")}.` 
        : "";

    const prompt = `Gere uma Questão de múltipla escolha sobre JavaScript 
    (uso de for, while, condições, arrays, tipos de dados, formatações, abre e fecha conchets, codigos com erros, 
    outros assuntos para logicas com js). Sempre gere uma questão diferente das anteriores.
    ${enunciadosAnteriores}
    Formato JSON:
        {
        "enunciado": "...",
        "codigo": "...",
        "alternativas": { "a": "...", "b": "...", "c": "...", "d": "..." },
        "respostaCorreta": "..."
        }

    A Questão deve conter (Obrigatoriamente):
    - Um pequeno trecho de código.
    - enunciado: Qual é a saída?
    - codigo: codigo do enunciado.
    - 4 alternativas (a, b, c, d).
    - Informe a resposta correta em 'respostaCorreta'.
    `;

    const dados = await accessOpen(prompt);

    // Salva o enunciado para evitar repetição
    if (dados.enunciado && !questoesAnteriores.includes(dados.enunciado)) {
        questoesAnteriores.push(dados.enunciado);
    }

    document.getElementById('exercises-text').innerText = dados.codigo;

    const alternativas = dados.alternativas;

    document.getElementById("resp-01").innerText = alternativas.a
    document.getElementById("resp-02").innerText = alternativas.b
    document.getElementById("resp-03").innerText = alternativas.c
    document.getElementById("resp-04").innerText = alternativas.d

    resp_question = dados.respostaCorreta

    document.getElementById("notification-acerto").style.display = "none"
}

async function verResposta(resp) {

    if (resp == resp_question) {
        await atualizarStatusUsuario(0,10)
        await editUser()
        // console.log("Acertou!")
        document.getElementById("notification-acerto").style.display = "block"
        document.getElementById("notification-acerto").style.color = "green"
        document.getElementById("notification-acerto").innerText = "Parabéns Você Acertou!"

        carregarPergunta()
    }
    else {
        // console.log("Errou!")
        await atualizarStatusUsuario(-1, 0)
        await editUser()
        // location.reload()
        document.getElementById("notification-acerto").style.display = "block"
        document.getElementById("notification-acerto").innerText = "Revise novamente, Resposta Errada!"
        document.getElementById("notification-acerto").style.color = "red"

    }
}