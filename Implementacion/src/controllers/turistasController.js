const mysql = require('mysql')
const path = require('path');

// Configuración de la conexión a MySQL con piscina de conexiones
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'AD_SISTEMAS'
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
    turista.Nombre,
    turista.AP,
    turista.AM,
    turista.exampleInputEmail1,
    turista.Teléfono,
    turista.Usuario,
    turista.pass,
  ];

  try {
    // Realizar la inserción en la base de datos
    const results = await new Promise((resolve, reject) => {
      pool.query(sql, values, (error, results) => {
        console.log(turista)
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    // Verificar si se insertaron filas en la base de datos
    if (results.affectedRows > 0) {
      // Redirigir a la página de Preferencias si la inserción fue exitosa
      res.sendFile(path.join(__dirname, '../../public/html/Preferencias.html'));
    } else {
      // Manejar el caso en que no se insertaron filas
      res.status(400).json({ error: 'No se pudo registrar al turista' });
    }
  } catch (error) {
    console.error('Error en la conexión con la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador pantalla de Inicio
const bienvenida = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/bienvenida.html'));
}

// Controlador pantalla de Login
const datos = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/Login.html'));
}

// AUTENTICACION DE USUARIO(LOGIN)
const login = (req, res, next) => {
  console.log('Recibiendo solicitud de login...');
  const turista = req.body;

  const sql = 'SELECT * FROM Turista WHERE correo = ? AND pass = ?';
  const values = [turista.correo, turista.pass];

  pool.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error en la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    if (results.length > 0) {
      console.log('Turista encontrado');
      res.sendFile(path.join(__dirname, '../../public/html/pantallaPrincipal.html'));
    } else {
      console.log('Turista no encontrado');
      res.sendFile(path.join(__dirname, '../../public/html/Login.html'));
    }
  });
};

// Controlador pantalla de Registro
const mapa = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/pantallaPrincipal.html'));
}

// Controlador pantalla de Registro
const pedirdatos = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/registro.html'));
}

//Controlador pantalla de perfil
const perfil = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/PantallPerfil.html'));
}

//Controlador pantalla de perfil
const actualizardatos = async (req, res) => {
  res.sendFile(path.join(__dirname, '..'));
}

// Función para realizar cambios en la tabla Turista
const actdatos = async (req, res) => {
  // Cambios en el campo `Nombre`
  connection.query(
    'ALTER TABLE Turista MODIFY COLUMN Nombre VARCHAR(100) NOT NULL',
    (err, results) => {
      if (err) {
        console.error('Error al modificar el campo Nombre:', err);
      } else {
        console.log('Campo Nombre modificado correctamente');
      }
    }
  );

  // Cambios en el campo `Telefono`
  connection.query(
    'ALTER TABLE Turista MODIFY COLUMN Telefono VARCHAR(15) NOT NULL',
    (err, results) => {
      if (err) {
        console.error('Error al modificar el campo Telefono:', err);
      } else {
        console.log('Campo Telefono modificado correctamente');
      }
    }
  );

  // Cambios en el campo `pass`
  connection.query(
    'ALTER TABLE Turista MODIFY COLUMN pass VARCHAR(20) NOT NULL',
    (err, results) => {
      if (err) {
        console.error('Error al modificar el campo pass:', err);
      } else {
        console.log('Campo pass modificado correctamente');
      }
    }
  );
}

//Controlador pantalla preferencias
const preferencias = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/Preferencias.html'));
}

const eliminarTurista = async (req, res, next) => {
  const turistaId = req.body.id;
  console.log(turistaId);
  const sql = `
    DELETE FROM Turista
    WHERE Id_Turista = ?
  `;

  try {
    await new Promise((resolve, reject) => {
      pool.query(sql, [turistaId], (error, results) => {
        if (error) {
          console.error('Error al eliminar turista:', error);
          reject(error);
        } else {
          console.log('Turista eliminado con éxito');
          resolve(results);
        }
      });
    });

    res.status(200).json({ message: 'Turista eliminado con éxito' });
  } catch (error) {
    console.error('Error en la conexión con la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  bienvenida,
  datos,
  pedirdatos,
  login,
  mapa,
  perfil,
  actualizardatos,
  actdatos,
  registrarTurista,
  preferencias,
  eliminarTurista
}