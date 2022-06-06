const { response, request } = require('express');

const cargarArchivo =(req, res = response)=>{
    res.json({msg:"Cargando archivos"});
}

module.exports = {
    cargarArchivo
}