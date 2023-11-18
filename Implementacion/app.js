const express = require('express');
const bodyParser = require('body-parser');
const turistasRouter = require('./src/routes/turistas');
const cors = require('cors');
const app = express();
app.use(cors());
// Middleware para analizar solicitudes JSON
app.use(express.json());

// Middleware para analizar solicitudes con datos de formulario
app.use(express.urlencoded({ extended: true }));

// Usa el router de turistas en la ruta /turistas
app.use('/turistas', turistasRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
