function recargar(historial) {
    console.log("entro en la funcion" + historial);
    const contenido = document.getElementById('contenido');
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
    } /*Prototipo para que si favoritos no tiene lugares aparezca el mensaje de que esta vacio en caso contrario que aparezcan los lugares del favoritos*/
}



document.addEventListener('DOMContentLoaded', () => {
    let historial = [{ imagen: 'Friday', nombre: 'October 13, 2023' },
    { imagen: 'Saturday', nombre: 'October 14, 2023' },
    { imagen: 'Sunday', nombre: 'October 15, 2023' },
    { imagen: 'Monday', nombre: 'October 16, 2023' }];
    let contenido = document.getElementById('contenido');
    recargar(historial);
    let historialElement = document.getElementById('historial');
    let num = 0;
    historial.forEach(nombre => {

        let nombreLugar = "Nombre lugar";
        let nuevoElemento = document.createElement("div");
        nuevoElemento.classList.add('resize');
        nuevoElemento.id = "lugar" + num;
        nuevoElemento.innerHTML = `

            <div class="contenedorSitio">
            <img class="imagenSitio" alt="imagenSitio" src="../imgs/imgHistorial/Xochimilco.png">
            <div id="nameSitio col">
                <h6>`+ historial[num].nombre + `</h6>
                <button class="detalles" onclick="window.location.href = '../PantallaActualizarDatos/PantallaActulizarDatos.html'">Detalles</button>
            </div>
            <div class="eliminarSitio1x1">
            <button id="eliminar`+ num + `" class="boton-redondo">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="red" class="bi bi-x-circle-fill eliminar" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
            </svg>
            </button>
            </div>
            </div>`;
        document.getElementById("historial").appendChild(nuevoElemento);
        num++;
    });

    var body = document.getElementById("body");

    for (let i = 0; i < historial.length; i++) {
        document.getElementById(`eliminar${i}`).addEventListener('click', function () {
            document.getElementById(`lugar${i}`).innerHTML = '';
            historial.splice(i, 1);
            console.log('i= ' + i + ' num = ' + num);
            num--;
            if (num == 0) {
                console.log("num==0 historial = " + historial.length);
                historial.length = 0;
            }
            if (historial.length == 0) {
                console.log("entro en el if" + historial);
                recargar(historial);
            }
        });
    }
    /*const agregarBtn = document.getElementById('agregarBtn');
    
        agregarBtn.addEventListener('click', () => {
            num++;
            favoritos.push({imagen: 'Friday', nombre: 'October 13, 2023'});
            console.log("entro agregar boton" +num+favoritos);
            recargar(favoritos);
        });*/



    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.addEventListener('click', () => {
        historialElement.innerHTML = '';
        historial.length = 0;
        recargar(historial);
    });
});




