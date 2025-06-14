
let user = "test"
let passwd = "123"


document.addEventListener("DOMContentLoaded", () => {
    editNameUser()
})


async function editNameUser() {
        document.getElementById("dropdown-username").innerText = user
    }
