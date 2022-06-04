const { response } = require("express");
const { request } = require("express");
const role = require("../models/role");

const isAdmin = (req=request, res = response,next)=>{

    if(!req.usuarioAuth){
        return res.status(500).json({ msg: "Error al obtener el token al validar el rol"})
    }

    const {rol,nombre} = req.usuarioAuth;

    if(rol!== 'ADMIN_ROLE'){
       return  res.status(401).json({ msg: `${nombre} no tiene permiso para ejecutar la accion` })
    }

    next();

}


const hasRole =(...roles)=>{

    return  (req=request, res = response,next)=>{

        if(!req.usuarioAuth){
            return res.status(500).json({ msg: "Error al obtener el token al validar el rol"})
        }
        const {rol,nombre} = req.usuarioAuth;
        
        if(!roles.includes(rol)) {
            return res.status(401).json({ msg:`${nombre} no tiene permiso para ejecutar la accion`});
        }

        next();
    }

}

module.exports ={
    isAdmin,
    hasRole
}