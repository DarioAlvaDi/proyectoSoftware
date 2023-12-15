function recargar(elemento){
    const contenido = document.getElementById('contenido');

    if(elemento.length === 0){
        contenido.innerHTML='';
        contenido.innerHTML =
            `<div class="tab-container">
                <div class="tab-content">
                    <div class="container d-flex justify-content-center align-items-center">
                        <div class="col-12 historial-container">
                            <div class="tab-shadow">
                                <div class="historial-empty">    
                                    <p>Itinerario se encuentra vacío</p>
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
                <div class="row">
                    <button type="button" class="btn ">
                        <img src="../imgs/itinerarioDia/Agregar.png" alt="agregar">
                    </button>
                </div>

                <div class="row m-2">

                    <div class="col text-center">
                        <button type="button" class="btn btn-danger rounded-4" data-bs-toggle="modal" data-bs-target="#modalItinerarios" id="eliminarbtn">
                            <div class="row">
                            <div>
                                <img src="../imgs/itinerarioDia/BoteBasura.png" alt="eliminar">
                    </div>
                    </div>
                            <div class="row">
                                Eliminar Itinerario
                            </div>
                        </button>
                    </div>


                    <div class="col text-center">
                        <button type="button" onclick="mostrarMensaje()" class="btn btn-dark rounded-4">
                            Generar ruta
                        </button>

                    </div>

                </div>
            </div>
            
        </footer> 
            `;
    } else {
        contenido.innerHTML='';
        contenido.innerHTML=`
        <div class="container">
            <div id="elemento"></div>        
        </div>
        
            `+`
        <div style="height: 10rem"></div>
        <footer class="fixed-bottom navColor">
            <!--Opciones de agregar y borrar-->
            <div class="container-fluid" style="margin-bottom: 1.5rem">
                <div class="row">
                    <button type="button" class="btn ">
                        <img src="../imgs/itinerarioDia/Agregar.png" alt="agregar">
                    </button>
                </div>

                <div class="row m-2">

                    <div class="col text-center">
                        <button type="button" class="btn btn-danger rounded-4" data-bs-toggle="modal" data-bs-target="#modalItinerarios" id="eliminarbtn">
                            <div class="row">
                            <div>
                                <img src="../imgs/itinerarioDia/BoteBasura.png" alt="eliminar">
                    </div>
                    </div>
                            <div class="row">
                                Eliminar Itinerario
                            </div>
                        </button>
                    </div>


                    <div class="col text-center">
                        <button type="button" onclick="mostrarMensaje()" class="btn btn-dark rounded-4">
                            Generar ruta
                        </button>

                    </div>

                </div>
            </div>
            
        </footer>
    `;
    }

}
/*Obtener de la base de datos los sitios guardados */
document.addEventListener('DOMContentLoaded', () => {
    const elemento = [
        {imagen: 'img1', nombre: 'Nombre del sitio1'},
        {imagen: 'img2', nombre: 'Nombre del sitio2'},
        {imagen: 'img3', nombre: 'Nombre del sitio3'},
        {imagen: 'img4', nombre: 'Nombre del sitio4'},
    ];

    const contenido = document.getElementById('contenido');
    recargar(elemento);
    const elementoElement = document.getElementById('elemento');
    let num=0;

    elemento.forEach(nombre => {
        let nombreLugar="Nombre lugar";
        let nuevoElemento = document.createElement("div");
        nuevoElemento.classList.add('resize');
        nuevoElemento.id="lugar"+num;

        nuevoElemento.innerHTML = `
        <div class="container border border-3 border-dark p-3 m-3 mx-auto navColor" style="border-radius: 24px">
                <div class="row">
                    <div class="col text-center">
                        <img src="../imgs/itinerarioDia/FotoLugar.png" alt="busqueda">
                    </div>
    
                    <div class="col">
                        <div class="row text-center">
                            <h6 class="fw-bold"> `+elemento[num].nombre+`</h6>
                        </div>
    
                        <div class="row text-center d-inline-flex">
    
                            <div class="col">
                                <select name="" id="" class="form-select text-bg-light form-select-sm w-auto" type="time">
                                    <option selected>Hora</option>
                                    <option value="00:00">00:00</option>
                                    <option value="01:00">01:00</option>
                                    <option value="02:00">02:00</option>
                                    <option value="03:00">03:00</option>
                                    <option value="04:00">04:00</option>
                                    <option value="05:00">05:00</option>
                                    <option value="06:00">06:00</option>
                                    <option value="07:00">07:00</option>
                                    <option value="08:00">08:00</option>
                                    <option value="09:00">09:00</option>
                                    <option value="10:00">10:00</option>
                                    <option value="11:00">11:00</option>
                                    <option value="12:00">12:00</option>
                                    <option value="13:00">13:00</option>
                                    <option value="14:00">14:00</option>
                                    <option value="15:00">15:00</option>
                                    <option value="16:00">16:00</option>
                                    <option value="17:00">17:00</option>
                                    <option value="18:00">18:00</option>
                                    <option value="19:00">19:00</option>
                                    <option value="20:00">20:00</option>
                                    <option value="21:00">21:00</option>
                                    <option value="22:00">22:00</option>
                                    <option value="23:00">23:00</option>
                                    <option value="24:00">24:00</option>
    
                                </select>
                            </div>
    
                            <div class="col">
                                <select name="" id=""  class="form-select text-bg-light form-select-sm w-auto">
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

    for(let i = 0; i < elemento.length; i++){
        document.getElementById(`eliminar${i}`).addEventListener('click', function() {
        document.getElementById(`lugar${i}`).innerHTML = '';
        elemento.splice(i, 1);
        num--;

        if(num == 0){
            elemento.length = 0;
        }
        if(elemento.length == 0){
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
});