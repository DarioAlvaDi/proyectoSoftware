let codigo;

;/*Función que hace aparecer el mensaje de Error en los Inputs del formulario a los que se le haya ingresado un valor no válido */
function mostrarError(elementId, message) {
  var errorElement = document.getElementById(elementId + "-error");
  errorElement.innerHTML = message;
}

/*Función que oculta el mensaje de Error de la anterior función */
function ocultarError(elementId) {
  var errorElement = document.getElementById(elementId + "-error");
  errorElement.innerHTML = "";
}

/*Función que valida el input de Usuario que solo tenga letras o espacio en blanco */
function validarUsuario() {
  var usuarioInput = document.getElementById("Usuario");
  var usuarioValor = usuarioInput.value.trim();
  var letrasRegex = /^[\w_]+$/;

  if (!letrasRegex.test(usuarioValor)) {
    mostrarError("Usuario", "Ingresar solo letras, números o caracter especial (_).<br>");
    return false;
  } else {
    ocultarError("Usuario");
    return true;
  }
}

/*Función que valida el input de Nombre(s) que solo tenga letras o espacio en blanco */
function validarNombre() {
  var nombreInput = document.getElementById("Nombre");
  var nombreValor = nombreInput.value.trim();
  var letrasRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  if (!letrasRegex.test(nombreValor)) {
    mostrarError("Nombre", "Ingresar solo letras.<br>");
    return false;
  } else {
    ocultarError("Nombre");
    return true;
  }
}

/*Función que valida el input de Apellido Paterno que solo tenga letras */
function validarApellidoPaterno() {
  var apellidoPaternoInput = document.getElementById("AP");
  var apellidoPaternoValor = apellidoPaternoInput.value.trim();
  var letrasRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  if (!letrasRegex.test(apellidoPaternoValor)) {
    mostrarError("AP", "Ingresar solo letras.<br>");
    return false;
  } else {
    ocultarError("AP");
    return true;
  }
}

/*Función que valida el input de Apellido Materno que solo tenga letras */
function validarApellidoMaterno() {
  var apellidoMaternoInput = document.getElementById("AM");
  var apellidoMaternoValor = apellidoMaternoInput.value.trim();
  var letrasRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑ\s]+$/;

  if (!letrasRegex.test(apellidoMaternoValor)) {
    mostrarError("AM", "Ingresar solo letras.<br>");
    return false;
  } else {
    ocultarError("AM");
    return true;
  }
}

/*Función que valida el campo de Teléfono para que solo acepte números y máximo 10*/
function validarTelefono() {
  var telefonoInput = document.getElementById("Teléfono");
  var telefonoValor = telefonoInput.value.trim();
  var numerosRegex = /^\d+$/;


  if (!numerosRegex.test(telefonoValor)) {
    mostrarError("Teléfono", "El teléfono solo debe contener números.<br>");
    return false;
  } else if (telefonoValor.length != 10) {
    mostrarError("Teléfono", "El teléfono debe tener 10 dígitos.<br>");
    return false;
  } else {
    ocultarError("Teléfono");
    return true;
  }
}

//Función para validar el campo de Correo
function validarCorreo() {
  let CorreoInput = document.getElementById("exampleInputEmail1");
  let CorreoValor = CorreoInput.value.trim();
  let CorreoRegex = /^[\w._]+@gmail\.com+$/;

  if (!CorreoRegex.test(CorreoValor)) {
    mostrarError("exampleInputEmail1", "El correo ingresada no es válido. Ingresar solo correo gmail<br>");
    return false;
  } else {
    ocultarError("exampleInputEmail1");
    return true;
  }

}

//Función para validar el campo de Contraseña
function validarContraseña() {
  let ContraseñaInput = document.getElementById("exampleInputPassword1");
  let ContraseñaValor = ContraseñaInput.value.trim();
  let ContraseñaRegex = /^(?=.*[A-Z])(?=.*[-@*]).+$/;

  if (!ContraseñaRegex.test(ContraseñaValor)) {
    mostrarError("exampleInputPassword1", "La contraseña debe contener:<br>- Al menos una mayúscula <br>- Al menos un caracter especial (*, @, -)<br>-Debe ser entre 8 y 12 caracteres<br>");
    return false;
  } else if (ContraseñaValor.length < 8 || ContraseñaValor.length > 12) {
    mostrarError("exampleInputPassword1", "Debe ser entre 8 y 12 caracteres. <br>");
    return false;
  } else {
    ocultarError("exampleInputPassword1");
    return true;
  }
}


/*Función para validar que no hay mensajes de error en el formulario y poder enviarlo */
async function validarFormulario(event) {
  event.preventDefault();

  var usuarioValido = validarUsuario();
  var nombreValido = validarNombre();
  var apellidoPaternoValido = validarApellidoPaterno();
  var apellidoMaternoValido = validarApellidoMaterno();
  var telefonoValido = validarTelefono();
  var correoValido = validarCorreo();
  var contraseñaValida = validarContraseña();

  // Verificar si hay mensajes de error
  if (
    usuarioValido &&
    nombreValido &&
    apellidoPaternoValido &&
    apellidoMaternoValido &&
    telefonoValido &&
    correoValido &&
    contraseñaValida
  ) {
    try {
      const usuarioInput = document.getElementById('Usuario');
      const valorUsuario = usuarioInput.value;
      const correoInput = document.getElementById('exampleInputEmail1');
      const valorCorreo = correoInput.value;

      const response = await fetch('/turistas/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Usuario: valorUsuario,
          Correo: valorCorreo,
        }),
      });

      const data = await response.json();

      if (data.exists) {
        // Verificar si el usuario o el correo ya está en uso
        if (data.type === 'usuario') {
          // El nombre de usuario ya existe, mostrar error
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          mostrarError('Usuario', 'El nombre de usuario ya está en uso<br>');
        } else if (data.type === 'correo') {
          // El correo electrónico ya existe, mostrar error
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          mostrarError('exampleInputEmail1', 'El correo electrónico ya tiene una cuenta asociada<br>');
        }

        return false;
      } else {
        // No hay mensajes de error, se puede enviar el formulario
        ocultarError('Formulario');
        document.forms[0].submit();
      }
    } catch (error) {
      console.error('Error al realizar la solicitud fetch:', error);
      return false;
    }
  } else {
    // Hay mensajes de error, no se envía el formulario
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    mostrarError('Formulario', '<br>Completar correctamente todos los campos <br><br>');
    return false;
  }
}

document.forms[0].addEventListener('submit', validarFormulario);