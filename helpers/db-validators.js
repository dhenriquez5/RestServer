const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/Producto');

const RoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) throw new Error("El rol no es valido");
}

const ExisteEmail = async (correo) => {
    const existeEmail = await Usuario.findOne({ correo: correo });
    if (existeEmail) throw new Error("El correo ya existe");
}

const ExisteUsuarioId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) throw new Error("El usuario no existe");
}

const ExisteCategoriaId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) throw new Error("La categoria no existe");
}

const ExisteProductoId = async (id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) throw new Error("La Producto no existe");
}

const colecionesPermitidas =async(coleccion='',colecionesPermitidas=[])=>{
    const incluida = colecionesPermitidas.includes(coleccion);
    if(! incluida) throw new Error ('La coleccion '+coleccion+' no es permitida');
    return true;
}

module.exports = {
    RoleValido,
    ExisteEmail,
    ExisteUsuarioId,
    ExisteCategoriaId,
    ExisteProductoId,
    colecionesPermitidas
}