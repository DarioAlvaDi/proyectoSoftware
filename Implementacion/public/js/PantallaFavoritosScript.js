
document.addEventListener('DOMContentLoaded', function () {
  // Obtener el elemento por su ID
  var elemento = document.getElementById("favoritos");
  var dirImagen = "imgActualizarDatos/tu_imagen.png";

  // Modificar el contenido del elemento
  elemento.innerHTML = "<div class=\"row\">" +
      "<div class=\"col-md-12 \">" +
          "<div class=\"cuadrado\">" +
              "<div class=\"row\">" +
                  "<div class=\"col-md-6 \">" +
                      "<img src="+dirImagen+" alt=\"Imagen a la izquierda\" class=\"img-fluid\">" +
                  "</div>" +
                  "<div class=\"col-md-6\">" +
                      "<div class=\"leyenda\">Bellas artes</div>" +
                      "<div class=\"botones-derecha\">" +
                          "<button type=\"button\" class=\"btn btn-secondary btn-sm\">Detalles</button>" +
                          "<button type=\"button\" class=\"btn btn-danger btn-sm\">X</button>" +
                      "</div>" +
                  "</div>" +
              "</div>" +
          "</div>" +
      "</div>" +
  "</div>";
});
