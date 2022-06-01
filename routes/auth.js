const {Router}=require('express');
const { check } = require('express-validator');
const { Login, googleSignIn } = require('../controllers/auth');
const { useValidarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('correo','El Correo no es valido').isEmail(),
    check('password','La contraseña es obligatorio').not().isEmpty(),
    useValidarCampos,
    
],Login)

router.post('/google',[
    check('id_token','id_token es obligatorio').not().isEmpty(),
    useValidarCampos,
    
],googleSignIn)

module.exports =router;