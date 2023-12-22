/*function recargar(favoritos) {
    console.log("entro en la funcion" + favoritos);
    const contenido = document.getElementById('contenido');
    if (favoritos.length == 0) {
        contenido.innerHTML = '';
        contenido.innerHTML =
            `<div class="tab-container">
    <div class="tab-content">
        <div class="container d-flex justify-content-center align-items-center">
            <div class="col-12 favoritos-container">
                <div class="tab-shadow">
                    <div class="favoritos-empty">    
                        <p>Favoritos se encuentra vacío</p>
                    </div>
                </div> 
            </div>
        </div>
    </div> 
</div>
    <footer class="fixed-bottom navColor">
        <div class="container-fluid " style="margin-bottom: 3rem">
            <div class="fondo-con-boton">
                <button  id='agregarBtn' type="button" class="boton-en-fondo">
                    <a href="agregarfavoritos.html">
                        <img  src="../imgs/imgFavoritos/Agregar.png" alt="Descripción de la imagen del botón">
                    </a>
                </button>
            </div>
        </div>
    </footer>`;
    } else {
        contenido.innerHTML = '';
        contenido.innerHTML = `<div class="col-12 center-items" style="margin-top: 0.5rem; z-index: 2;">
        
        <div id="favoritos"></div>
        </div>`+
            `<footer class="fixed-bottom navColor">
        <div class="container-fluid " style="margin-bottom: 1.5rem">
            <div class="row"> 
            <div class="col-12 text-center"><button id="eliminarbtn" data-bs-toggle="modal" data-bs-target="#modalEliminarFavoritos"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16" style="margin-right: 10%">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
              </svg>Eliminar favoritos</button></div>    
            </div>
            </div>
            <div class="container-fluid " style="margin-bottom: 3rem">
            <div class="fondo-con-boton">
                <button  id='agregarBtn' type="button" class="boton-en-fondo">
                    <a href="agregarfavoritos.html">
                        <img  src="../imgs/imgFavoritos/Agregar.png" alt="Descripción de la imagen del botón">
                    </a>
                </button>
            </div>
            </div>
    </footer>`;
    } /*Prototipo para que si favoritos no tiene lugares aparezca el mensaje de que esta vacio en caso contrario que aparezcan los lugares del favoritos
}



document.addEventListener('DOMContentLoaded', () => {
    let favoritos = [{ imagen: 'Friday', nombre: 'bellas artes' },
    { imagen: 'Saturday', nombre: 'tacos de la esquina' },
    { imagen: 'Sunday', nombre: 'zocalo' },
    { imagen: 'Monday', nombre: 'plaza de las 3 culturas' }];
    let contenido = document.getElementById('contenido');
    recargar(favoritos);
    let favoritosElement = document.getElementById('favoritos');
    let num = 0;
    favoritos.forEach(nombre => {

        let nombreLugar = "Nombre lugar";
        let nuevoElemento = document.createElement("div");
        nuevoElemento.classList.add('resize');
        nuevoElemento.id = "lugar" + num;
        nuevoElemento.innerHTML = `

            <div class="contenedorSitio">
            <img class="imagenSitio" alt="imagenSitio" src="../imgs/imgFavoritos/Xochimilco.png">
            <div id="nameSitio col">
                <h6>`+ favoritos[num].nombre + `</h6>
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
        document.getElementById("favoritos").appendChild(nuevoElemento);
        num++;
    });

    var body = document.getElementById("body");

    for (let i = 0; i < favoritos.length; i++) {
        document.getElementById(`eliminar${i}`).addEventListener('click', function () {
            document.getElementById(`lugar${i}`).innerHTML = '';
            favoritos.splice(i, 1);
            console.log('i= ' + i + ' num = ' + num);
            num--;
            if (num == 0) {
                console.log("num==0 favoritos = " + favoritos.length);
                favoritos.length = 0;
            }
            if (favoritos.length == 0) {
                console.log("entro en el if" + favoritos);
                recargar(favoritos);
            }
        });
    }
    /*const agregarBtn = document.getElementById('agregarBtn');
    
        agregarBtn.addEventListener('click', () => {
            num++;
            favoritos.push({imagen: 'Friday', nombre: 'October 13, 2023'});
            console.log("entro agregar boton" +num+favoritos);
            recargar(favoritos);
        });



    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.addEventListener('click', () => {

    });
});
*/
window.onload = function () {
    mostrarFavoritos();

}
function eliminar(id) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Está acción no se podrá revertir!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, quiero borrarlo!"
    }).then((result) => {
        if (result.isConfirmed) {
            let data = { id: id }
            fetch('/turistas/eliminarFavoritosIndividual',
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(function () {
            mostrarFavoritos();
        });
            Swal.fire({
                title: "Borrado!",
                text: "Tu elemento de favoritos ha sido eliminado.",
                icon: "success"
            });
            }
        });
}

function eliminarTodo() {
    fetch('/turistas/eliminarFavoritos')
        .then(function (response) {
            mostrarFavoritos();
        })
}


function mostrarFavoritos() {
    let favoritos;
    fetch('/turistas/consultarFavoritos')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);
            favoritos = myJson;
            const favoritosElement = document.getElementById('contenido');
            favoritosElement.innerHTML = ''; // Limpiar el contenido anterior
            let num = 0;
            if (favoritos.length == 0) {
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
                
                <div id="favoritos"></div>
                </div>`+
                    `<footer class="fixed-bottom navColor">
                <div class="container-fluid " style="margin-bottom: 1.5rem">
                    <div class="row"> 
                    <div class="col-12 text-center"><button id="eliminarbtn" data-bs-toggle="modal" data-bs-target="#modalEliminarFavoritos"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16" style="margin-right: 10%">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                    </svg>Eliminar favoritos</button></div>    
                    </div>
                </div>
            </footer>`;
            }
            favoritos.forEach(item => {
                console.log(item);
                service = new google.maps.places.PlacesService(
                    document.createElement("div")
                );
                var request = {
                    placeId: item.Id_Lugar,
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
                        nuevoElemento.id = item.Id_Favoritos;
                        if (Object.keys(place).includes("photos")) {
                            src = place.photos[0].getUrl({ maxWidth: 335, maxHeight: 400 });
                        }
                        nuevoElemento.innerHTML = `
                            <div class="contenedorSitio">
                            <img class="imagenSitio" alt="imagenSitio" src="`+ src + `">
                            <div id="nameSitio col">
                                <h6>`+ nombreLugar + `</h6>
                                <button class="detalles"><a style="text-decoration: none; color: black;" href="/turistas/detalles?id=` +
                            item.Id_Lugar +
                            `">Detalles</a></button>
                            </div>
                            <div class="eliminarSitio1x1">
                            <button id="eliminar`+ num + `" onclick="eliminar(` + item.Id_Favoritos + `)" class="boton-redondo">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="red" class="bi bi-x-circle-fill eliminar" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                            </svg>
                            </button>
                            </div>
                            </div>`;

                        document.getElementById("favoritos").appendChild(nuevoElemento);
                        num++;
                    }
                }

            });
        });

    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.addEventListener('click', () => {

    });
}
