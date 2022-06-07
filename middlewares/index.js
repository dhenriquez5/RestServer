const  useValidarCampos  = require('../middlewares/validar-campos');
const  validarJWT  = require('../middlewares/validarJWT');
const  validarRoles  = require('../middlewares/validarRoles');
const validarArchivoSubir = require('../middlewares/validar-uploads');


module.exports={
    ...useValidarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validarArchivoSubir
}