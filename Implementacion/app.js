const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan')
const session = require('express-session')
const crypto = require('crypto');
const turistasRouter = require('./src/routes/turistas');
// const cors = require('cors');
// app.use(cors());

const app = express();


// Middleware para analizar peticiones
//app.use(morgan("dev"));
// Middleware para analizar solicitudes JSON
app.use(express.json());
// Middleware para analizar solicitudes con datos de formulario
app.use(express.urlencoded({ extended: true }));

// Generar una cadena secreta única y segura
const secret = crypto.randomBytes(64).toString('hex');

// Configuración de express-session
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Configuración de la cookie, ajusta según tus necesidades
}));

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configurar una ruta estática para los archivos HTML
app.use('/turistas', express.static(path.join(__dirname, '../public/html')));
app.use('/turistas/registro', express.static(path.join(__dirname, '../public/html/registro')));

// Middleware para configurar la CSP
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 'font-src \'self\' http://localhost:3000');
  next();
});

// Usa el router de turistas en la ruta /turistas
app.use('/turistas', turistasRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
