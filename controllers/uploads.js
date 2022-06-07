const path = require('path');
const fs = require('fs');
const { response, request } = require('express');
const { subirArchivos } = require('../helpers/handleFiles');

const Producto = require('../models/Producto');
const Usuario = require('../models/usuario');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const cargarArchivo = async (req, res = response) => {
    const ExtensionesValidas = ['png', 'jpg', 'jpeg',];

    try {
        const resp = await subirArchivos(req.files, ExtensionesValidas, 'usuarios');

        res.json({ nombre: resp })
    } catch (error) {
        res.status(500).json({ msg: error })
    }


}

const ActualizarArchivo = async (req, res = response) => {

    const { coleccion, id } = req.params;


    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) return res.status(400).json({ msg: "No existe el usuario con este id " })
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) return res.status(400).json({ msg: "No existe el producto con este id " })
            break;
        default:
            return res.status(500).json({ msg: "Ha ocurrido un error al realizar la operacion" })
    }

    //Limpiar archivo previas 
    if (modelo.img) {
        //Borrar archivo del server
        const pathArchivo = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathArchivo)) {
            fs.unlinkSync(pathArchivo);
        }
    }

    const ExtensionesValidas = ['png', 'jpg', 'jpeg',];
    modelo.img = await subirArchivos(req.files, ExtensionesValidas, coleccion);

    await modelo.save();

    return res.json(modelo);
}

const ActualizarArchivoCloudinary = async (req, res = response) => {

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) return res.status(400).json({ msg: "No existe el usuario con este id " })
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) return res.status(400).json({ msg: "No existe el producto con este id " })
            break;
        default:
            return res.status(500).json({ msg: "Ha ocurrido un error al realizar la operacion" })
    }

    //Limpiar archivo previas 
    if (modelo.img) {
        //Borrar archivo del cloudnayr       
        const nombreArr= modelo.img.split('/');
        const nombreArchivo = nombreArr[nombreArr.length-1];
        const [public_id] = nombreArchivo.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const {secure_url} = await cloudinary.uploader.upload(req.files.archivo.tempFilePath);

    modelo.img =secure_url

    await modelo.save();

    return res.json(modelo);
}

const getArchivo = async (req, res) => {

    const { coleccion, id } = req.params;


    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) return res.status(400).json({ msg: "No existe el usuario con este id " })
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) return res.status(400).json({ msg: "No existe el producto con este id " })
            break;
        default:
            return res.status(500).json({ msg: "Ha ocurrido un error al realizar la operacion" })
    }

    //Limpiar archivo previas 
    if (modelo.img) {
        //Borrar archivo del server
        const pathArchivo = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathArchivo)) {
            return res.sendFile(pathArchivo)
        }
    }

    const defaultImg = path.join(__dirname, '../assets', 'no-image.jpg')
    return res.sendFile(defaultImg)

}

module.exports = {
    cargarArchivo,
    ActualizarArchivo,
    getArchivo,
    ActualizarArchivoCloudinary
}