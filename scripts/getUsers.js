import {getConnectionFetch} from './connectionFetch.js'

const sucesso = null

export async function getInfosUsers(user, passwd) {

    try {
        console.log(getConnectionFetch())
        // const response = await fetch("https://estokeasy.com.br/academyapi/users/userGet", {
        const response = await fetch(`${getConnectionFetch()}users/userGet`, {
        // const response = await fetch("http://localhost:3006/users/userGet", {     // Para testes Locais
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: user,
                passwd: passwd
            })
        });

        let data = await response.json();

        return data; // ← retorna {sucesso: true/false, mensagem: "..."}

    } catch (error) {
        console.error("Erro na requisição:", error);
        return { sucesso: false, mensagem: "Erro na requisição" };
    }
}