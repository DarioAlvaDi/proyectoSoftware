document.addEventListener('DOMContentLoaded', () => {
  const itinerary = [];

  // Función para borrar el itinerario
  window.borrarItinerario = function() {
    // Borrar el itinerario
    const itineraryElement = document.getElementById('itinerary');
    itineraryElement.innerHTML = '';

    // Ocultar el botón de borrar itinerario
    const deleteButton = document.getElementById('deleteBtn');
    deleteButton.style.display = 'none';

    // Ocultar el modal de confirmación antes de borrar
    $('#confirmacionBorradoModal').modal('hide');

    // Mostrar el segundo modal de confirmación después de borrar
    $('#confirmacionEliminacionModal').modal('show');
  };

  function deleteDay(button) {
    const dayElement = button.closest('.day-info');
    dayElement.remove();

    // Verificar si hay bloques restantes y mostrar/ocultar el botón de borrar itinerario
    const itineraryElement = document.getElementById('itinerary');
    const deleteButton = document.getElementById('deleteBtn');
    deleteButton.style.display = itineraryElement.children.length > 0 ? 'block' : 'none';

    // Mostrar u ocultar el mensaje de fechas vacías
    const emptyMessage = document.getElementById('emptyMessage');
    emptyMessage.style.display = itineraryElement.children.length === 0 ? 'block' : 'none';
}

});




window.addEventListener("message", function (event) {
  const selectedDayInfoElement = document.getElementById("selectedDayInfo");

  if (event.data) {
      const selectedDayInfo = event.data;
      selectedDayInfoElement.innerHTML = `<div class="selected-day-container"><p>Día seleccionado: ${selectedDayInfo.day} de ${selectedDayInfo.month} de ${selectedDayInfo.year}</p></div>`;
  }
});


function mostrarFechaSeleccionada() {
  var fechaSeleccionada = document.getElementById('fecha').value;

  // Verificar si el campo de fecha está vacío
  if (!fechaSeleccionada) {
      // Mostrar modal de fecha vacía
      $('#fechaVaciaModal').modal('show');
      return;
  }

  // Obtener la fecha actual
  var fechaActual = new Date();
  fechaActual.setHours(0, 0, 0, 0); // Ajustar la hora actual a las 00:00:00 para hacer una comparación de días

  // Convertir la fecha seleccionada a objeto Date
  var fechaSeleccionadaObj = new Date(fechaSeleccionada + 'T00:00:00-06:00');

  // Verificar si la fecha seleccionada es anterior a la fecha actual
  if (fechaSeleccionadaObj < fechaActual) {
      // Mostrar modal de fecha inválida
      $('#fechaInvalidaModal').modal('show');
      return;
  }

  // Verificar si ya hay un contenedor para la fecha seleccionada
  const existingContainer = document.querySelector(`.day-info[data-date="${fechaSeleccionada}"]`);

  if (existingContainer) {
      // Mostrar modal de fecha en uso
      $('#fechaEnUsoModal').modal('show');
      return;
  }

  var fecha = new Date(fechaSeleccionada + 'T00:00:00-06:00');
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var nombreDia = fecha.toLocaleDateString('es-ES', options);

  const newDayElement = document.createElement('div');
  newDayElement.classList.add('day-info');
  newDayElement.setAttribute('data-date', fechaSeleccionada); // Agregar atributo de fecha
  newDayElement.innerHTML = `
      <p>${nombreDia}</p>
      <button class="btn MI" style="background-color: black; color: white;" onclick="mostrarItinerario()">Mostrar itinerario</button>
      <button class="btn btn-delete" onclick="deleteDay(this)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-x-circle-fill btn-delete-icon" viewBox="0 0 16 16">
              <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
          </svg>
      </button>
  `;

  const itineraryElement = document.getElementById('itinerary');
  itineraryElement.appendChild(newDayElement);

  // Mostrar el botón "Borra Itinerario" después de agregar un bloque de fechas
  const deleteButton = document.getElementById('deleteBtn');
  deleteButton.style.display = 'block';

  // Ordenar los contenedores por fecha
  const sortedContainers = Array.from(itineraryElement.children)
      .sort((a, b) => new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date')));

  itineraryElement.innerHTML = '';
  sortedContainers.forEach(container => itineraryElement.appendChild(container));

  // Mostrar modal de confirmación por 2 segundos
  $('#confirmacionMensaje').text('Fecha agregada correctamente');
  $('#confirmacionModal').modal('show');
  setTimeout(() => {
      $('#confirmacionModal').modal('hide');
  }, 2000);

  $('#calendarioModal').modal('hide');
}



function mostrarItinerario() {
  // Cambia 'nueva_pagina.html' por la ruta de la página a la que quieres redirigir
  window.location.href = 'bcalendario.html';
}
