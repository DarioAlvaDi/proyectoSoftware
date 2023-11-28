const express = require('express');
const router = express.Router();
const turistasController = require('../controllers/turistasController');

//Ruta de pantalla Bievenida
router.get('/', turistasController.bienvenida);
//Ruta de pantalla Iniciar Sesion
router.get('/datos', turistasController.datos);
//Ruta para obtener datos de Inicio de Sesion
router.post('/login', turistasController.login);
//Ruta para mostrar el mapa despues del login
router.get('/mapa', turistasController.mapa);
//Ruta de pantalla de registro
router.get('/formulario', turistasController.pedirdatos);
//Ruta de pantalla para mostrar perfil
router.get('/perfil', turistasController.perfil);
//Ruta de pantalla para modificar datos
router.get('/actualizar', turistasController.actualizardatos);
//Ruta para modificar datos
router.put('/actdatos', turistasController.actdatos);
//Ruta de pantalla de preferencias
router.get('/preferencias', turistasController.preferencias);
// router.get('/pantalla', turistasController.Inicio);
router.get('/detalles', turistasController.detalles);

//Ruta de pantalla de Favoritos
router.get('/favoritos', turistasController.favoritos);
// Ruta para el registro de turistas
router.post('/registro', turistasController.registrarTurista);
//Ruta para eliminar turistas
router.post('/eliminar', turistasController.eliminarTurista);

module.exports = router;
