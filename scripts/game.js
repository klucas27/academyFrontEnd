import { accessOpen } from './accessOpenAi.js'

import {editUser} from '../scripts/updateUser.js'

editUser();

let resp_question = ""

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

    const prompt = `Gere uma Questão de múltipla escolha sobre JavaScript 
    (uso de for, while, condições, arrays, tipos de dados, formatações, abre e fecha conchets, codigos com erros, 
    outros assuntos para logicas com js). sompre gere uma questões diferente das anteriores.
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

    const dados = await accessOpen(prompt)

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
        console.log("Acertou!")
        document.getElementById("notification-acerto").style.display = "block"
        document.getElementById("notification-acerto").style.color = "green"
        document.getElementById("notification-acerto").innerText = "Parabéns Você Acertou!"

        carregarPergunta()
    }
    else {
        console.log("Errou!")
        document.getElementById("notification-acerto").style.display = "block"
        document.getElementById("notification-acerto").innerText = "Revise novamente, Resposta Errada!"
        document.getElementById("notification-acerto").style.color = "red"

    }
}