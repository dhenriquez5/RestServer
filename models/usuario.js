const {Schema,model} = require('mongoose')

const UsuarioSchema = Schema({
    nombre:{type: String, required: true},
    correo : {type: String, required: true,unique: true},
    password : {type: String, required: true},
    img:{type: String},
    rol: {type: String,required: true,enum:['ADMIN_ROLE','USER_ROLE']},
    estado:{type:Boolean, default:true},
    google: {type:Boolean, default:false}
});

UsuarioSchema.methods.toJSON = function(){
    const {__v,password,...rest}=this.toObject();
    return rest
}

module.exports= model('Usuario',UsuarioSchema);