const express = require('express');
const router = express.Router();
const turistasController = require('../controllers/turistasController');

// Ruta para el registro de turistas
router.post('/registro', turistasController.registrarTurista);
//router.post('/autenticar', turistasController.autenticarUsuario);
module.exports = router;
