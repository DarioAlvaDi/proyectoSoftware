
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
                dias.sort(compararFechas)
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
                        <button class="btn btn-delete" onclick="borrarUnico('` + item + `')">
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

function borrarUnico(fecha) {
    let data = {id:fecha}
    fetch('/turistas/eliminarItinerarioIndividual',
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then(function () {
        mostrarItinerario();
    });
}

const deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', () => {
    historialElement.innerHTML = '';
});

// Función de comparación para ordenar fechas
function compararFechas(a, b) {
    return new Date(a) - new Date(b);
  }
  
function formatDate(dateString) {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const date = new Date(dateString); 

    const dayName = days[date.getUTCDay()];
    const day = date.getUTCDate();
    const monthName = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${dayName} ${day} de ${monthName} de ${year}`;
}
