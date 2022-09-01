let formulario = document.getElementById('form')
let btnMostrar = document.getElementById('botonMostrar');
let tablaPedidos = document.getElementById('tabla')
let btnGuardar = document.getElementById('btnGuardar')
let inputs = document.getElementsByTagName('input')


// CLASES Y CONSTRUCTOR //
class Pedidos {
    constructor(id, nombre, direccion, telefono, garantia) {
        this.id = id,
        this.nombre = nombre,
        this.direccion = direccion,
        this.telefono = telefono,
        this.garantia = garantia
    }
}


// LISTA DE PEDIDOS TRAIDAS DE ARCHIVO JSON VIA FETCH

let listaPedidos = [];
fetch("listadoPedidos.json")
.then(pedidos => pedidos.json())
.then(pedido => {
    let arrayStorage = localStorage.getItem("pedidoStorage") ? listaPedidos = JSON.parse(localStorage.getItem("pedidoStorage")) : 
    listaPedidos.push(pedido)
    localStorage.setItem("pedidoStorage", JSON.stringify(listaPedidos))
    listaPedidos = JSON.parse(localStorage.getItem(listaPedidos))
});
console.log(listaPedidos);


// AGREGAR NUEVOS ELEMENTOS AL ARRAY

function tomarPedido() {
    let nombreIngresado = document.getElementById("ingresoNombre")
    let dirIngresada = document.getElementById("ingresoDireccion")
    let telIngresado = document.getElementById("ingresoTelefono")
    let gtiaIngresada = document.getElementById("ingresoGarantia")
    let pedidoNuevo = new Pedidos(listaPedidos.length + 1, nombreIngresado.value, dirIngresada.value, telIngresado.value, gtiaIngresada.value)
    listaPedidos.push(pedidoNuevo)
    localStorage.setItem("listaPedidos", JSON.stringify(listaPedidos))
}

// FUNCION DE GUARDADO DE ELEMENTOS A ARRAY

btnGuardar.addEventListener('click', () => {
    if (document.getElementById('ingresoNombre').value === "") {
        Swal.fire({
            position: 'top',
            toast: 'error',
            icon: 'error',
            title: 'No ha ingresado un nombre.',
            showConfirmButton: false,
            timer: 2000,
        })} else if (document.getElementById('ingresoDireccion').value === "") {
            Swal.fire({
                position: 'top',
                toast: 'error',
                icon: 'error',
                title: 'No ha ingresado una dirección.',
                showConfirmButton: false,
                timer: 2000,
            })}
            else if (document.getElementById('ingresoTelefono').value === "") {
                Swal.fire({
                    position: 'top',
                    toast: 'error',
                    icon: 'error',
                    title: 'No ha ingresado un Nro. Telefónico.',
                    showConfirmButton: false,
                    timer: 2000,
                })
                
            }else if (document.getElementById('ingresoGarantia').value === "") {
                Swal.fire({
                    position: 'top',
                    toast: 'error',
                    icon: 'error',
                    title: 'No indicó garantía.',
                    showConfirmButton: false,
                    timer: 2000,
                })
                
            }else {
            tomarPedido()
            Swal.fire({
                position: 'top',
                toast: 'true',
                icon: 'success',
                title: 'Su pedido ha sido ingresado exitosamente.',
                showConfirmButton: false,
                timer: 2500,
            })
        }
    })

// MOSTRAR ARRAY COMPLETO EN TABLA 

const cabeceros = ["Id", "Nombre", "Dirección", "Telefono", "Garantía"];
function crearTabla() {
    let tabla = document.createElement('table')
    let filaCabecera = document.createElement('tr')
    tablaPedidos.setAttribute("class", "table ")

    cabeceros.forEach(textoCabecero => {
        let cabecera = document.createElement('th');
        let nodoTexto = document.createTextNode(textoCabecero);
        cabecera.appendChild(nodoTexto);
        filaCabecera.appendChild(cabecera);
    });
    tabla.appendChild(filaCabecera);
    listaPedidos.forEach(caso => {
        let filaDatos = document.createElement('tr')
        Object.values(caso).forEach(dato => {
            let celdaDato = document.createElement('td');
            let nodoDato = document.createTextNode(dato);
            celdaDato.appendChild(nodoDato);
            filaDatos.appendChild(celdaDato);
        })
        tabla.appendChild(filaDatos);
    })
    tablaPedidos.appendChild(tabla);
}

// BOTON PARA MOSTRAR Y OCULTAR TABLA DE ARRAYS

btnMostrar.addEventListener('click', () => {
    tabla.innerText == "" ?
        (crearTabla(),
            btnMostrar.innerText = "Ocultar Pedidos") :
        (tabla.innerText = "",
            btnMostrar.innerText = "Mostrar Pedidos");
})



