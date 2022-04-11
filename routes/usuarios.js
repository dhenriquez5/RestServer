const {Router}=require('express');
const { getUsuario, postUsuario, putUsuario, deleteUsuario, patchUsuario } = require('../controllers/usuarios');
const router = Router();

router.get('/', getUsuario)
router.post('/', postUsuario)
router.put('/:id', putUsuario)
router.delete('/',deleteUsuario)
router.patch('/', patchUsuario)

module.exports =router;