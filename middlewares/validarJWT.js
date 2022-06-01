const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({ msg: "No hay Token" })
    }
    try {
        const {uid}= jwt.verify(token,process.env.SECRETKEY);
        const usuarioAuth = await Usuario.findById(uid);

        if(!usuarioAuth) {
            res.status(401).json({ msg: "Token Invalido Usuario No Existe" })

        }

        //verifcar estado del usuario 
        if(!usuarioAuth.estado){
            res.status(401).json({ msg: "Token Invalido Usuario Desactivado" })
        }

        req.usuarioAuth = usuarioAuth;

        next();
    } catch (error) {
        return res.status(401).json({ msg: "Token Invalido" })
    }
}

module.exports = {
    validarJWT
}