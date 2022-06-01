const bcrypt = require('bcryptjs');
const { response, request } = require('express');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/googleVerify');
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

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const {name,picture,email,given_name,family_name} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo:email});

        if(!usuario){
            ///crearlo
            const data={
                nombre:name,
                correo:email,
                password:'guiño-guiño',
                img:picture,
                google:true,
                rol:'USER_ROLE'
            }
            usuario= new Usuario(data);
            await usuario.save();
        }

        ///SI EL USUARIO EN DB NO ESTA ACTIVO
        if(!usuario.estado){
            return res.status(401).json({ msg:"Usuario Inhabilitado"})
        }

        const token = await generarJWT(usuario.id);

        res.json({ msg: "Google Login ok", usuario,token })

    } catch (error) {
        res.status(400).json({ msg: "El token no se pudo verificar",ok:false})
    }



}

module.exports = {
    Login,
    googleSignIn
}