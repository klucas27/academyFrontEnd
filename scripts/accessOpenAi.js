import {getConnectionFetch} from './connectionFetch.js'

export async function accessOpen(prompt) {
    
    const resposta = await fetch(`${getConnectionFetch()}api`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    });

    // console.log(resposta.json())

    return resposta.json();
}
