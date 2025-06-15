import {getConnectionFetch} from './connectionFetch.js'

export async function accessOpen(prompt) {

    // const resposta = await fetch(`${getConnectionFetch}https://estokeasy.com.br/academyapi/api/`, {
    const resposta = await fetch(`${getConnectionFetch()}api`, {
    // const resposta = await fetch(`http://localhost:3006/api`, {                  // para testes locais
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    });

    // console.log(resposta.json())

    return resposta.json();
}
