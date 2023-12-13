const { Session } = require('inspector');
const mysql = require('mysql')
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require("nodemailer");
//Hola pichula
// Configuración de la conexión a MySQL con piscina de conexiones
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '120manies',
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
  const hashedPass = await bcrypt.hash(turista.pass, saltRounds);
  console.log(hashedPass);
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

//Controlador para verificar si el user existe
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

//Controlador para verificar si el correo existe
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
  res.sendFile(path.join(__dirname, '../../public/html/IU01 Pantalla incial.html'));
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
      const turistaId = results[0].Id_Turista
      req.session.Id_Turista = turistaId
      const storedHashedPass = results[0].pass;
      console.log(turistaId)
      // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
      const match = await bcrypt.compare(turista.pass, storedHashedPass);

      if (match) {
        console.log('Turista encontrado');
        res.status(200).json({ message: 'Autenticación exitosa' });
      } else {
        console.log('Contraseña incorrecta');
        // Enviar respuesta JSON indicando que la autenticación falló
        res.status(401).json({ message: 'Contraseña incorrecta' });
      }
    } else {
      console.log('Turista no encontrado');
      // Enviar respuesta JSON indicando que el turista no fue encontrado
      res.status(404).json({ message: 'Turista no encontrado' });
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
    const sql = 'SELECT Usuario, Nombre, A_Paterno, A_Materno, Correo, Telefono FROM Turista WHERE Id_Turista = ?';
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

// Función para realizar cambios en la tabla Turista
const actdatos = async (req, res) => {
  const { Id_Turista, Nombre, Telefono } = req.body; // Asegúrate de tener los datos adecuados

  try {
    // Actualizar el campo `Nombre`
    await new Promise((resolve, reject) => {
      connection.query(
        'UPDATE Turista SET Nombre = ? WHERE Id_Turista = ?',
        [Nombre, Id_Turista],
        (err, results) => {
          if (err) {
            console.error('Error al actualizar el campo Nombre:', err);
            reject(err);
          } else {
            console.log('Campo Nombre actualizado correctamente');
            resolve(results);
          }
        }
      );
    });

    // Actualizar el campo `Telefono`
    await new Promise((resolve, reject) => {
      connection.query(
        'UPDATE Turista SET Telefono = ? WHERE Id_Turista = ?',
        [Telefono, Id_Turista],
        (err, results) => {
          if (err) {
            console.error('Error al actualizar el campo Telefono:', err);
            reject(err);
          } else {
            console.log('Campo Telefono actualizado correctamente');
            resolve(results);
          }
        }
      );
    });

    res.status(200).json({ message: 'Datos actualizados correctamente' });
  } catch (error) {
    console.error('Error en la actualización de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }

  // // Cambios en el campo `pass`
  // connection.query(
  //   'ALTER TABLE Turista MODIFY COLUMN pass VARCHAR(20) NOT NULL',
  //   (err, results) => {
  //     if (err) {
  //       console.error('Error al modificar el campo pass:', err);
  //     } else {
  //       console.log('Campo pass modificado correctamente');
  //     }
  //   }
  // );
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
};

//Controlador pantalla favoritos
const favoritos = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/PantallaFavoritos.html'));
}

//Controlador para eliminar Turista
const eliminarTurista = async (req, res, next) => {
  const turistaId = req.session.Id_Turista;
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

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error en la conexión con la base de datos:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

//Controlador pantalla recuperar contraseña
const recuperar = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/correoRestaurarContraseña.html'));
}

//Controlador para ruta de historial
const historial = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/pantallaHistorial.html'));
}

//Controlador pantalla itinerario
const itinerario = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/dias_itinerario.html'));
}
//Controlador pantalla itinerario
const actualizar = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/PantallaActulizarDatos.html'));
}
// Controlador para registrar un nuevo turista
const agregarHistorial = async (req, res) => {
  const turista = req.session.Id_Turista;
  // Si el nombre de usuario no existe, proceder con la inserción en la base de datos
  const sql = `
      INSERT INTO Historial_busqueda (
        Id_google,
        Fecha,
        Hora,
        Id_Turista
      ) VALUES (?, ?, ?, ?)
    `;
  const values = [
    req.body.id,
    null,
    null,
    turista,
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
    console.log('Historial registrado correctamente');
  } else {
    res.status(400).json({ error: 'No se pudo registrar en el historial' });
  }
}

// Controlador para la página de perfil
const consultarHistorial = async (req, res) => {
  try {
    // Obtener el Id_Turista de la variable de sesión
    const turistaId = req.session.Id_Turista;

    // Consulta para obtener la información del turista
    const infoHistorial = await obtenerHistorial(turistaId);
    console.log(infoHistorial)
    // Enviar la información del turista como respuesta JSON
    res.json(infoHistorial);

  } catch (error) {
    console.error('Error en el controlador de historial', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para obtener la información del turista desde la base de datos
const obtenerHistorial = (turistaId) => {

  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Historial_busqueda WHERE Id_Turista = ?';
    const values = [turistaId];

    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else if (results.length > 0) {
        resolve(results);
      } else {
        reject(new Error('Historial no encontrado'));
      }
    });
  });
};


const eliminarHistorialCompleto = async (req, res, next) => {
  const turistaId = req.session.Id_Turista;
  const sql = `
    DELETE FROM Historial_busqueda
    WHERE Id_Turista = ?
  `;

  try {
    await new Promise((resolve, reject) => {
      pool.query(sql, [turistaId], (error, results) => {
        if (error) {
          console.error('Error al eliminar historial:', error);
          reject(error);
        } else {
          console.log('Historial eliminado con éxito');
          resolve(results);
        }
      });
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error en la conexión con la base de datos:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

const eliminarHistorialIndividual = async (req, res, next) => {
  const turistaId = req.session.Id_Turista;
  const Id_Historial = req.body.id;
  console.log(turistaId);
  const sql = `
    DELETE FROM Historial_busqueda
    WHERE Id_Turista = ? 
    AND Id_Historial = ?
  `;

  try {
    await new Promise((resolve, reject) => {
      pool.query(sql, [turistaId, Id_Historial], (error, results) => {
        if (error) {
          console.error('Error al eliminar registro del historial:', error);
          reject(error);
        } else {
          console.log('Registro del historial eliminado con éxito');
          resolve(results);
        }
      });
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error en la conexión con la base de datos:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

//Controlador pantalla validar contraseña
const validar = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/validarcontraseña.html'));
}

//Controlador para eliminar Favoritos
const eliminarfavoritos = async (req, res) => {
  const turistaId = req.session.Id_Turista;
  console.log(turistaId);
  const sql = `
    DELETE FROM Favoritos
    WHERE Id_Turista = ?
  `;

  try {
    await new Promise((resolve, reject) => {
      pool.query(sql, [turistaId], (error, results) => {
        if (error) {
          console.error('Error al eliminar favoritos del turista:', error);
          reject(error);
        } else {
          console.log('Favorito eliminado de turistas');
          resolve(results);
        }
      });
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error en la conexión con la base de datos:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
}

//Controlador para la validacion de contraseña
const validacioncontraseña = async (req, res, next) => {
  const turistaId = req.session.Id_Turista;
  console.log(turistaId);

  // Asegúrate de tener 'pool' correctamente configurado
  const sql = 'SELECT pass FROM Turista WHERE Id_Turista = ?';

  try {
    const results = await new Promise((resolve, reject) => {
      // Utiliza consultas preparadas para prevenir inyección SQL
      pool.query(sql, [turistaId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (results.length > 0) {
      const storedHashedPass = results[0].pass;
      console.log(turistaId);

      try {
        // Corrige el uso de 'turista.pass'
        const match = await bcrypt.compare(req.body.pass, storedHashedPass);

        if (match) {
          console.log('Turista encontrado');
          res.status(200).json({ message: "Contraseña correcta" });
        } else {
          console.log('Contraseña incorrecta');
          res.status(500).json({ message: "Contraseña incorrecta" });
        }
      } catch (error) {
        console.error('Error al comparar contraseñas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

//Controlador pantalla validar contraseña
const enviarCorreo = async (req, res) => {
  const codigo = req.body.codigo;
  const correo = req.body.correo;
  console.log(req.body);
  const config = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'ledesma.ramirez.jose.emiliano@gmail.com',
      pass: 'fums ozuy asmz lfst'
    }
  }

  const mensaje = {
    from: 'ledesma.ramirez.jose.emiliano@gmail.com',
    to: correo,
    subject: 'Hola, adiós',
    text: 'El código de verificación es ' + codigo + '.'
  }

  const transport = nodemailer.createTransport(config);

  try {
    const info = await transport.sendMail(mensaje);
    console.log("Correo enviado:", info);
    res.send("test")
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }

}

const consultarPreferencias = async (req, res) => {
  try {
    // Obtener el Id_Turista de la variable de sesión
    const turistaId = req.session.Id_Turista;

    // Consulta para obtener la información del turista
    const preferencias = await obtenerPreferencias(turistaId);
    console.log(preferencias)
    // Enviar la información del turista como respuesta JSON
    res.json(preferencias);

  } catch (error) {
    console.error('Error en el controlador de perfil:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para obtener la información del turista desde la base de datos
const obtenerPreferencias = (turistaId) => {

  return new Promise((resolve, reject) => {
    const sql = 'SELECT Nombre FROM Preferencias WHERE Id_Turista = ?';
    const values = [turistaId];

    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else if (results.length > 0) {
        resolve(results);
      } else {
        reject(new Error('Preferencias no encontrado'));
      }
    });
  });
};

// Controlador para agregar lugares como favoritos
const agregarFavorito = async (req, res) => {
  const turista = req.session.Id_Turista;
  // Si el nombre de usuario no existe, proceder con la inserción en la base de datos
  const sql = `
      INSERT INTO Favoritos  (
        Id_Lugar,
        Id_Turista
      ) VALUES (?, ?)
    `;
  const values = [
    req.body.id,
    turista,
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
    console.log('Favorito registrado correctamente');
  } else {
    res.status(400).json({ error: 'No se pudo registrar en Favoritos' });
  }
}

// Controlador para la página de historial
const consultarFavoritos = async (req, res) => {
  try {
    // Obtener el Id_Turista de la variable de sesión
    const turistaId = req.session.Id_Turista;

    // Consulta para obtener la información del turista
    const infoFavoritos = await obtenerFavoritos(turistaId);
    console.log(infoFavoritos)
    // Enviar la información del turista como respuesta JSON
    res.json(infoFavoritos);

  } catch (error) {
    console.error('Error en el controlador de Favoritos', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para obtener la información del turista desde la base de datos
const obtenerFavoritos = (turistaId) => {

  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Favoritos WHERE Id_Turista = ?';
    const values = [turistaId];

    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else if (results.length > 0) {
        resolve(results);
      } else {
        reject(new Error('Favorito no encontrado'));
      }
    });
  });
};

const eliminarFavoritosIndividual = async (req, res, next) => {
  const turistaId = req.session.Id_Turista;
  const Id_Favoritos = req.body.id;
  console.log(turistaId);
  const sql = `
    DELETE FROM Favoritos
    WHERE Id_Turista = ? 
    AND Id_Lugar  = ?
  `;

  try {
    await new Promise((resolve, reject) => {
      pool.query(sql, [turistaId, Id_Favoritos], (error, results) => {
        if (error) {
          console.error('Error al eliminar registro de favoritos:', error);
          reject(error);
        } else {
          console.log('Registro eliminado con éxito');
          resolve(results);
        }
      });
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error en la conexión con la base de datos:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

module.exports = {
  bienvenida,
  datos,
  pedirdatos,
  login,
  mapa,
  perfil,
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
  itinerario,
  validar,
  eliminarHistorialCompleto,
  eliminarHistorialIndividual,
  consultarHistorial,
  agregarHistorial,
  eliminarfavoritos,
  validacioncontraseña,
  enviarCorreo,
  consultarPreferencias,
  actualizar,
  agregarFavorito,
  consultarFavoritos,
  eliminarFavoritosIndividual
}
