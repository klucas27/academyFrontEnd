
export async function accessOpen(prompt) {

    // const resposta = await fetch(`https://estokeasy.com.br/academyapi/api/`, {
    const resposta = await fetch(`https://estokeasy.com.br/academyapi/api/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    });

    // console.log(resposta.json())

    return resposta.json();
}
