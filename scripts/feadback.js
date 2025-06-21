import { editUser } from '../scripts/updateUser.js'
import { getConnectionFetch } from './connectionFetch.js'


editUser();


document.getElementById("button-send-feedback").addEventListener("click", (e) => {
    e.preventDefault();
    sendFeedback()

})


function sendFeedback() {
    let nome = document.getElementById("name-insert").value
    let email = document.getElementById("email-insert").value
    let escola = document.getElementById("school-insert").value
    let assunto = document.getElementById("subject-insert").value
    let mensagem = document.getElementById("message-insert").value
    let nota_plataforma = document.getElementById("rating-insert").value

    // console.log(nome, nota_plataforma)


    fetch(`${getConnectionFetch()}users/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome: nome,
            email: email,
            escola: escola,
            assunto: assunto,
            mensagem: mensagem,
            nota_plataforma: nota_plataforma
        })
    })
        .then(res => res.json())
        .then(data => alert(data.mensagem))
        .catch(err => console.error("Erro:", err));
}