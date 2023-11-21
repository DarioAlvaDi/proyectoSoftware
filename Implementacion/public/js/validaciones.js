/*Función que hace aparecer el mensaje de Error en los Inputs del formulario a los que se le haya ingresado un valor no válido */
function mostrarError(elementId, message) {
    var errorElement = document.getElementById(elementId + "-error");
    errorElement.innerHTML = message;
  }

  /*Función que oculta el mensaje de Error de la anterior función */
  function ocultarError(elementId) {
    var errorElement = document.getElementById(elementId + "-error");
    errorElement.innerHTML = "";
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
    }else {
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
  function validarCorreo(){
    let CorreoInput= document.getElementById("exampleInputEmail1");
    let CorreoValor= CorreoInput.value.trim();
    let CorreoRegex= /^[\w._]+@[a-z]+\.[\a-z.]+$/;

    if(!CorreoRegex.test(CorreoValor)){
      mostrarError("exampleInputEmail1", "El correo ingresada no es válido<br>");
      return false;
    }else{
      ocultarError("exampleInputEmail1");
      return true;
    }

  }

  //Función para validar el campo de Contraseña
  function validarContraseña(){
    let ContraseñaInput= document.getElementById("exampleInputPassword1");
    let ContraseñaValor= ContraseñaInput.value.trim();
    let ContraseñaRegex= /^(?=.*[A-Z])(?=.*[-@*]).+$/;

    if(!ContraseñaRegex.test(ContraseñaValor)){
      mostrarError("exampleInputPassword1", "La contraseña debe contener:<br>- Al menos una mayúscula <br>- Al menos un caracter especial (*, @, -)<br>-Debe ser entre 8 y 12 caracteres<br>");
      return false;
    }else if(ContraseñaValor.length<8 || ContraseñaValor.length>12){
      mostrarError("exampleInputPassword1", "Debe ser entre 8 y 12 caracteres. <br>");
      return false;
    } else{
      ocultarError("exampleInputPassword1");
      return true;
    }
  }