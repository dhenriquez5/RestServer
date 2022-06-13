const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario'); 

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload,process.env.SECRETKEY,{
            expiresIn:'24h'
        },(err,token)=>{
            if(err) reject(err);
            resolve(token);
        })
    })
}


const comprobarJWT = async (token) => {
    try {
        if(  token.length < 10 ) {
            return null;
        }

        const {uid} = jwt.verify(token,process.env.SECRETKEY);

        const usuario = await Usuario.findById( uid );
        
        if ( usuario ) {
            if ( usuario.estado ) {
                return usuario;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }   
    catch(err) {
        return null;
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}