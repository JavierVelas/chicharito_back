const express = require('express');
const router = express.Router();
const noticiasController = require('../controllers/noticias.controller');

router.get('/obtenerNoticias', noticiasController.obtenerNoticias);
// router.get('/:id', noticiasController.obtenerNoticiaPorId);
router.post('/create', noticiasController.crearNoticia);
router.put('/update/:id', noticiasController.actualizarNoticia);
router.delete('/delete/:id', noticiasController.eliminarNoticia);

module.exports = router;