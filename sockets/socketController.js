const { Socket } = require('socket.io');

const { comprobarJWT } = require("../helpers/generarJWT");
const { ChatMensajes } = require("../models/chatMensajes");

const chatMensajes = new ChatMensajes();

const socketController = async (socket = new Socket(), io) => {

    //////////IO TODOS, LOS CLIENTES, (BROADCAST)
    ////////// SOCKET SOLO EL CLIENTE QUE ESTA INTERACTUANDO
    
    const usuario = await comprobarJWT(socket.handshake.headers['x-token']);

    if (!usuario) return socket.disconnect();

    //Agregar usuario conectado;
    chatMensajes.conectarUsuario(usuario);
    io.emit('usuarios-activos', chatMensajes.usuariosArr);
    socket.emit('recibir-mensajes',chatMensajes.ultimos10);

    ///CONERTARLO A UNA SALA PROPIA
    socket.join(usuario.id); //sala global,por socket.id y por id


    // Limpiar cuando alguein se desconectarUsuario
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(usuario.id);
        io.emit('usuarios-activos', chatMensajes.usuariosArr)
    })

    socket.on('enviar-mensaje',({uid,msje})=>{
        if(uid){
            //Mensaje privado
            socket.to(uid).emit('msje-privado',{de:usuario.nombre,msje})
        }else{
            chatMensajes.enviarMensaje(usuario.id,usuario.nombre,msje)
            io.emit('recibir-mensajes',chatMensajes.ultimos10);
        }
    })

}

module.exports = {
    socketController
}