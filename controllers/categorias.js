const { response, request } = require('express');
const Categoria = require('../models/categoria');

const getAllCategorias = async(req, res = response) => {

    const {limite= 5,desde=0}=req.query;

    const query ={estado:true};

    // const usuarios= await Usuario.find(query).limit(Number(limite)).skip(Number(desde));
    // const totalUsuarios= await Usuario.countDocuments(query);

    const [categorias,total] = await Promise.all([
        Categoria.find(query)
        .populate('usuario',['nombre','rol'])
        .limit(Number(limite)).
        skip(Number(desde)),
        Categoria.countDocuments(query)
    ]);

    res.json({ ok: true, total,categorias });

}

const getCategoriaById = async(req, res = response) => {
    const {id}= req.params;
    const categoria  =await Categoria.findById(id).populate('usuario',['nombre','rol'])
    return res.json(categoria)
}

const SaveCategorias = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categriaExist = await Categoria.findOne({ nombre: nombre });
    if (categriaExist) return res.status(400).json({ msg: "La categoria " + categriaExist.nombre + " ya existe" })

    const data = {
        nombre,
        usuario : req.usuarioAuth._id,
    }

    const newcategoria = new Categoria(data);

    await newcategoria.save();

    return res.json(newcategoria);
}

const UpdateCategorias =async (req, res = response) => {

    const {id} = req.params;
    const {estado,usuario,...data} = req.body;

    data.nombre= data.nombre.toUpperCase();
    data.usuario = req.usuarioAuth._id;

    const categoriaUpdated = await Categoria.findByIdAndUpdate(id,data,{new:true});
    res.json(categoriaUpdated);
}

const DeleteCategorias = async (req, res = response) => {
    const {id} = req.params;
    const categoriaDeleted = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true});
    return res.json(categoriaDeleted );
}
module.exports = {
    getAllCategorias,
    getCategoriaById,
    SaveCategorias,
    UpdateCategorias,
    DeleteCategorias
}