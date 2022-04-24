const { validationResult } = require("express-validator");
const {response,request}=require('express');


const useValidarCampos=(req=request,res=response,next)=>{
    const errors =validationResult(req, res);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next();

}

module.exports={
    useValidarCampos
}