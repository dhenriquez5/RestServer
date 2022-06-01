const bcrypt = require('bcryptjs');
const { response, request } = require('express');
const { generarJWT } = require('../helpers/generarJWT');
const Usuario = require('../models/usuario');

const Login = async (req, res = response) => {

    const { correo, password } = req.body;
    try {
        //Validar si el email existe con
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) return res.status(400).json({ msg: "Usuario o Password no son correctos" })

        //Validar si el usuario esta activo
        if (!usuario.estado) return res.status(400).json({ msg: "Usuario o Password no son correctos" })
        //Verificar la contraseña 
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) return res.status(400).json({ msg: "Usuario o Password no son correctos" });

        //Generar el JWT

        const token = await generarJWT(usuario.id);

        return res.json({
            msg: "Login ok",
            usuario, 
            token
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error"
        })
    }


}

module.exports = {
    Login
}