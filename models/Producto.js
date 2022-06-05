const { Schema, model } = require('mongoose')

const ProductoSchema = Schema({
    nombre: { type: String, required: true, },
    estado: { type: Boolean, required: true, default: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    precio: { type: Number, default: 0 },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true },
})

module.exports = model('Producto', ProductoSchema);