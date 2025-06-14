import {getInfosUsers} from './getUsers.js'

let user = getInfosUsers().user
let passwd = getInfosUsers().passwd


document.getElementById("enter-button-login").addEventListener("click", (e) => {
    e.preventDefault();
    enterLogin();
})


function enterLogin() {
    const user_add = document.getElementById("usuario").value;
    const passwd_add = document.getElementById("senha").value;
    document.getElementById('login-error').classList.add('d-none');

    if (user_add == user && passwd_add == passwd) {
        console.log(user_add, passwd_add);
        window.location.href = "home.html"

    } else {
        document.getElementById('login-error').classList.remove('d-none');
    }

}
