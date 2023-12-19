const express = require('express');
const path = require('path');
const router = express.Router();
const turistasController = require('../controllers/turistasController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/imgs/profiles');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});


const upload = multer({ storage: storage });

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
//Ruta de pantalla de preferencias de Actualizar Datos
router.get('/preferencias2', turistasController.preferencias2);
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
router.get('/correoRestaurar', turistasController.correoRestaurar);
//Ruta de pantalla de enviar correo de recuperacion contraseña
router.post('/enviarCodigoContrasena', turistasController.enviarCodigoContraseña);
//Ruta de pantalla de recuperar contraseña
router.get('/recuperar', turistasController.recuperar);
//Ruta de pantalla de recuperar contraseña
router.get('/cambiarContra', turistasController.cambiarContra);
//Ruta de pantalla de Historial
router.get('/historial', turistasController.historial);
//Ruta de pantalla de Itinerario
router.get('/itinerario', turistasController.itinerario);
//Ruta de pantalla para validar contraseña
router.get('/validar', turistasController.validar);
//Ruta de pantalla para validar contraseña
router.get('/verificarCuenta', turistasController.verificarCuenta);
//Ruta para agrregar datos de historial
router.post('/agregarHistorial', turistasController.agregarHistorial);
//Ruta para obtener datos de historial
router.get('/consultarHistorial', turistasController.consultarHistorial);
//Ruta para eliminar registros de historial
router.post('/eliminarHistorialIndividual', turistasController.eliminarHistorialIndividual);
//Ruta eliminar un historial completo
router.get('/eliminarHistorialCompleto', turistasController.eliminarHistorialCompleto);
//Ruta para validar contraseña
router.post('/validarcontra', turistasController.validacioncontraseña);
//Ruta para pantalla Actualizar Datos
router.get('/actualizar', turistasController.actualizar);
//Ruta para preferencia
router.post('/pref', turistasController.registrarPreferencias);
//Ruta para enviar correo
router.get('/enviarCorreo', turistasController.enviarCorreo);
//Ruta para enviar correo
router.get('/enviarCorreo2', turistasController.enviarCorreo2);
//Ruta para obtener datos de historial
router.get('/consultarPreferencias', turistasController.consultarPreferencias);
//Ruta para agrregar datos de historial
router.post('/agregarFavorito', turistasController.agregarFavorito);
//Ruta para obtener datos de historial
router.get('/consultarFavoritos', turistasController.consultarFavoritos);
//Ruta para eliminar registros de historial
router.post('/eliminarFavoritosIndividual', turistasController.eliminarFavoritosIndividual);
//Ruta eliminar un historial completo
router.get('/eliminarfavoritos', turistasController.eliminarfavoritos);
//Ruta para mostrar calendario
router.get('/calendario', turistasController.calendario);
//Ruta para mostrar pantalla para ingresar la Nueva contraseña
router.post('/nuevaContrasena', turistasController.nuevaContrasena);
//Ruta cambiar foto de perfil
router.post('/cambiarFoto', upload.single('avatar'), turistasController.cambiarFoto);
//Ruta para comparar Codigos
router.post('/compararCodigos', turistasController.compararCodigos)
//Ruta para comparar Codigos para restablecer contraseña
router.post('/compararCodigos2', turistasController.compararCodigos2)
//Ruta para agrregar datos de historial
router.post('/agregarItinerario', turistasController.agregarItinerario);
//Ruta para agrregar datos de historial
router.get('/diasItinerario', turistasController.diasItinerario);
//Ruta para agrregar datos de historial
router.get('/itinerarioDia', turistasController.itinerarioDia);
//Ruta para agrregar datos de historial
router.get('/consultarItinerario', turistasController.consultarItinerario);
router.get('/test', turistasController.test)
router.post('/consultarItinerarioFecha', turistasController.consultarItinerarioFecha)

module.exports = router;
