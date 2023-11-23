/**
 * Abrir selector de nueva imagen.
 */
function openFileSelector() {
    let inputFile = document.getElementById("avatar");
  
    if (inputFile) {
      inputFile.click();
    }
  }
  
  /**
   * Cambia la imagen de previsualización.
   */
  function changeImagePreview() {
    let inputFile = document.getElementById("avatar");
    let showImage = document.getElementById("view-new-upload-image");
  
    if (inputFile) {
      let reader = new FileReader();
  
      reader.onload = function () {
        showImage.src = reader.result;
      };
  
      if (inputFile && inputFile.files && inputFile.files.length) {
        reader.readAsDataURL(inputFile.files[0]);
      }
    }
  }
  
  /**
   * Recibe los selectores y prepara los eventos para las acciones de
   * cambiar imagen de formulario dinámicamente al subir una nueva.
   * idImg: Dónde se previsualizará la imagen.
   * idInput: Input real con el contenido de la imagen en el formulario.
   * idBtn: Botón de apertura para el formulario.
   */
  function assignImageChangeInput(idImg, idInput, idBtn = null) {
    let inputFile = document.getElementById(idInput);
    let showImage = document.getElementById(idImg);
  
    inputFile.addEventListener("change", changeImagePreview);
    showImage.addEventListener("click", openFileSelector);
  
    if (idBtn) {
      let btn = document.getElementById(idBtn);
      btn.addEventListener("click", openFileSelector);
    }
  }

  
  
  window.document.addEventListener("DOMContentLoaded", () => {
    assignImageChangeInput(
      "view-new-upload-image",
      "avatar",
      "btn-open-file-selector"
    );
  });

  function enabledNombre() {
    var nombreInput = document.getElementById('nombre'); 
    var icono1 = document.getElementById('svg1');
    if (nombreInput.disabled) {
        nombreInput.disabled = false; 
        icono1.setAttribute("fill", "gold");
    } else {
        nombreInput.disabled = true; 
        icono1.setAttribute("fill", "currentColor");
    }
}
  function enabledTelefono(){
    var telefonoInput = document.getElementById('telefono'); 
    var icono2 = document.getElementById('svg2');
    if (telefonoInput.disabled) {
        telefonoInput.disabled = false; 
        icono2.setAttribute("fill", "gold");
    } else {
        telefonoInput.disabled = true; 
        icono2.setAttribute("fill", "currentColor");
    }
  }
  function enabledNuevaContraseña(){
    var contrasenaInput = document.getElementById('newPassword'); 
    var confirmPassInput = document.getElementById('confirmPass'); 
    var icono3 = document.getElementById('svg3');
    if (contrasenaInput.disabled) {
        contrasenaInput.disabled = false; 
        confirmPassInput.disabled = false; 
        icono3.setAttribute("fill", "gold");
    } else {
        contrasenaInput.disabled = true; 
        confirmPassInput.disabled = true; 
        icono3.setAttribute("fill", "currentColor");
    }
  }