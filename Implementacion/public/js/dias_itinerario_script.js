/*document.addEventListener('DOMContentLoaded', () => {
    const deleteButton = document.getElementById('deleteBtn');
    const emptyMessage = document.getElementById('emptyMessage');

    function actualizarVisibilidadMensajeVacio() {
        const itineraryElement = document.getElementById('itinerary');
        deleteButton.style.display = itineraryElement.children.length > 0 ? 'block' : 'none';
        emptyMessage.style.display = itineraryElement.children.length === 0 ? 'block' : 'none';
    }

    window.borrarItinerario = function () {
        const itineraryElement = document.getElementById('itinerary');
        itineraryElement.innerHTML = '';

        actualizarVisibilidadMensajeVacio();

        $('#confirmacionBorradoModal').modal('hide');
        $('#confirmacionEliminacionModal').modal('show');
    };

    window.deleteDay = function (button) {
        const dayElement = button.closest('.day-info');
        dayElement.remove();

        actualizarVisibilidadMensajeVacio();
    };
    // Llamada inicial para actualizar la visibilidad al cargar la página
    actualizarVisibilidadMensajeVacio();
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

    if (!fechaSeleccionada) {
        $('#fechaInvalidaModal').modal('show');
        return;
    }

    var fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    var fechaSeleccionadaObj = new Date(fechaSeleccionada + 'T00:00:00-06:00');

    if (fechaSeleccionadaObj < fechaActual) {
        $('#fechaInvalidaModal').modal('show');
        return;
    }

    const existingContainer = document.querySelector(`.day-info[data-date="${fechaSeleccionada}"]`);

    if (existingContainer) {
        $('#fechaEnUsoModal').modal('show');
        return;
    }

    var fecha = new Date(fechaSeleccionada + 'T00:00:00-06:00');
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var nombreDia = fecha.toLocaleDateString('es-ES', options);

    const newDayElement = document.createElement('div');
    newDayElement.classList.add('day-info');
    newDayElement.setAttribute('data-date', fechaSeleccionada);
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

    const deleteButton = document.getElementById('deleteBtn');
    deleteButton.style.display = 'block';

    const emptyMessage = document.getElementById('emptyMessage');
    emptyMessage.style.display = 'none';

    const sortedContainers = Array.from(itineraryElement.children)
        .sort((a, b) => new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date')));

    itineraryElement.innerHTML = '';
    sortedContainers.forEach(container => itineraryElement.appendChild(container));

    $('#confirmacionMensaje').text('Fecha agregada correctamente');
    $('#confirmacionModal').modal('show');
    setTimeout(() => {
        $('#confirmacionModal').modal('hide');
    }, 2000);

    $('#calendarioModal').modal('hide');
}

function mostrarItinerario() {
    window.location.href = '#.html';
}
*/

window.onload = function () {
    mostrarItinerario();
}

function mostrarItinerario() {

    document.getElementById("itinerary").innerHTML = ''
    let itinerario;
    fetch('/turistas/consultarItinerario')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            let dias = [];
            myJson.forEach(element => {
                dias.push(element.Fecha_Itinerario)
            });
            dias = [...new Set(dias)];
            console.log(myJson);
            itinerario = myJson;
            let num = 0;
            if (itinerario.length == 0) {
                contenido.innerHTML = '';
                contenido.innerHTML =
                    `<div id="emptyMessage" class="empty-message">
                    <!-- <p>No hay fechas seleccionadas</p> -->
                    <div class="tab-container">
                      <div
                        class="tab-content d-flex justify-content-center align-items-center"
                      >
                        <div
                          class="container d-flex justify-content-center align-items-center"
                        >
                          <div class="col-12 favoritos-container">
                            <div class="tab-shadow">
                              <div class="favoritos-empty">
                                <p style="margin-left: 20px">
                                  No tienes ningun itinerario agendado aún
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>`;
            } else {
                dias.forEach(item => {
                    const newDayElement = document.createElement('div');
                    newDayElement.classList.add('day-info');
                    newDayElement.setAttribute('data-date', item);
                    console.log(item);
                    newDayElement.innerHTML = `
                        <p>${formatDate(item)}</p>
                        <button class="btn MI" style="background-color: black; color: white;" ><a href="/turistas/itinerarioDia?id=${item}">
                        Mostrar itinerario
                        </a></button>
                        <button class="btn btn-delete" onclick="borrarUnico(${item})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-x-circle-fill btn-delete-icon" viewBox="0 0 16 16">
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                            </svg>
                        </button>
                    `;

                    document.getElementById("itinerary").appendChild(newDayElement);
                    num++;
                });
            }
        });
}
const deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', () => {
    historialElement.innerHTML = '';
});

function formatDate(dateString) {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const date = new Date(dateString);
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName} ${day} de ${monthName} de ${year}`;
}
