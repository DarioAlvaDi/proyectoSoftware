
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



            /*let contenido=document.getElementById('contenido');
            if(historial.length==0){
                contenido.innerHTML=`<div class="container d-flex justify-content-center align-items-center">
                <div class="col-12  historial-container">
                    <div class="historial-empty">
                        <p>Historial se encuentra vacio</p>
                    </div>
                </div>
            </div>`;
            }else{
                contenido.innerHTML=`<div class="col-12 center-items" style="margin-top: 0.5rem; z-index: 2;">
                <div id="selectedDayInfo"></div>
                <div id="historial"></div>
                </div>`;
            }*/ /*Prototipo para que si el historial no tiene lugares aparezca el mensaje de que esta vacio en caso contrario que aparezcan los lugares del historial*/



            const historialElement = document.getElementById('historial');
            historialElement.innerHTML = ''; // Limpiar el contenido anterior
            let num = 0;
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
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        let nombreLugar = place.name;
                        let nuevoElemento = document.createElement("div");
                        nuevoElemento.classList.add('resize');
                        nuevoElemento.id = item.Id_Historial;

                        nuevoElemento.innerHTML = `
    <div class="container rounded-pill border border-3 border-dark p-3 contenedorSitio">
        <div class="row">
            <div class="col text-center">
                <img src="`+ place.photos[0].getUrl({ maxWidth: 335, maxHeight: 400 }) + `" alt="busqueda" style="width:50%; height: 6rem">
            </div>
            <div class="col">
                <div class="row text-center">
                    <div class="col">
                        <p class="fw-bold nameSitio">`+ nombreLugar + `</p>
                        <button class="detalles" onclick="window.location.href = '../PantallaActualizarDatos/PantallaActulizarDatos.html'">Detalles</button>
                    </div>
                    <div class="col-3">
                    <button id="eliminar`+ num + `" onclick="eliminar(` + item.Id_Historial + `)" class="boton-redondo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="red" class="bi bi-x-circle-fill eliminar" viewBox="0 0 16 16" style="margin-top:25%">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                    </svg>
                    </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `;
                        document.getElementById("historial").appendChild(nuevoElemento);
                        num++;
                    }
                }

            });
        });


    /*var body = document.getElementById("body");
    for(let i=0;i<historial.length;i++){
        body.innerHTML=`<script>document.getElementById('eliminar`+i+`').addEventListener('click', function() {
            document.getElementById('lugar`+i+`').innerHTML = '';});</script>`;
    }*/ /* Prototipo para que cada boton que se encuentra en los sitios pueda eliminar el sitio del historial*/


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