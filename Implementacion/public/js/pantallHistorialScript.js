/*Obtener de la base de datos los sitios guardados */
window.onload = function () {
    mostrarHistorial();

}
function mostrarHistorial() {
    let historial;
    fetch('/turistas/consultarHistorial')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);
            historial = myJson;
            const historialElement = document.getElementById('contenido');
            historialElement.innerHTML = ''; // Limpiar el contenido anterior
            let num = 0;
            if (historial.length == 0) {
                contenido.innerHTML = '';
                contenido.innerHTML =
                    `<div class="tab-container">
                        <div class="tab-content">
                            <div class="container d-flex justify-content-center align-items-center">
                                <div class="col-12 historial-container">
                                    <div class="tab-shadow">
                                        <div class="historial-empty">    
                                            <p>Historial se encuentra vacío</p>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div> 
                    </div>
            <footer class="fixed-bottom navColor">
            </footer>`;
            } else {
                contenido.innerHTML = '';
                contenido.innerHTML = `<div class="col-12 center-items" style="margin-top: 0.5rem; z-index: 2;">
                
                <div id="historial"></div>
                </div>`+
                    `<footer class="fixed-bottom navColor">
                <div class="container-fluid " style="margin-bottom: 1.5rem">
                    <div class="row"> 
                    <div class="col-12 text-center"><button id="eliminarbtn" data-bs-toggle="modal" data-bs-target="#modalEliminarHistorial"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16" style="margin-right: 10%">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                    </svg>Eliminar historial</button></div>    
                    </div>
                </div>
            </footer>`;
            }
            historial.forEach(item => {
                console.log(item);
                service = new google.maps.places.PlacesService(
                    document.createElement("div")
                );
                var request = {
                    placeId: item.Id_google,
                    language: "es",
                    fields: ["name", "photo"]
                };

                service.getDetails(request, callback);
                function callback(place, status) {
                    console.log(place);
                    let src = "";
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        let nombreLugar = place.name;
                        let nuevoElemento = document.createElement("div");
                        nuevoElemento.classList.add('resize');
                        nuevoElemento.id = item.Id_Historial;
                        if (Object.keys(place).includes("photos")) {
                            src = place.photos[0].getUrl({ maxWidth: 335, maxHeight: 400 });
                        }
                        nuevoElemento.innerHTML = `
                            <div class="contenedorSitio">
                            <img class="imagenSitio" alt="imagenSitio" src="`+ src + `">
                            <div id="nameSitio col">
                                <h6>`+ nombreLugar + `</h6>
                                <button class="detalles"><a style="text-decoration: none; color: black;" href="/turistas/detalles?id=` +
                            item.Id_google +
                            `">Detalles</a></button>
                            </div>
                            <div class="eliminarSitio1x1">
                            <button id="eliminar`+ num + `" onclick="eliminar(` + item.Id_Historial + `)" class="boton-redondo">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="red" class="bi bi-x-circle-fill eliminar" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                            </svg>
                            </button>
                            </div>
                            </div>`;

                        document.getElementById("historial").appendChild(nuevoElemento);
                        num++;
                    }
                }

            });
        });

    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.addEventListener('click', () => {
        historialElement.innerHTML = '';
    });
}
function eliminar(id) {
    let data = { id: id }
    fetch('/turistas/eliminarHistorialIndividual',
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then(function () {
        mostrarHistorial();
    });
}

function eliminarTodo() {
    fetch('/turistas/eliminarHistorialCompleto')
        .then(function (response) {
            mostrarHistorial();
        })
}
