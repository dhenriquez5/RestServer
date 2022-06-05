const { response, request } = require('express');
const Producto = require('../models/Producto');

const getAllProductos = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const query = { estado: true };

    // const usuarios= await Usuario.find(query).limit(Number(limite)).skip(Number(desde));
    // const totalUsuarios= await Usuario.countDocuments(query);

    const [productos, total] = await Promise.all([
        Producto.find(query)
            .populate('usuario', ['nombre', 'rol'])
            .populate('categoria', 'nombre')
            .limit(Number(limite)).
            skip(Number(desde)),
        Producto.countDocuments(query)
    ]);

    res.json({ ok: true, total, productos, });

}

const getProductoById = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', ['nombre', 'rol'])
        .populate('categoria', 'nombre');

    return res.json(producto);
}

const SaveProductos = async (req, res = response) => {

    const { estado, usuario, ...body } = req.body;

    const productoExist = await Producto.findOne({ nombre: body.nombre });
    if (productoExist) return res.status(400).json({ msg: "El Producto" + productoExist.nombre + " ya existe" })

    const data = {
        ...body,
        nombre:body.nombre.toUpperCase(),
        usuario: req.usuarioAuth._id,
    }

    const newProducto = new Producto(data);
    await newProducto.save();

    return res.json(newProducto);

}

const UpdateProductos = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuarioAuth._id;

    const productoUpdated = await Producto.findByIdAndUpdate(id, data, { new: true });
    res.json(productoUpdated)
}

const DeleteProductos = async (req, res) => {
    const { id } = req.params;
    const productoDeleted = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(productoDeleted);
}

module.exports = {
    DeleteProductos,
    SaveProductos,
    UpdateProductos,
    getAllProductos,
    getProductoById
}