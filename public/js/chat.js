
let usuario = null;
let socket = null;

//Referncias
const txtUid= document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnsalir= document.querySelector('#btnsalir');


const validarJWT = async () => {
    const token = localStorage.getItem('token') || '';

    if (token.length <= 10) {
        window.location='index.html';
        throw new Error('Invalid token');
    }

    const resp = await fetch('http://localhost:8080/api/auth/',{
        headers: {
            'x-token': token
        }
    });

    const data = await resp.json();
    console.log(data);
    localStorage.setItem('token',data.token)
    usuario = data.usuarioAuth;

    document.title=usuario.nombre;

    await conectarSocket();
}

const conectarSocket = async () => {
    socket =io({
        'extraHeaders':{
            'x-token':localStorage.getItem('token')
        }
    });

    socket.on('connect',() => {
        console.log('socket conected');
    })

    socket.on('disconnect',()=>{
        console.log('socket disconnect');
    })

    socket.on('recibir-mensajes',(payload)=>{
        console.log(payload)
        renderizarMensajes(payload)

    })

    socket.on('usuarios-activos',(payload)=>{
        renderizarUsuarios(payload);
    })

    socket.on('msje-privado',(payload)=>{
        console.log("Mensaje privado ",payload)
    })
    
}

const renderizarUsuarios = (usuarios=[])=>{
    let userHtml ='';
    usuarios.forEach(user =>{
        userHtml+=`
        <li>
            <p>
               <h5 class="text-success"> ${user.nombre} </h5>
               <span class="fs-6 text-muted" >${user.uid}</span>
            </p>
        </li>
        `;
    });
    ulUsuarios.innerHTML=userHtml;
}


const renderizarMensajes = (mensajes=[])=>{
    let msjeHtml ='';
    mensajes.forEach(m =>{
        msjeHtml+=`
        <li>
            <p>
               <h5 class="text-success"> ${m.mensaje} </h5>
               <span class="fs-6 text-muted" >${m.nombre}</span>
            </p>
        </li>
        `;
    });
    ulMensajes.innerHTML=msjeHtml;
}

txtMensaje.addEventListener('keyup',(evt)=>{
    const msje  = txtMensaje.value;
    const uid = txtUid.value;


    if(evt.keyCode!==13)return;

    if(msje.length===0) return;

    
    socket.emit('enviar-mensaje',{msje,uid})

    txtMensaje.value='';
})


const main = async () => {
    await validarJWT();
}

main();

//const socket =io();

