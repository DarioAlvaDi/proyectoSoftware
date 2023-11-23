const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const turistasRouter = require('./src/routes/turistas');
// const cors = require('cors');
// app.use(cors());

const app = express();

// Middleware para analizar solicitudes JSON
app.use(express.json());
// Middleware para analizar solicitudes con datos de formulario
app.use(express.urlencoded({ extended: true }));

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configura una ruta estática para tus archivos HTML
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
