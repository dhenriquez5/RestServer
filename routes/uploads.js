const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, ActualizarArchivo, getArchivo } = require('../controllers/uploads');
const { colecionesPermitidas } = require('../helpers/db-validators');
const { validarArchivoSubir } = require('../middlewares');
const { useValidarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo)

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'No es un id valido').isMongoId(),
    check('coleccion').custom(c => colecionesPermitidas(c, ['usuarios', 'productos'])),
    useValidarCampos
], ActualizarArchivo)


router.get('/:coleccion/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('coleccion').custom(c => colecionesPermitidas(c, ['usuarios', 'productos'])),
    useValidarCampos
], getArchivo)

module.exports = router;