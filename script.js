const userName = document.getElementById("userName")
const userTel = document.getElementById("userTel")
const userCompra = document.getElementById("userVenta")
const btnGenerarMensaje = document.getElementById("btnGenerarMensaje")
const btnGenerarLink = document.getElementById("btnGenerarLink")
const msjListo = document.getElementById("msjGenerado")
const formInfo = document.getElementById("formulario")

//Elemento para capturar el estado del día seleccionado. hay que actualizar la captura a cada change de los radios
let diaSeleccion = document.querySelector('input[name="saludo"]:checked');




formInfo.addEventListener("submit", generarMensaje)


function generarMensaje(e) {
    //Recibe datos del evento para crear el mensaje a enviar
    e.preventDefault();
    let formInfo = e.target
    let saludoDia = formInfo.querySelector('input[name="saludo"]:checked')
    let motivoMensaje = formInfo.querySelector('select')
    let datoExtra = formInfo.querySelector('#datoExtra')
    let mensaje = `Buenas ${saludoDia.value} ${formInfo.userName.value}, espero que estés bien.
                   Mati de Crow te saluda,
                   ${tipoMensaje(motivoMensaje.value, datoExtra.value)}
                   Cualquier consulta, estoy a disposición!`
    document.getElementById("msjGenerado").value = mensaje;
    document.getElementById("msjRevisar").style.display = "block";
}

//Recibe param con el número de opción elegida y retorna el mensaje acorde
function tipoMensaje(opcionContacto, datoExtra) {
    switch (opcionContacto) {
        case '1':
            return `Te escribo por tu compra ${formInfo.userVenta.value}. Estamos procesando la misma, ni bien tengamos novedades te contactaremos de nuevo `
        case '2':
            return `Te escribo para comentarte que en el día de hoy vamos a estar despachando tu pedido #${formInfo.userVenta.value}. A partir de mañana podrés hacer el seguimiento del mismo en ${datoExtra}`
        case '3':
            return `Te escribo para comentarte que tu pedido #${formInfo.userVenta.value} ya está en manos del servicio de logística. En el transcurso del día se estarán acercando a ${datoExtra} para hacer la entrega. Por cualquier inconveniente, ellos tienen tu número para contactarse directamente!`
        case '4':
            return `Te escribo para comentarte que tu pedido #${formInfo.userVenta.value} ya está listo. Podés pasar a retirarlo por nuestro local de Av. Córdoba 4878 de Lunes a Sábados de 10 a 19 hs`
        case '5':
            return `Te escribo por tu consulta sobre diseño. Te envío el número de la responsable del área quien te va a poder ayudar con más precisión - Micaela: +5491123225942`
        case '6':
            return `Te escribo por tu consulta sobre ventas mayoristas. Te envío el número del responsable del área para que te comuniques con él - Kevin: +5491164041334`
    }
}

//Abre ventana de chat de Whatsapp
function generarLink() {
    debugger
    let msjListo = document.getElementById("msjGenerado")
    let link = `http://wa.me/549${userTel.value}?text="${msjListo.value}"`
    window.open(link, "_blank")
}
//Array objetos opciones de contacto
const opcionesContacto = [
    { id: 1, nombre: 'Aviso compra' },
    { id: 2, nombre: 'Envio OCA' },
    { id: 3, nombre: 'Envio Moto' },
    { id: 4, nombre: 'Retiro por local' },
    { id: 5, nombre: 'Contacto por Instagram' },
    { id: 6, nombre: 'Contacto por Mayorista' }
];

//Inserta en DOM select de motivos de contacto
function insertarSelect(opciones) {
    let divMotivo = document.createElement("div")
    divMotivo.id = "divMotivo"
    divMotivo.innerHTML = `<p>Motivo de contacto: </p>`
   
    let select = document.createElement("select")
    select.id = "motivoContacto"
    opciones.forEach(e => {
        select.innerHTML += `<option value="${e.id}">${e.nombre}</option>`
    })
    divMotivo.append(select)
    document.getElementById("formulario").append(divMotivo);

    const selectMotivo = document.getElementById("motivoContacto")
    selectMotivo.addEventListener('change', function () {
        if ((selectMotivo.value == '2') || (selectMotivo.value == '3')) {
            document.getElementById("linkEnvio").style.display = 'block'
        } else {
            document.getElementById("linkEnvio").style.display = 'none'
        }
        document.getElementById("msjRevisar").style.display = "none";
        document.getElementById("msjGenerado").value = "";
    })
}
//Insertar en el DOM input para dato extra
function insertarDatoExtra() {
    let divDatoExtra = document.createElement("div")
    divDatoExtra.id = "linkEnvio"
    divDatoExtra.style.display = "none"
    divDatoExtra.innerHTML += `Dato Extra (Link OCA / Direccion Entrega): <input type="text" id="datoExtra">`
    document.getElementById("formulario").append(divDatoExtra);
    //Muestra/oculta input datoExtra según cambie la opcion seleccionada


}
//Inserta div donde colocará el mensaje generado, comienza oculto
function insertarMensajeGenerado() {
    let divContent = document.createElement("div")
    divContent.ClassName = "col-md-6";
    divContent.id = "msjRevisar";
    divContent.style.display = "none"

    divContent.innerHTML += `
    <textarea id="msjGenerado" class="form-control"></textarea>
    <button id="btnGenerarLink" class="btn btn-primary">Generar Link</button>
    `
    document.getElementById("crearMensaje").append(divContent)
    document.getElementById("btnGenerarLink").addEventListener("click", generarLink);
}

function insertarRadioButtons(){
    debugger
    let divSaludo = document.createElement("div")
    divSaludo.id = "momentoDia";
    divSaludo.innerHTML = `
                        <label for="saludoDias">
                            <input type="radio" id="saludoDias" name="saludo" value="dias" checked>
                            Buenos días
                        </label>

                        <label for="saludoTardes">
                            <input type="radio" id="saludoTardes" name="saludo" value="tardes">
                            Buenas tardes
                        </label>

                        <label for="saludoNoches">
                            <input type="radio" id="saludoNoches" name="saludo" value="noches">
                            Buenas noches
                        </label>`
    document.getElementById("formulario").append(divSaludo)

    const btnRadioDias = document.getElementById("momentoDia")

btnRadioDias.addEventListener('change', () => {
    diaSeleccion = document.querySelector('input[name="saludo"]:checked')
    document.getElementById("msjRevisar").style.display = "none";
    document.getElementById("msjGenerado").value = "";

});
             
}

function insertarBtnGenerar(){
    let div = document.createElement("div")
    div.innerHTML += `<input type="submit" value="Generar mensaje" id="btnGenerarMensaje">`
    document.getElementById("formulario").append(div);
}

document.addEventListener('DOMContentLoaded', function () {
    insertarDatoExtra()
    insertarSelect(opcionesContacto)
    insertarRadioButtons()
    insertarBtnGenerar()
    insertarMensajeGenerado()
})

