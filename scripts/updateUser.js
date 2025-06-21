import { getConnectionFetch } from './connectionFetch.js'

const token = sessionStorage.getItem('token');

document.getElementById("exit-main").addEventListener('click', (e) => {
    exitUser()
})


export async function editUser() {

    fetch(`${getConnectionFetch()}users/private`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if (!data.sucesso) {
                alert("Acesso negado. Faça login novamente.");
                window.location.href = "../index.html";
            } else {
                document.getElementById("dropdown-username").innerText = sessionStorage.getItem("user");

                if (data.usuario.life <= 0) {
                    alert("Você Perdeu todas as suas Vidas, seus pontos foram Restaurados!")
                    atualizarStatusUsuario(0, 0)
                    editUser()
                    document.getElementById("life-counts").innerText = `${data.usuario.life} Vidas`
                    document.getElementById("points-counts").innerText = `${data.usuario.points} pts`

                } else {
                    document.getElementById("life-counts").innerText = `${data.usuario.life} Vidas`
                    document.getElementById("points-counts").innerText = `${data.usuario.points} pts`
                }
            }
        })
        .catch(err => {
            console.error("Erro:", err);
            window.location.href = "../index.html";
        });
}


export async function atualizarStatusUsuario(life = null, points = null) {
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('user');

    try {
        const response = await fetch(`${getConnectionFetch()}users/updateStats`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, life, points })
        });

        const data = await response.json();

        // if (data.sucesso) {
        //     console.log(data.mensagem);
        // } else {
        //     console.warn("Falha ao atualizar:", data.mensagem);
        // }

    } catch (error) {
        console.error("Erro na atualização:", error);
    }
}



function exitUser() {

    sessionStorage.clear();
    window.location.href = '../index.html';
}