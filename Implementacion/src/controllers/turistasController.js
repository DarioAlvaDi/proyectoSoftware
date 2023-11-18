const mysql = require('mysql');

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Da18rio',
  database: 'beyamaps'
});

// Controlador para registrar un nuevo turista
const registrarTurista = async (req, res) => {
  const turista = req.body;

  const sql = `
    INSERT INTO Turista (
      nombre,
      a_paterno,
      a_materno,
      correo,
      telefono,
      usuario,
      pass
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    turista.nombre,
    turista.a_paterno,
    turista.a_materno,
    turista.correo,
    turista.telefono,
    turista.usuario,
    turista.pass,
  ];

  try {
    await new Promise((resolve, reject) => {
      connection.query(sql, values, (error, results) => {
        if (error) {
          console.error('Error al insertar turista:', error);
          reject(error);
        } else {
          console.log('Turista registrado con éxito');
          resolve(results);
        }
      });
    });

    res.status(201).json({ message: 'Turista registrado con éxito' });
  } catch (error) {
    console.error('Error en la conexión con la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
/*
//AUTENTICACION DE USUARIO(LOGIN)
app.post('/', encoder, function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  
  connection.query("SELECT * FROM Turista WHERE Correo = ? AND Contraseña = ?", [username, password], function(error, results, fields){
      if(results.length > 0){
          res.redirect("/pantallaPrincipal");
      } else{
          res.redirect("/");
      }
      res.end();
  });
});


app.get("/pantallaPrincipal", function(req,res){
  res.sendFile(__dirname + "/pantallaPrincipal.html");
})
*/



module.exports = {
  registrarTurista
};
