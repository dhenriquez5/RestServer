const bcrypt = require('bcryptjs');
const { response, request } = require('express');
const Usuario = require('../models/usuario');


const getUsuario = async (req = request, res = response) => {
    const {limite= 5,desde=0}=req.query;
    const query ={estado:true};

    // const usuarios= await Usuario.find(query).limit(Number(limite)).skip(Number(desde));
    // const totalUsuarios= await Usuario.countDocuments(query);

    const [usuarios,total] = await Promise.all([
        Usuario.find(query).limit(Number(limite)).skip(Number(desde)),
        Usuario.countDocuments(query)
    ]);

    res.json({ ok: true, total,usuarios });
}


const postUsuario = async (req, res = response) => {

    const { nombre, password, correo, rol } = req.body;
    let usuario = new Usuario({ nombre, password, correo, rol });

    //encritpar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    //guardar
    await usuario.save();

    res.json({ ok: true, usuario });
}


const putUsuario = async(req, res = response) => {
    const id = req.params.id;
    const {_id,password, google,correo, ...rest } = req.body;

    //TODO VALIDAR CONTRA Bd

    if (password) {
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }

    const usuarioDb = await Usuario.findByIdAndUpdate(id,rest);

    res.json({ ok: true, usuarioDb });
}

const deleteUsuario = async(req, res = response) => {
    const id = req.params.id;

    //FISICAMENTE
    //const usuarioDb = await Usuario.findByIdAndDelete(id);

    const usuarioDb = await Usuario.findByIdAndUpdate(id,{estado:false})

    res.json({ ok: true,  usuarioDb});
}

const patchUsuario = (req, res = response) => {
    res.json({ ok: true, msg: 'patch Api-controller' });
}




module.exports = {
    getUsuario,
    deleteUsuario,
    patchUsuario,
    postUsuario,
    putUsuario

}