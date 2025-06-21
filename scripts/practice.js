import { accessOpen } from './accessOpenAi.js'

import { editUser, atualizarStatusUsuario } from '../scripts/updateUser.js'

editUser();

let desafio_proposto = ""
let editorInstance = null
let desafiosAnteriores = [];


document.addEventListener("DOMContentLoaded", () => {
    createNewChallenge();

    document.getElementById("button-verificar").addEventListener("click", (e) => {
        e.preventDefault();
        verificarDesafio();
    })

    document.getElementById("btn-proxima-desafio").addEventListener("click", (e) => {
        e.preventDefault();
        createNewChallenge();
    })

})

async function editEditor() {
    require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });
    require(['vs/editor/editor.main'], function () {
        // Destroi o editor anterior se existir
        if (editorInstance) {
            editorInstance.dispose();
        }
        editorInstance = monaco.editor.create(document.getElementById('space-for-code'), {
            value: '', // Limpa o editor ao criar novo desafio
            language: 'javascript',
            theme: 'vs-dark',
            fontSize: 16,
            automaticLayout: true,
            minimap: { enabled: false }
        });
    });
}

async function createNewChallenge() {
    let dados;
    let tentativas = 0;
    const maxTentativas = 3;

    do {
        const prompt = `
        Gere um desafio para um aluno que está aprendendo a programar em JavaScript, para que ele faça um pequeno bloco de código.
        NÃO repita nenhum dos desafios já propostos abaixo:
        ${desafiosAnteriores.map((d, i) => `${i + 1}. ${d}`).join('\n')}

        Formato JSON:
        {
        "desafio": "..."
        }

        O Desafio deve ser (Obrigatoriamente):
        - Um pequeno trecho de código (uso de repetições, condição, usos de tipos de dados, funções entre outros assuntos de js).
        - coloque o desafio em 'desafio' no json.
        - Sempre gere um desafio diferente já proposto!
        `;

        dados = await accessOpen(prompt);
        tentativas++;
    } while (desafiosAnteriores.includes(dados.desafio) && tentativas < maxTentativas);

    document.getElementById("question-prop").innerText = dados.desafio;
    desafio_proposto = dados.desafio;

    // Salva o desafio para evitar repetições futuras
    desafiosAnteriores.push(dados.desafio);

    editEditor()
}


async function verificarDesafio() {
    if (!editorInstance) {
        alert("Editor ainda não carregado!");
        return;
    }
    const resposta_aluno = editorInstance.getValue()
    if (resposta_aluno == ""){
        return
    }
    console.log(resposta_aluno)

    const prompt = `
        Corrija e de os passos para corrigir o código abaixo (caso esteja correto, apenas comente linha por linha) e corrija os erros comentando linha por linha e explicando cada detalhe para o aluno que escreveu este código. 
        coloque a correção no 'comentario_do_codigo', dentro de 'nota' insira uma nota de 0 a 10 do tipo int do código abaixo.
        NÃO coloque aspas duplas dentro do valor de 'comentario_do_codigo', use apenas aspas simples.
        Retorne apenas o JSON, sem explicações extras e sem o codigo, apenas comentarios e explicações.


        ATENÇÃO: Informe somente o JSON, sem texto antes ou depois.
        desafio proposto: ${desafio_proposto}

        Se Resposta do aluno for vazio, forneça a nota: 0!
        resposta do aluno: ${resposta_aluno}
        Formato JSON:
        {
        "comentario_do_codigo": "..."
        "nota": "..."
        }
        `;

    const dados = await accessOpen(prompt)

    document.getElementById("question-prop").innerText = `
    DESAFIO: ${desafio_proposto}\n\n 
    RESPOSTA: ${dados.comentario_do_codigo}\n\n 
    Nota: ${dados.nota}`
    
    if (dados.nota >= 6) {
        await atualizarStatusUsuario(0, 70)
        await editUser()
        // createNewChallenge();
    }

}