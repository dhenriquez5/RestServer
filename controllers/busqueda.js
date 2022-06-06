const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require("../models/Producto");


const coleccionesPermitidas = ['usuarios', 'categorias', 'productos', 'roles'];

const buscarUsuarios = async (termino = '', res = response) => {
    const isMongoId = ObjectId.isValid(termino);
    if (isMongoId) {
        const usuarios = await Usuario.findById(termino);
        return res.json({
            results: usuarios ? [usuarios] : []
        });
    }

    const regex = new RegExp(termino, 'i')

    //buscar por nombre o correo
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });
    return res.json({
        count: usuarios.length,
        results: usuarios ? [usuarios] : [],
    });

}

const buscarCategorias = async (termino = '', res = response) => {
    const isMongoId = ObjectId.isValid(termino);
    if (isMongoId) {
        const categorias = await Categoria.findById(termino);
        return res.json({
            results: categorias ? [categorias] : []
        });
    }

    const regex = new RegExp(termino, 'i')

    //buscar por nombre o correo
    const categorias = await Categoria.find({
        nombre: regex,
        estado: true
    });
    return res.json({
        count: categorias.length,
        results: categorias ? [categorias] : [],
    });
}

const buscarProductos = async (termino = '', res = response) => {
    const isMongoId = ObjectId.isValid(termino);
    if (isMongoId) {
        const productos = await Producto.findById(termino).populate('categoria','nombre');
        return res.json({
            results: productos ? [productos] : []
        });
    }

    const regex = new RegExp(termino, 'i')

    //buscar por nombre o correo
    const productos = await Producto.find({
        nombre: regex,
        estado: true
    }).populate('categoria','nombre');
    return res.json({
        count: productos.length,
        results: productos ? [productos] : [],
    });
}


const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({ msg: `Las colecciones permitidas son ${coleccionesPermitidas} ` });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;

        case 'roles':

            break;

        default:
            return res.status(500).json({ msg: "Ha ocurrido un error con el proceso" })
    }
}

module.exports = {
    buscar
}