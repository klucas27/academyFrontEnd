
const token = sessionStorage.getItem('token');


export async function editUser() {

    fetch("http://localhost:3006/users/private", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if (!data.sucesso) {
                alert("Acesso negado. Faça login novamente.");
                window.location.href = "index.html";
            } else {
                // console.log(data.mensagem);
                document.getElementById("dropdown-username").innerText = sessionStorage.getItem("user");
                document.getElementById("life-counts").innerText = data.life;
                document.getElementById("points-counts").innerText = data.points;
            }
        })
        .catch(err => {
            console.error("Erro:", err);
            window.location.href = "index.html";
        });
}
