import { getInfosUsers } from './getUsers.js'


document.getElementById("enter-button-login").addEventListener("click", (e) => {
    e.preventDefault();
    enterLogin();
})


async function enterLogin() {

    const user_add = document.getElementById("usuario").value;
    const passwd_add = document.getElementById("senha").value;
    document.getElementById('login-error').classList.add('d-none');

    const data = await getInfosUsers(user_add, passwd_add);

    if (data.sucesso === true) {

        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", user_add);

        window.location.href = "home.html"

    } else {
        document.getElementById('login-error').classList.remove('d-none');
    }

}
