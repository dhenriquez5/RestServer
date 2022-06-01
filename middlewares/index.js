const  useValidarCampos  = require('../middlewares/validar-campos');
const  validarJWT  = require('../middlewares/validarJWT');
const  validarRoles  = require('../middlewares/validarRoles');

module.exports={
    ...useValidarCampos,
    ...validarJWT,
    ...validarRoles,
}