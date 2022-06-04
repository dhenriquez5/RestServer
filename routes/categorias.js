const { Router } = require('express');
const { check } = require('express-validator');
const { getAllCategorias, getCategoriaById, SaveCategorias, UpdateCategorias, DeleteCategorias } = require('../controllers/categorias');
const { ExisteCategoriaId } = require('../helpers/db-validators');

const { hasRole, isAdmin, validarJWT, useValidarCampos } = require('../middlewares/index');

const router = Router();

router.get('/', [], getAllCategorias)

router.get('/:id', [
    check('id').custom(ExisteCategoriaId),
    useValidarCampos
], getCategoriaById)

router.post('/', [
    validarJWT,
    check("nombre", "El nombre debe ser requerido").not().isEmpty(),
    useValidarCampos
], SaveCategorias)

router.put('/:id', [
    validarJWT,
    check("nombre", "El nombre debe ser requerido").not().isEmpty(),
    check('id').custom(ExisteCategoriaId),
    useValidarCampos
], UpdateCategorias)

router.delete('/:id', [
    validarJWT,
    isAdmin,
    check('id').custom(ExisteCategoriaId),
    useValidarCampos

], DeleteCategorias)



module.exports = router;