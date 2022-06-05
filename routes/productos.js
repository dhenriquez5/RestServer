const { Router } = require('express');
const { check } = require('express-validator');

const { hasRole, isAdmin, validarJWT, useValidarCampos } = require('../middlewares/index');
const { ExisteCategoriaId, ExisteProductoId } = require('../helpers/db-validators');
const { getProductoById, SaveProductos, UpdateProductos, DeleteProductos, getAllProductos } = require('../controllers/productos');

const router = Router();

router.get('/', [], getAllProductos)

router.get('/:id', [
    check('id').custom(ExisteProductoId),
    useValidarCampos
], getProductoById)

router.post('/', [
    validarJWT,
    check("nombre", "El nombre debe ser requerido").not().isEmpty(),
    check('categoria').custom(ExisteCategoriaId),
    useValidarCampos
], SaveProductos)

router.put('/:id', [
    validarJWT,    
    check("nombre", "El nombre debe ser requerido").not().isEmpty(),
    check('id').custom(ExisteProductoId),
    check('categoria').custom(ExisteCategoriaId),
    useValidarCampos
], UpdateProductos)

router.delete('/:id', [
    validarJWT,
    isAdmin,
    check('id').custom(ExisteProductoId),
    useValidarCampos
], DeleteProductos)


module.exports = router;