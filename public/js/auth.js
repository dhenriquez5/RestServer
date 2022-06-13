
const miform = document.querySelector('form');

miform.addEventListener('submit', ev => {
    ev.preventDefault();
    const formData = {};

    for (const el of miform) {
        if (el.name.length > 0) {
            formData[el.name] = el.value
        }
    }

    console.log(formData);
    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(resp => resp.json())
        .then(resp => {
            if (resp.msg) return console.error(resp.msg);

            localStorage.setItem('email', resp.usuario.correo);
            localStorage.setItem('token', resp.token);
            window.location = 'chat.html';

        })
        .catch(console.error)


})


function handleCredentialResponse(response) {

    // google token
    console.log(response);
    const body = { id_token: response.credential }
    fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .then(resp => {
            localStorage.setItem('email', resp.usuario.correo);
            localStorage.setItem('token', resp.token);
            window.location = 'chat.html';
        })
        .catch(console.error)
}

const button = document.getElementById('google-signout');
button.onclick = () => {
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect()

    google.accounts.id.revoke(localStorage.getItem('email'), () => {
        localStorage.clear();
        location.reload();
    })
}
