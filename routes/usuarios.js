const {Router}=require('express');
const { check } = require('express-validator');
const { getUsuario, postUsuario, putUsuario, deleteUsuario, patchUsuario } = require('../controllers/usuarios');
const { RoleValido, ExisteEmail, ExisteUsuarioId } = require('../helpers/db-validators');
const { useValidarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.get('/', getUsuario)
router.post('/',[
    check('correo','El Correo no es valido').isEmail(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y tener mas de 6 letras').isLength({min:6}),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(RoleValido),
    check('correo').custom(ExisteEmail),
    useValidarCampos
], postUsuario)
router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(ExisteUsuarioId),
    check('rol').custom(RoleValido),
    useValidarCampos,
], putUsuario)
router.delete('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(ExisteUsuarioId),
    useValidarCampos,
],deleteUsuario)
router.patch('/', patchUsuario)

module.exports =router;