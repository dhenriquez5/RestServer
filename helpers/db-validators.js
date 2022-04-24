const Role = require('../models/role');
const Usuario = require('../models/usuario');

const RoleValido=async (rol='')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol) throw new Error("El rol no es valido");
}

const ExisteEmail = async(correo)=>{
    const existeEmail = await Usuario.findOne({correo:correo});
    if(existeEmail) throw new Error("El correo ya existe");
}

const ExisteUsuarioId = async(id)=>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario) throw new Error("El usuario no existe");
}


module.exports ={
    RoleValido,
    ExisteEmail,
    ExisteUsuarioId
}