const express = require('express');
const router = express.Router();
const turistasController = require('../controllers/turistasController');

//Ruta de pantalla Bievenida
router.get('/', turistasController.bienvenida);
//Ruta de pantalla Iniciar Sesion
router.get('/datos', turistasController.datos);
//Ruta para obtener datos de Inicio de Sesion
router.post('/login', turistasController.login);
//Ruta para hacer logout
router.get('/logout', turistasController.logout);
//Ruta para mostrar el mapa despues del login
router.get('/mapa', turistasController.mapa);
//Ruta de pantalla de registro
router.get('/formulario', turistasController.pedirdatos);
//Ruta de pantalla para mostrar perfil
router.get('/perfil', turistasController.perfil);
//Ruta para sacar infromacion para pantalla perfil
router.get('/informacionPerfil', turistasController.informacionPerfil);
//Ruta para modificar datos
router.patch('/actdatos', turistasController.actdatos);
//Ruta de pantalla de preferencias
router.get('/preferencias', turistasController.preferencias);
//Ruta de pantalla de Detalles
router.get('/detalles', turistasController.detalles);
//Ruta de pantalla de Favoritos
router.get('/favoritos', turistasController.favoritos);
// Ruta para el registro de turistas
router.post('/registro', turistasController.registrarTurista);
//Ruta para valdiacion de que el usuario no este en la BD
router.post('/usuario', turistasController.usuario);
//Ruta para eliminar turistas
router.delete('/eliminar', turistasController.eliminarTurista);
//Ruta de pantalla de recuperar contraseña
router.get('/recuperar', turistasController.recuperar);
//Ruta de pantalla de Historial
router.get('/historial', turistasController.historial);
//Ruta de pantalla de Itinerario
router.get('/itinerario', turistasController.itinerario);
//Ruta de pantalla para validar contraseña
router.get('/validar', turistasController.validar);
//Ruta para validar contraseña
router.post('/validarcontra', turistasController.validacioncontraseña);
//Ruta para preferencia
router.post('/pref', turistasController.registrarPreferencias);

module.exports = router;
