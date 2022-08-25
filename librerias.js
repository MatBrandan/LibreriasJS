let formulario = document.getElementById('form')
let btnMostrar = document.getElementById('botonMostrar');
let tablaPedidos = document.getElementById('tabla')
let btnGuardar = document.getElementById('btnGuardar')
let inputs = document.getElementsByTagName('input')


// CLASES Y CONSTRUCTOR //
class Pedidos{
    constructor(id, nombre, direccion, telefono, garantia){
        this.id = id,
        this.nombre = nombre,
        this.direccion = direccion,
        this.telefono = telefono,
        this.garantia = garantia
    }
}

// ELEMENTOS DE ARRAY HARDCODEADOS PARA EJEMPLO

const pedido1 = new Pedidos(1, "Pepa Rosas", "Calle Falsa 123", 1122334455, "Si")
const pedido2 = new Pedidos(2, "Luis Alfonson", "Tupac Amaru 2331", 1199008877, "No")
const pedido3 = new Pedidos(3, "Cecilia Millan", "Uspallata 664", 1166557744, "Si")

let listaPedidos = [];

// SUBIR ARRAY A LOCALSTORAGE
let arrayStorage = localStorage.getItem("listaPedidos") ? listaPedidos = JSON.parse(localStorage.getItem("listaPedidos")) :
    (listaPedidos.push(pedido1, pedido2, pedido3),
    localStorage.setItem("listaPedidos", JSON.stringify(listaPedidos)));


// AGREGAR NUEVOS ELEMENTOS AL ARRAY

function tomarPedido(){
    let nombreIngresado = document.getElementById("ingresoNombre")
    let dirIngresada = document.getElementById("ingresoDireccion")
    let telIngresado = document.getElementById("ingresoTelefono")
    let gtiaIngresada = document.getElementById("ingresoGarantia")
    let pedidoNuevo = new Pedidos(listaPedidos.length+1, nombreIngresado.value, dirIngresada.value, telIngresado.value, gtiaIngresada.value)
    listaPedidos.push(pedidoNuevo)
    localStorage.setItem("listaPedidos", JSON.stringify(listaPedidos))
}

btnGuardar.addEventListener('click',() =>{
    if(inputs.innerText == ""){
        alert('ingrese datos')
    }else{
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
});
  
// MOSTRAR ARRAY COMPLETO EN TABLA 

const cabeceros = ["Id", "Nombre", "Dirección", "Telefono", "Garantía"];
function crearTabla(){
    let tabla = document.createElement('table')
    let filaCabecera = document.createElement('tr')
    tablaPedidos.setAttribute("class", "table ")
    
    cabeceros.forEach(textoCabecero =>{
        let cabecera = document.createElement('th');
        let nodoTexto = document.createTextNode(textoCabecero);
        cabecera.appendChild(nodoTexto);
        filaCabecera.appendChild(cabecera);
    });
    tabla.appendChild(filaCabecera);
    listaPedidos.forEach(caso =>{
        let filaDatos = document.createElement('tr')
        Object.values(caso).forEach(dato =>{
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

btnMostrar.addEventListener('click',()=>{
    tabla.innerText == "" ?
        (crearTabla(),
        btnMostrar.innerText = "Ocultar Pedidos") :
        (tabla.innerText = "",
        btnMostrar.innerText = "Mostrar Pedidos") ;
})



