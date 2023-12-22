const { Session } = require('inspector');
const mysql = require('mysql')
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const multer = require('multer');
const nodemailer = require("nodemailer");
//Hola pichula
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
  // Si el nombre de usuario no existe, proceder con la inserción en la base de datos
  const sql = `
      INSERT INTO Turista (
        nombre,
        a_paterno,
        a_materno,
        correo,
        telefono,
        usuario,
        pass,
        estado
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'N')
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
        res.redirect('/turistas/enviarCorreo');
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

// Controlador pantalla de verificar Cuenta
const verificarCuenta = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/verificarcuenta.html'));
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
      const status = results[0].Estado;
      console.log(turistaId)
      // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
      const match = await bcrypt.compare(turista.pass, storedHashedPass);

      if (match) {
        if (status === 'V') {
          console.log('Turista encontrado');
          res.status(200).json({ message: 'Autenticación exitosa' });
        } else if (status === 'N') {
          console.log('Cuenta no verificada')
          res.status(401).json({ message: 'Cuenta no verificada' });
        }
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
      res.status(200).json({ message:'Sesión cerrada éxitosamente'});
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
    const sql = 'SELECT Usuario, Nombre, A_Paterno, A_Materno, Correo, Telefono, Foto FROM Turista WHERE Id_Turista = ?';
    const values = [turistaId];

    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else if (results.length > 0) {
        const turistaInfo = results[0];
        // Normaliza la ruta de la foto
        if (turistaInfo.Foto) {
          turistaInfo.Foto = path.normalize(turistaInfo.Foto);

          turistaInfo.Foto = turistaInfo.Foto.replace('public', '..')
        }
        resolve(turistaInfo);
      } else {
        reject(new Error('Turista no encontrado'));
      }
    });
  });
};


// Actdatos function
async function actdatos(req, res) {
  const Id_Turista = req.session.Id_Turista;
  try {
    console.log('Datos recibidos:', req.body);
    const { Nombre, Telefono, contrasena, confirmarContrasena } = req.body;

    // Verifica que al menos uno de los campos (Nombre, Telefono, contrasena) se proporciona
    if (!Nombre && !Telefono && !contrasena) {
      return res.status(400).json({ error: "Al menos uno de los campos (Nombre, Telefono, Contraseña) debe proporcionarse." });
    }

    // Validar que la contraseña y la confirmación coincidan
    if (contrasena !== confirmarContrasena) {
      return res.status(400).json({ error: "La contraseña y la confirmación de la contraseña no coinciden." });
    }

    // Inicializa hashedPass
    let hashedPass;

    // Construye dinámicamente la parte SET de la consulta SQL en función de los campos proporcionados
    const sets = [];
    if (Nombre) {
      sets.push('usuario = ?');
    }
    if (Telefono) {
      sets.push('telefono = ?');
    }
    if (contrasena) {
      // Utiliza bcrypt para cifrar la contraseña
      hashedPass = await bcrypt.hash(contrasena, saltRounds);
      sets.push('pass = ?');
    }

    // Junta las partes SET con comas
    const setsString = sets.join(', ');

    // Construye y ejecuta la consulta SQL
    const result = await pool.query(`UPDATE Turista SET ${setsString} WHERE Id_Turista = ?`, [...(Nombre ? [Nombre] : []), ...(Telefono ? [Telefono] : []), ...(contrasena ? [hashedPass] : []), Id_Turista]);
    console.log(result);

    res.json({ message: 'Datos actualizados correctamente' });

  } catch (error) {
    console.error('Error al actualizar datos:', error);
  }
}

// Controlador pantalla detalles
const detalles = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/detallesLugar.html'));
}
//Controlador pantalla preferencias
const preferencias = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/Preferencias.html'));
}

//Controlador pantalla preferencias de Actualizar Datos
const preferencias2 = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/Preferencias-Datos.html'));
}
// Controlador para insertar Preferencias en BD
const registrarPreferencias = async (req, res) => {
  const turistaId = req.session.Id_Turista;
  console.log(turistaId);
  const preferencia = req.body.preferencias || [];
  console.log(preferencia);

  // Eliminar preferencias existentes para el turistaId
  const deleteSql = `
    DELETE FROM Preferencias
    WHERE Id_Turista = ?
  `;

  pool.query(deleteSql, [turistaId], (deleteErr, deleteResult) => {
    if (deleteErr) {
      console.error(deleteErr);
      return res.status(500).send("Error al eliminar preferencias existentes.");
    }

    // Si la eliminación es exitosa, proceder con la inserción de nuevas preferencias
    const insertSql = `
      INSERT INTO Preferencias (
        Nombre,
        Id_Turista
      ) VALUES (?, ?)
    `;

    // Insertar las nuevas preferencias
    preferencia.forEach((preference) => {
      pool.query(insertSql, [preference, turistaId], (insertErr, insertResult) => {
        if (insertErr) {
          console.error(insertErr);
        }
      });
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

//Controlador pantalla correoRestaurarContraseña
const correoRestaurar = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/correoRestaurarContraseña.html'));
}

const enviarCodigoContraseña = async (req, res) => {
  const correo = req.body.correo;
  console.log(correo)
  // Realizar la consulta para obtener el Id_Turista asociado al correo
  const obtenerTuristaIdSql = 'SELECT Id_Turista FROM Turista WHERE Correo = ?';
  pool.query(obtenerTuristaIdSql, [correo], async (errorObtenerId, resultsObtenerId) => {
    if (errorObtenerId) {
      console.error("Error al obtener el Id_Turista:", errorObtenerId);
      res.status(500).json({ error: 'Error al obtener el Id_Turista de la base de datos' });
      return;
    }

    if (resultsObtenerId.length === 0) {
      console.error("No se encontró el turista con el correo proporcionado");
      res.status(404).json({ error: 'Turista no encontrado' });
      return;
    }

    const turistaId = resultsObtenerId[0].Id_Turista;
    req.session.Id_Turista = turistaId

    // Generar un código aleatorio
    const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Actualizar el código en la base de datos
    const updateCodigoSql = 'UPDATE Turista SET Codigo = ? WHERE Id_Turista = ?';
    pool.query(updateCodigoSql, [codigo, turistaId], async (errorUpdateCodigo, resultsUpdateCodigo) => {
      if (errorUpdateCodigo) {
        console.error("Error al actualizar el código en la base de datos:", errorUpdateCodigo);
        res.status(500).json({ error: 'Error al actualizar el código en la base de datos' });
        return;
      }

      if (resultsUpdateCodigo.affectedRows !== 1) {
        console.error("No se pudo actualizar el código en la base de datos");
        res.status(500).json({ error: 'Error al actualizar el código en la base de datos' });
        return;
      }

      const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'ledesma.ramirez.jose.emiliano@gmail.com',
          pass: 'fums ozuy asmz lfst'
        }
      };
      
      const mensaje = {
        from: 'ledesma.ramirez.jose.emiliano@gmail.com',
        to: correo,
        subject: 'Reestablecimiento de contraseña',
        html: `
          <html>
            <head>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f4f4f4;
                  color: #333;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                  color: #007bff;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Reestablecimiento de Contraseña</h1>
                <p>Estimado usuario,</p>
                <p>El código de verificación es <strong>${codigo}</strong>.</p>
                <p>Por favor, utilice este código para restablecer su contraseña.</p>
              </div>
            </body>
          </html>
        `
      };
      
      const transport = nodemailer.createTransport(config);
      
      try {
        const info = await transport.sendMail(mensaje);
        console.log("Correo enviado:", info);
        res.redirect('/turistas/recuperar');
      } catch (error) {
        console.error("Error al enviar el correo:", error);
        res.status(500).json({ error: 'Error al enviar el correo' });
      }
    });
  });
};

//Controlador pantalla recuperación de contraseña
const enviarCorreo2 = async (req, res) => {
  const turistaId = req.session.Id_Turista;

  // Generar un código aleatorio
  const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();

  // Actualizar el código en la base de datos
  const updateCodigoSql = 'UPDATE Turista SET Codigo = ? WHERE Id_Turista = ?';
  pool.query(updateCodigoSql, [codigo, turistaId], async (errorUpdateCodigo, resultsUpdateCodigo) => {
    if (errorUpdateCodigo) {
      console.error("Error al actualizar el código en la base de datos:", errorUpdateCodigo);
      res.status(500).json({ error: 'Error al actualizar el código en la base de datos' });
      return;
    }

    if (resultsUpdateCodigo.affectedRows !== 1) {
      console.error("No se pudo actualizar el código en la base de datos");
      res.status(500).json({ error: 'Error al actualizar el código en la base de datos' });
      return;
    }

    // Realizar la consulta para obtener el correo del turista
    const sql = 'SELECT Correo FROM Turista WHERE Id_Turista = ?';
    pool.query(sql, [turistaId], async (error, results) => {
      if (error) {
        console.error("Error al obtener el correo del turista:", error);
        res.status(500).json({ error: 'Error al obtener el correo del turista' });
        return;
      }

      if (results.length === 0) {
        console.error("No se encontró el turista con el ID proporcionado");
        res.status(404).json({ error: 'Turista no encontrado' });
        return;
      }

      const correo = results[0].Correo;

      const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'ledesma.ramirez.jose.emiliano@gmail.com',
          pass: 'fums ozuy asmz lfst'
        }
      };
      
      const mensaje = {
        from: 'ledesma.ramirez.jose.emiliano@gmail.com',
        to: correo,
        subject: 'Recuperación de Contraseña',
        html: `
          <html>
            <head>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f4f4f4;
                  color: #333;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                  color: #007bff;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Recuperación de Contraseña</h1>
                <p>Estimado usuario,</p>
                <p>Recibió este correo porque solicitó la recuperación de contraseña.</p>
                <p>El código de verificación es <strong>${codigo}</strong>.</p>
                <p>Utilice este código para restablecer su contraseña.</p>
              </div>
            </body>
          </html>
        `
      };
      
      const transport = nodemailer.createTransport(config);
      
      try {
        const info = await transport.sendMail(mensaje);
        console.log("Correo enviado:", info);
        res.redirect('/turistas/recuperar');
      } catch (error) {
        console.error("Error al enviar el correo:", error);
        res.status(500).json({ error: 'Error al enviar el correo' });
      }
      
    });
  });
};

// Controlador para comparar códigos para verificar la cuenta
const compararCodigos2 = async (req, res) => {
  const turistaId = req.session.Id_Turista;
  const CodigoIngresado = req.body.codigo;
  console.log(CodigoIngresado)
  const sql = 'SELECT Codigo FROM Turista WHERE Id_Turista= ?';

  pool.query(sql, [turistaId], async (error, results) => {
    if (error) {
      console.error("Error al obtener el código del turista:", error);
      res.status(500).json({ error: 'Error al obtener el código del turista' });
      return;
    }

    if (results.length === 0) {
      console.error("No se encontró el código con el ID proporcionado");
      res.status(404).json({ error: 'Código no encontrado' });
      return;
    }

    const codigo = results[0].Codigo;
    console.log(codigo)

    if (CodigoIngresado === codigo) {
      res.status(200).json({ message: "El código ingresado coincide" });
    } else {
      res.status(500).json({ message: "Código ingresado no coincide" });
    }
  });
};
//Controlador pantalla recuperar contraseña
const recuperar = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/cambiarContraseña.html'));
}

const cambiarContra = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/IU05Restablecercontraseña.html'));
}

const nuevaContrasena = async (req, res) => {
  Contraseña = req.body.Contraseña;
  const turista_Id = req.session.Id_Turista

  try {
    const hashedPass = await bcrypt.hash(Contraseña, saltRounds);

    // Actualizar la contraseña en la base de datos
    const updatePassSql = 'UPDATE Turista SET pass = ? WHERE Id_Turista = ?';
    pool.query(updatePassSql, [hashedPass, turista_Id], (errorUpdatePass, resultsUpdatePass) => {
      if (errorUpdatePass) {
        console.error('Error al actualizar la contraseña en la base de datos:', errorUpdatePass);
        res.status(500).json({ error: 'Error al actualizar la contraseña en la base de datos' });
        return;
      }

      if (resultsUpdatePass.affectedRows !== 1) {
        console.error('No se pudo actualizar la contraseña en la base de datos');
        res.status(500).json({ error: 'Error al actualizar la contraseña en la base de datos' });
        return;
      } else {
        console.log('Contraseña actualizada')
        res.status(200).json({ message: 'Contraseña actualizada con éxito' });
      }
    });
  } catch (error) {
    console.error('Error al hashear la contraseña:', error);
    res.status(500).json({ error: 'Error al procesar la contraseña' });
  }


}

//Controlador para ruta de historial
const historial = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/pantallaHistorial.html'));
}

//Controlador pantalla itinerario
const itinerario = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/itinerarioDia.html'));
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

const eliminarItinerarioIndividual = async (req, res, next) => {
  const turistaId = req.session.Id_Turista;
  const Fecha = req.body.id;
  console.log(turistaId);
  console.log(Fecha)
  const sql = `
    DELETE FROM Itinerario
    WHERE Id_Turista = ? 
    AND Fecha_Itinerario = ?
  `;

  try {
    await new Promise((resolve, reject) => {
      pool.query(sql, [turistaId, Fecha], (error, results) => {
        if (error) {
          console.error('Error al eliminar registro del itinerario:', error);
          reject(error);
        } else {
          console.log('Registro del itinerario eliminado con éxito');
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

//Controlador pantalla validar correo
const enviarCorreo = async (req, res) => {
  const turistaId = req.session.Id_Turista;

  // Generar un código aleatorio
  const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();

  // Actualizar el código en la base de datos
  const updateCodigoSql = 'UPDATE Turista SET Codigo = ? WHERE Id_Turista = ?';
  pool.query(updateCodigoSql, [codigo, turistaId], async (errorUpdateCodigo, resultsUpdateCodigo) => {
    if (errorUpdateCodigo) {
      console.error("Error al actualizar el código en la base de datos:", errorUpdateCodigo);
      res.status(500).json({ error: 'Error al actualizar el código en la base de datos' });
      return;
    }

    if (resultsUpdateCodigo.affectedRows !== 1) {
      console.error("No se pudo actualizar el código en la base de datos");
      res.status(500).json({ error: 'Error al actualizar el código en la base de datos' });
      return;
    }

    // Realizar la consulta para obtener el correo del turista
    const sql = 'SELECT Correo FROM Turista WHERE Id_Turista = ?';
    pool.query(sql, [turistaId], async (error, results) => {
      if (error) {
        console.error("Error al obtener el correo del turista:", error);
        res.status(500).json({ error: 'Error al obtener el correo del turista' });
        return;
      }

      if (results.length === 0) {
        console.error("No se encontró el turista con el ID proporcionado");
        res.status(404).json({ error: 'Turista no encontrado' });
        return;
      }

      const correo = results[0].Correo;

      const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'ledesma.ramirez.jose.emiliano@gmail.com',
          pass: 'fums ozuy asmz lfst'
        }
      };
      
      const mensaje = {
        from: 'ledesma.ramirez.jose.emiliano@gmail.com',
        to: correo,
        subject: 'Verificación de Correo',
        html: `
          <html>
            <head>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f4f4f4;
                  color: #333;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                  color: #007bff;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Verificación de Correo</h1>
                <p>Estimado usuario,</p>
                <p>El código de verificación es <strong>${codigo}</strong>.</p>
                <p>Utilice este código para verificar su cuenta.</p>
              </div>
            </body>
          </html>
        `
      };
      
      const transport = nodemailer.createTransport(config);
      
      try {
        const info = await transport.sendMail(mensaje);
        console.log("Correo enviado:", info);
        res.redirect('/turistas/verificarCuenta');
      } catch (error) {
        console.error("Error al enviar el correo:", error);
        res.status(500).json({ error: 'Error al enviar el correo' });
      }
      
    });
  });
};


// Controlador para comparar códigos para verificar la cuenta
const compararCodigos = async (req, res) => {
  const turistaId = req.session.Id_Turista;
  const CodigoIngresado = req.body.codigo;
  console.log(CodigoIngresado)
  const sql = 'SELECT Codigo FROM Turista WHERE Id_Turista= ?';

  pool.query(sql, [turistaId], async (error, results) => {
    if (error) {
      console.error("Error al obtener el código del turista:", error);
      res.status(500).json({ error: 'Error al obtener el código del turista' });
      return;
    }

    if (results.length === 0) {
      console.error("No se encontró el código con el ID proporcionado");
      res.status(404).json({ error: 'Código no encontrado' });
      return;
    }

    const codigo = results[0].Codigo;
    console.log(codigo)

    if (CodigoIngresado === codigo) {
      const sql2 = 'UPDATE Turista SET Estado=? WHERE Id_Turista=?';
      pool.query(sql2, ['V', turistaId], async (error, results) => {
        if (error) {
          console.error("Error al actualizar el estado del turista:", error);
          res.status(500).json({ error: 'Error al actualizar el estado del turista' });
          return;
        }
        res.status(200).json({ message: "Cuenta verificada" });
      });
    } else {
      res.status(500).json({ message: "Código ingresado no coincide" });
    }
  });
};


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
  console.log(turistaId, Id_Favoritos);
  const sql = `
    DELETE FROM Favoritos
    WHERE Id_Turista = ? 
    AND Id_Favoritos  = ?
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

const cambiarFoto = async (req, res) => {
  try {
    const userId = req.session.Id_Turista
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ningún archivo.' });
    }

    const nuevaRutaFoto = req.file.path;

    // Actualiza la ruta de la foto de perfil en la base de datos para el usuario actual
    const sql = 'UPDATE Turista SET Foto = ? WHERE Id_Turista = ?';

    pool.query(sql, [nuevaRutaFoto, userId], (error, results) => {
      if (error) {
        console.error('Error al actualizar la foto de perfil:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        // Envía la nueva ruta de la foto de perfil como respuesta en formato JSON
        res.json({ nuevaRutaFoto });
      }
    });
  } catch (error) {
    console.error('Error al cambiar la foto de perfil:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
const calendario = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/calendario.html'));
}
const diasItinerario = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/IU26 Pantalla Dias Itinerario.html'));
}
const itinerarioDia = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/itinerarioDia.html'));
}
const agregarItinerario = async (req, res) => {
  const turista = req.session.Id_Turista;
  console.log(req.body)
  // Si el nombre de usuario no existe, proceder con la inserción en la base de datos
  const sql = `
      INSERT INTO Itinerario  (
        Id_Lugar,
        Fecha_Itinerario,
        Hora_Itinerario,
        Latitud,
        Longitud,
        Id_Turista
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;
  const values = [
    req.body.id,
    req.body.fecha,
    req.body.hora,
    req.body.lat,
    req.body.lng,
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

const consultarItinerario = async (req, res) => {
  try {
    // Obtener el Id_Turista de la variable de sesión
    const turistaId = req.session.Id_Turista;

    // Consulta para obtener la información del turista
    const infoItinerario = await obtenerItinerario(turistaId);
    console.log(infoItinerario)
    // Enviar la información del turista como respuesta JSON
    res.json(infoItinerario);

  } catch (error) {
    console.error('Error en el controlador de itinerario', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para obtener la información del turista desde la base de datos
const obtenerItinerario = (turistaId) => {

  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Itinerario WHERE Id_Turista = ?';
    const values = [turistaId];

    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else if (results.length > 0) {
        resolve(results);
      } else {
        reject(new Error('Itinerario no encontrado'));
      }
    });
  });
};
const test = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/test.html'));
}
const consultarItinerarioFecha = async (req, res) => {
  try {
    // Obtener el Id_Turista de la variable de sesión
    const turistaId = req.session.Id_Turista;
    let fecha = req.body.id;
    // Consulta para obtener la información del turista
    const infoItinerario = await obtenerItinerarioFecha(turistaId, fecha);
    console.log(infoItinerario)
    // Enviar la información del turista como respuesta JSON
    res.json(infoItinerario);

  } catch (error) {
    console.error('Error en el controlador de itinerario', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para obtener la información del turista desde la base de datos
const obtenerItinerarioFecha = (turistaId, fecha) => {

  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Itinerario WHERE Id_Turista = ? AND Fecha_Itinerario = ?';
    const values = [turistaId, fecha];

    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else if (results.length > 0) {
        resolve(results);
      } else {
        reject(new Error('Itinerario no encontrado'));
      }
    });
  });
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
  preferencias2,
  eliminarTurista,
  detalles,
  favoritos,
  usuario,
  registrarPreferencias,
  informacionPerfil,
  logout,
  correoRestaurar,
  enviarCodigoContraseña,
  recuperar,
  compararCodigos2,
  enviarCorreo2,
  cambiarContra,
  nuevaContrasena,
  historial,
  itinerario,
  diasItinerario,
  agregarItinerario,
  itinerarioDia,
  consultarItinerario,
  consultarItinerarioFecha,
  validar,
  eliminarHistorialCompleto,
  eliminarHistorialIndividual,
  eliminarItinerarioIndividual,
  consultarHistorial,
  agregarHistorial,
  eliminarfavoritos,
  compararCodigos,
  validacioncontraseña,
  enviarCorreo,
  consultarPreferencias,
  actualizar,
  agregarFavorito,
  consultarFavoritos,
  eliminarFavoritosIndividual,
  cambiarFoto,
  calendario,
  verificarCuenta,
  test
}
