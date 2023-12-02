const { Session } = require('inspector');
const mysql = require('mysql')
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Configuración de la conexión a MySQL con piscina de conexiones
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'said153',
  database: 'AD_SISTEMAS'
});

// Controlador para registrar un nuevo turista
const registrarTurista = async (req, res) => {
  const turista = req.body;
    // Si el nombre de usuario no existe, proceder con la inserción en la base de datos
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
    const hashedPass= await bcrypt.hash(turista.pass, saltRounds);

    const values = [
      turista.Nombre,
      turista.AP,
      turista.AM,
      turista.exampleInputEmail1,
      turista.Teléfono,
      turista.Usuario,
      hashedPass,
    ];

    const results = await new Promise((resolve, reject) => {
      pool.query(sql, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (results.affectedRows > 0) {
          const sqlUltimoTurista = `
            SELECT Id_Turista
            FROM Turista
            ORDER BY Id_Turista DESC
            LIMIT 1
          `;
          pool.query(sqlUltimoTurista, (errorUltimoTurista, resultadosUltimoTurista) => {
        if (errorUltimoTurista) {
          res.status(400).json({ error: 'No se pudo obtener el último Id_Turista' });
        } else {
          req.session.Id_Turista = resultadosUltimoTurista[0].Id_Turista;
          res.sendFile(path.join(__dirname, '../../public/html/Preferencias.html'));
        }
      })
    } else {
      res.status(400).json({ error: 'No se pudo registrar al turista' });
    }
  } 

//Controlador para verficar si existe un usuario previamente en la BD
const usuario = async (req, res) => {
  const turista = req.body.Usuario;
  const correo = req.body.Correo;
  console.log(req.body.Usuario);
  console.log(correo);

  // Verificar si el nombre de usuario o el correo ya existe en la base de datos
  const checarExistencia = 'SELECT COUNT(*) as count FROM Turista WHERE usuario = ? OR correo = ?';
  const checarExistenciaValores = [turista, correo];

  try {
    const checarExistenciaResultado = await new Promise((resolve, reject) => {
      pool.query(checarExistencia, checarExistenciaValores, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    console.log(checarExistenciaResultado[0]);
    // Si el nombre de usuario o el correo ya existe, devolver un false
    if (checarExistenciaResultado[0].count > 0) {
      let type = '';
      if (await checkUsernameExists(turista)) {
        type = 'usuario';
      } else if (await checkCorreoExists(correo)) {
        type = 'correo';
      }

      res.status(200).json({ exists: true, type });
    } else {
      res.status(201).json({ exists: false, type: '' });
    }
  } catch (error) {
    console.error('Error en la conexión con la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

async function checkUsernameExists(username) {
  const checkUsernameQuery = 'SELECT COUNT(*) as count FROM Turista WHERE usuario = ?';
  const checkUsernameValues = [username];

  const usernameCheckResult = await new Promise((resolve, reject) => {
    pool.query(checkUsernameQuery, checkUsernameValues, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

  return usernameCheckResult[0].count > 0;
}

async function checkCorreoExists(correo) {
  const checkCorreoQuery = 'SELECT COUNT(*) as count FROM Turista WHERE correo = ?';
  const checkCorreoValues = [correo];

  const correoCheckResult = await new Promise((resolve, reject) => {
    pool.query(checkCorreoQuery, checkCorreoValues, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

  return correoCheckResult[0].count > 0;
}

// Controlador pantalla de Inicio
const bienvenida = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/bienvenida.html'));
}

// Controlador pantalla de Login
const datos = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/Login.html'));
}

// AUTENTICACION DE USUARIO(LOGIN)
const login = async (req, res, next) => {
  console.log('Recibiendo solicitud de login...');
  const turista = req.body;

  const sql = 'SELECT * FROM Turista WHERE correo = ?';
  const values = [turista.correo];

  try {
    const results = await new Promise((resolve, reject) => {
      pool.query(sql, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (results.length > 0) {
      const storedHashedPass = results[0].pass;

      // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
      const match = await bcrypt.compare(turista.pass, storedHashedPass);

      if (match) {
        console.log('Turista encontrado');
        res.sendFile(path.join(__dirname, '../../public/html/pantallaPrincipal.html'));
      } else {
        console.log('Contraseña incorrecta');
        res.sendFile(path.join(__dirname, '../../public/html/Login.html'));
      }
    } else {
      console.log('Turista no encontrado');
      res.sendFile(path.join(__dirname, '../../public/html/Login.html'));
    }
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// Controlador para logout y destruye las variables de sesion
const logout = async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Sesion destruida')
      res.redirect('/turistas');
    }
  });
}
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

// Controlador para la página de perfil
const informacionPerfil = async (req, res) => {
  try {
    // Obtener el Id_Turista de la variable de sesión
    const turistaId = req.session.Id_Turista;

    // Consulta para obtener la información del turista
    const turistaInfo = await obtenerInformacionTurista(turistaId);
    console.log(turistaInfo)
    // Enviar la información del turista como respuesta JSON
    res.json(turistaInfo);

  } catch (error) {
    console.error('Error en el controlador de perfil:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para obtener la información del turista desde la base de datos
const obtenerInformacionTurista = (turistaId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT Nombre, A_Paterno, A_Materno, Correo, Telefono FROM Turista WHERE Id_Turista = ?';
    const values = [turistaId];

    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else if (results.length > 0) {
        resolve(results[0]);
      } else {
        reject(new Error('Turista no encontrado'));
      }
    });
  });
};

//Controlador pantalla de actualizar datos
const actualizardatos = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/PantallaActulizarDatos.html'));
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
// Controlador pantalla detalles
const detalles = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/detallesLugar.html'));
}
//Controlador pantalla preferencias
const preferencias = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/Preferencias.html'));
}

// Controlador para insertar Preferencias en BD
const registrarPreferencias = async (req, res) => {
      const turistaId = req.session.Id_Turista;
  console.log(turistaId)
      const preferencia = req.body.preferencias || [];
      console.log(preferencia);
      // Si el nombre de usuario no existe, proceder con la inserción en la base de datos
      const sql = `
        INSERT INTO Preferencias (
          Nombre,
          Id_Turista
        ) VALUES (?, ?)
      `;

      preferencia.forEach((preference) => {
        pool.query(sql, [preference, turistaId], (err, result) => {
          if (err) throw err;
        });
      });
      res.redirect('/turistas/mapa');    
};

//Controlador pantalla favoritos
const favoritos = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/PantallaFavoritos.html'));
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

//Controlador pantalla recuperar contraseña
const recuperar = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/recuperarContrasenia.html'));
}

//Controlador pantalla recuperar contraseña
const historial = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/pantallaHistorial.html'));
}

//Controlador pantalla itinerario
const itinerario = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/dias_itinerario.html'));
}

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
  eliminarTurista,
  detalles,
  favoritos,
  usuario,
  registrarPreferencias,
  informacionPerfil,
  logout,
  recuperar,
  historial,
  itinerario
}
