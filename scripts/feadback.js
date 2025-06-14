import {getInfosUsers} from './getUsers.js'

let user = getInfosUsers().user

document.addEventListener("DOMContentLoaded", () => {
    editNameUser()
})


async function editNameUser() {
        document.getElementById("dropdown-username").innerText = user
    }
