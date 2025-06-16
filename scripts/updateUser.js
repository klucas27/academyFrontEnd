import { getConnectionFetch } from './connectionFetch.js'

const token = sessionStorage.getItem('token');


export async function editUser() {

    // fetch(`${getConnectionFetch()}users/private`, {
    //     method: "GET",
    //     headers: {
    //         "Authorization": `Bearer ${token}`
    //     }
    // })

    const username = sessionStorage.getItem("user")

    try {
        const response = await fetch(`${getConnectionFetch()}users/private`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ username })
        });

        const data = await response.json();

        if (data.sucesso) {
            console.log(data.mensagem);
            document.getElementById("dropdown-username").innerText = username;
            document.getElementById("life-counts").innerText = data.life;
            document.getElementById("points-counts").innerText = data.points;
        }

        // if (result.sucesso) {
        //     document.getElementById('register-message').textContent = result.mensagem;
        // } else {
        //     document.getElementById('register-message').textContent = "Erro: " + result.mensagem;
        // }

    } catch (error) {
        console.error("Erro:", error);
        // document.getElementById('mensagem').textContent = "Erro ao registrar.";
    }




    // .then(response => response.json())
    // .then(data => {
    //     if (!data.sucesso) {
    //         alert("Acesso negado. Faça login novamente.");
    //         window.location.href = "index.html";
    //     } else {

    //     }
    // })
    // .catch(err => {
    //     console.error("Erro:", err);
    //     window.location.href = "index.html";
    // });
}
