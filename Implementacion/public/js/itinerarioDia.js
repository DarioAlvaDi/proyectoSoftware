function recargar(elemento) {
    const contenido = document.getElementById('contenido');

    if (elemento.length === 0) {
        contenido.innerHTML = '';
        contenido.innerHTML =
            `
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
                        Itinerario vacío
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
            <div style="height: 10rem"></div>
        <footer class="fixed-bottom navColor">
            <!--Opciones de agregar y borrar-->
            <div class="container-fluid" style="margin-bottom: 1.5rem">
                <div class="text-center">
                    <button type="button" class="btn ">
                        <img src="../imgs/itinerarioDia/Agregar.png" alt="agregar">
                    </button>
                    
                </div>

            </div>
            
        </footer> 
            `;
    } else {
        const urlParams = new URLSearchParams(window.location.search);

        const id = urlParams.get('id')
        contenido.innerHTML = '';
        contenido.innerHTML = `
        <div class="container">
            <div id="elemento"></div>        
        </div>
        
            `+ `
          
        <div style="height: 10rem"></div>
        <footer class="fixed-bottom navColor">
            <!--Opciones de agregar y borrar-->
            <div class="container-fluid" style="margin-bottom: 1.5rem">
                <div class="text-center">
                    <button type="button" class="btn ">
                        <img src="../imgs/itinerarioDia/Agregar.png" alt="agregar">
                    </button>
                    
                </div>

                <div class="row">

                    <div class="col text-center">
                        <button type="button" class="btn btn-danger rounded-4" data-bs-toggle="modal" data-bs-target="#modalItinerarios" id="eliminarbtn">
                                <img src="../imgs/itinerarioDia/BoteBasura.png" alt="eliminar">
                                Eliminar Itinerario
                        </button>
                    </div>


                    <div class="col text-center">
                        <button type="button" class="btn btn-dark rounded-4">
                            <a href="/turistas/test?id=${id}">Generar ruta</a>
                        </button>

                    </div>

                </div>
            </div>
            
        </footer>
    `;
    }

}

function horaElemento(nombreElemento, elementos, valorSeleccionado) {
    for (let i = 0; i < elementos.length; i++) {
        if (elementos[i].nombre === nombreElemento) {
            var indice = i;
        }
    }

    elementos[indice].hora = valorSeleccionado;
    sort(elementos);

    recargar(elementos);

    console.log(elementos);

    imprimir(elementos);

}

function sort(elementos) {
    var i, j, temp;
    var swapped;
    var n = elementos.length;
    for (i = 0; i < n - 1; i++) {
        swapped = false;
        for (j = 0; j < n - i - 1; j++) {
            if (elementos[j].hora > elementos[j + 1].hora) {
                temp = elementos[j];
                elementos[j] = elementos[j + 1];
                elementos[j + 1] = temp;
                swapped = true;
            }
        }
        if (swapped == false)
            break;
    }

}

function mostrarBotonVisita(indice, num, elemento) {
    document.getElementById(`lugar${indice}`).innerHTML = '';
    elemento.splice(indice, 1);

    if (num == 0) {
        elemento.length = 0;
    }
    if (elemento.length == 0) {
        recargar(elemento);
    }
}

/*Obtener de la base de datos los sitios guardados */
document.addEventListener('DOMContentLoaded', () => {
    const elemento = [
        { imagen: 'img1', nombre: 'Nombre del sitio1', hora: '00:00', visita: '0' },
        { imagen: 'img2', nombre: 'Nombre del sitio2', hora: '00:00', visita: '0' },
        { imagen: 'img3', nombre: 'Nombre del sitio3', hora: '00:00', visita: '0' },
        { imagen: 'img4', nombre: 'Nombre del sitio4', hora: '00:00', visita: '0' },
    ];

    const contenido = document.getElementById('contenido');
    recargar(elemento);

    imprimir(elemento);
});

function imprimir(elemento) {

    const elementoElement = document.getElementById('elemento');
    let num = 0;

    elemento.forEach(nombre => {
        let nombreLugar = "Nombre lugar";
        let hora = elemento[num].hora;
        let nuevoElemento = document.createElement("div");
        nuevoElemento.classList.add('resize');
        nuevoElemento.id = "lugar" + num;


        nuevoElemento.innerHTML = `
        <div class="container border border-3 border-dark p-3 m-3 mx-auto sitioColor" style="border-radius: 24px">
                <div class="row">
                    <div class="col text-center">
                        <img src="../imgs/itinerarioDia/FotoLugar.png" alt="busqueda">
                    </div>
    
                    <div class="col">
                        <div class="row text-center">
                            <h6 class="fw-bold"> `+ elemento[num].nombre + `</h6>
                        </div>
    
                        <div class="row text-center d-inline-flex">
    
                            <div class="col">
                                <input type="time" name="hora" id="horaElemento`+ num + `" class="form-select w-auto" value="${elemento[num].hora}">
                            </div>
    
                            <div class="col">
                                <select name="" id="visitaElemento`+ num + `"  class="form-select text-bg-light form-select-sm w-auto">
                                    <option selected value="0">No visitado</option>
                                    <option value="1">Visitado</option>
                                </select>
                            </div>
    
                            <div class="col">
    
                                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modalElemento`+ num + `">
                                    <img src="../imgs/itinerarioDia/BotonEliminar.png" alt="botonEliminar">
    
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    
        <!-- Confirmacion eliminar elemento -->
            <div class="modal fade" id="modalElemento`+ num + `" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content navColor">
    
                    <button type="button" class="btn-close m-2" data-bs-dismiss="modal" aria-label="Close"></button>
    
                    <div class="modal-body text-center">
                        <div class="row">
                            <h5>¿Estás seguro de que deseas eliminar este elemento de tu itinerario?</h5>
    
                        </div>
    
                        <div class="row m-3">
                            <button type="button"  data-bs-toggle="modal" data-bs-target="#modalElemento" class="btn btn-danger rounded-4" id="eliminar`+ num + `">
                                <img src="../imgs/itinerarioDia/BoteBasura.png" alt="eliminar">
                                Confirmar eliminación
                            </button>
                        </div>
    
                        <div class="row m-3">
                            <button type="button" class="btn btn-secondary rounded-4" data-bs-toggle="modal" data-bs-target="#modalElemento">
                                <img src="../imgs/itinerarioDia/BotonEliminar.png" alt="eliminar">
                                Cancelar
                            </button>
    
                        </div>
                    </div>
                </div>
                </div>
            </div>
    
        `;
        document.getElementById("elemento").appendChild(nuevoElemento);
        num++;
    });

    const body = document.getElementById('body');

    for (let i = 0; i < elemento.length; i++) {
        document.getElementById(`eliminar${i}`).addEventListener('click', function () {
            document.getElementById(`lugar${i}`).innerHTML = '';
            elemento.splice(i, 1);
            num--;

            if (num == 0) {
                elemento.length = 0;
            }
            if (elemento.length == 0) {
                recargar(elemento);
            }


        });
    }

    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.addEventListener('click', () => {
        elementoElement.innerHTML = '';
        elemento.length = 0;
        recargar(elemento);
    });

    for (let i = 0; i < elemento.length; i++) {
        const horaSelect = document.getElementById(`horaElemento${i}`);
        const visitaSelect = document.getElementById(`visitaElemento${i}`);

        horaSelect.addEventListener('change', function () {
            const valorSeleccionado = horaSelect.value;
            const nombreElemento = elemento[i].nombre;

            horaElemento(nombreElemento, elemento, valorSeleccionado);
        });

        visitaSelect.addEventListener('change', function () {
            num--;
            mostrarBotonVisita(i, num, elemento);
        });
    }
}


window.onload = function () {
    mostrarItinerario();
};
function mostrarItinerario() {
    let ubi = JSON.parse(localStorage.getItem("ubi"));
    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get("id");
    let data = { id: id };
    fetch("/turistas/consultarItinerarioFecha", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);
            const contenido = document.getElementById('contenido');
            if (myJson.length === 0) {
                contenido.innerHTML = '';
                contenido.innerHTML =
                    `
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
                                Itinerario vacío
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> 
                    <div style="height: 10rem"></div>
                <footer class="fixed-bottom navColor">
                    <!--Opciones de agregar y borrar-->
                    <div class="container-fluid" style="margin-bottom: 1.5rem">
                        <div class="text-center">
                            <button type="button" class="btn ">
                                <img src="../imgs/itinerarioDia/Agregar.png" alt="agregar">
                            </button>
                            
                        </div>
        
                    </div>
                    
                </footer> 
                    `;
            } else {
                const urlParams = new URLSearchParams(window.location.search);

                const id = urlParams.get('id')
                contenido.innerHTML = '';
                contenido.innerHTML = `
                <div class="container">
                    <div id="elemento"></div>        
                </div>
                
                    `+ `
                  
                <div style="height: 10rem"></div>
                <footer class="fixed-bottom navColor">
                    <!--Opciones de agregar y borrar-->
                    <div class="container-fluid" style="margin-bottom: 1.5rem">
                        <div class="text-center">
                            <button type="button" class="btn ">
                                <img src="../imgs/itinerarioDia/Agregar.png" alt="agregar">
                            </button>
                            
                        </div>
        
                        <div class="row">
        
                            <div class="col text-center">
                                <button type="button" class="btn btn-danger rounded-4" data-bs-toggle="modal" data-bs-target="#modalItinerarios" id="eliminarbtn">
                                        <img src="../imgs/itinerarioDia/BoteBasura.png" alt="eliminar">
                                        Eliminar Itinerario
                                </button>
                            </div>
        
        
                            <div class="col text-center">
                                <button type="button" class="btn btn-dark rounded-4">
                                    <a href="/turistas/test?id=${id}">Generar ruta</a>
                                </button>
        
                            </div>
        
                        </div>
                    </div>
                    
                </footer>
            `;
                let num = 0;
                myJson.forEach(item => {
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
                            nuevoElemento.id = item.Id_Itinerario;
                            if (Object.keys(place).includes("photos")) {
                                src = place.photos[0].getUrl({ maxWidth: 300, maxHeight: 400 });
                            }
                            nuevoElemento.innerHTML = `
                <div class="container border border-3 border-dark p-3 m-3 mx-auto sitioColor" style="border-radius: 24px">
                        <div class="row">
                            <div class="col text-center">
                                <img src="${src}" alt="busqueda">
                            </div>
            
                            <div class="col">
                                <div class="row text-center">
                                    <h6 class="fw-bold"> `+ nombreLugar + `</h6>
                                </div>
            
                                <div class="row text-center d-inline-flex">
            
                                    <div class="col">
                                        <input type="time" name="hora" id="horaElemento`+ num + `" class="form-select w-auto" value="${item.Hora_Itinerario}">
                                    </div>
            
                                    <div class="col">
                                        <select name="" id="visitaElemento`+ num + `"  class="form-select text-bg-light form-select-sm w-auto">
                                            <option selected value="0">No visitado</option>
                                            <option value="1">Visitado</option>
                                        </select>
                                    </div>
            
                                    <div class="col">
            
                                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modalElemento`+ num + `">
                                            <img src="../imgs/itinerarioDia/BotonEliminar.png" alt="botonEliminar">
            
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            
                <!-- Confirmacion eliminar elemento -->
                    <div class="modal fade" id="modalElemento`+ num + `" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content navColor">
            
                            <button type="button" class="btn-close m-2" data-bs-dismiss="modal" aria-label="Close"></button>
            
                            <div class="modal-body text-center">
                                <div class="row">
                                    <h5>¿Estás seguro de que deseas eliminar este elemento de tu itinerario?</h5>
            
                                </div>
            
                                <div class="row m-3">
                                    <button type="button"  data-bs-toggle="modal" data-bs-target="#modalElemento" class="btn btn-danger rounded-4" id="eliminar`+ num + `">
                                        <img src="../imgs/itinerarioDia/BoteBasura.png" alt="eliminar">
                                        Confirmar eliminación
                                    </button>
                                </div>
            
                                <div class="row m-3">
                                    <button type="button" class="btn btn-secondary rounded-4" data-bs-toggle="modal" data-bs-target="#modalElemento">
                                        <img src="../imgs/itinerarioDia/BotonEliminar.png" alt="eliminar">
                                        Cancelar
                                    </button>
            
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
            
                `;

                            document.getElementById("elemento").appendChild(nuevoElemento);
                            num++;
                        }
                    }
                });

            }

        });
}