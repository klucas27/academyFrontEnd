import { getConnectionFetch } from './connectionFetch.js'


const form = document.getElementById('form-register');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username-insert').value;
    const passwd = document.getElementById('password-insert').value;

    try {
        const response = await fetch(`${getConnectionFetch()}users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, passwd })
        });

        const result = await response.json();

        if (result.sucesso) {
            document.getElementById('register-message').textContent = result.mensagem;
        } else {
            document.getElementById('register-message').textContent = "Erro: " + result.mensagem;
        }

    } catch (error) {
        console.error("Erro:", error);
        document.getElementById('mensagem').textContent = "Erro ao registrar.";
    }
});
