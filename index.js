let productos = [];
let usuario;

// Variables para elementos de autenticación y usuario

let formularioIdentificacion;
let contenedorIdentificacion;
let contenedorUsuario;
let textoUsuario;
let limpiarStorage;

// Variables para formulario de productos
let formulario;
let inputId;
let inputNombreUsuario;
let inputPorciones;
let inputDireccion;
;

class Producto {
    constructor(id, nombre, porciones, direccion,) {
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.porciones = porciones;
        this.direccion = direccion;

    }
}

function inicializarElementos() {
    formularioIdentificacion = document.getElementById(
        "formularioIdentificacion"
    );
    inputUsuario = document.getElementById("inputUsuario");
    contenedorIdentificacion = document.getElementById(
        "contenedorIdentificacion"
    );
    contenedorUsuario = document.getElementById("contenedorUsuario");
    textoUsuario = document.getElementById("textoUsuario");


    limpiarStorage = document.getElementById("limpiarStorage");

    formulario = document.getElementById("formulario");
    inputId = document.getElementById("inputId");
    inputNombreUsuario = document.getElementById("inputNombreUsuario");
    inputPorciones = document.getElementById("inputPorciones");
    inputDireccion = document.getElementById("inputDireccion");
    contenedorProductos = document.getElementById("contenedorProductos");
}

function inicializarEventos() {
    formulario.onsubmit = (event) => validarFormulario(event);
    formularioIdentificacion.onsubmit = (event) => identificarUsuario(event);
    limpiarStorage.onclick = eliminarStorage;
}

function eliminarStorage() {
    localStorage.clear();
    usuario = "";
    productos = [];
    mostrarFormularioIdentificacion();
    pintarProductos();
}

function identificarUsuario(event) {
    event.preventDefault();
    usuario = inputUsuario.value;
    formularioIdentificacion.reset();
    actualizarUsuarioStorage();
    mostrarTextoUsuario();
}

function mostrarTextoUsuario() {
    contenedorIdentificacion.hidden = true;
    contenedorUsuario.hidden = false;
    textoUsuario.innerHTML += ` ${usuario}`;
}

function mostrarFormularioIdentificacion() {
    contenedorIdentificacion.hidden = false;
    contenedorUsuario.hidden = true;
    textoUsuario.innerHTML = ``;
}

function validarFormulario(event) {
    event.preventDefault();
    if (usuario) {
        let idProducto = inputId.value;
        let nombre = inputNombreUsuario.value;
        let porciones = parseFloat(inputPorciones.value);
        let direccion = inputDireccion.value

        const idExiste = productos.some((producto) => producto.id === idProducto);
        if (!idExiste) {
            let producto = new Producto(
                idProducto,
                nombre,
                porciones,
                direccion,
                
            );

            productos.push(producto);
            formulario.reset();
            actualizarProductosStorage();
            pintarProductos();
        } else {
            alert("El id ya existe");
        }
    } else {
        alert("Identifíquese antes de agregar un producto");
    }
}

function eliminarProducto(idProducto) {
    let columnaBorrar = document.getElementById(`columna-${idProducto}`);
    let indiceBorrar = productos.findIndex(
        (producto) => Number(producto.id) === Number(idProducto)
    );

    productos.splice(indiceBorrar, 1);
    columnaBorrar.remove();
    actualizarProductosStorage();
}

function pintarProductos() {
    contenedorProductos.innerHTML = "";
    productos.forEach((producto) => {
        let column = document.createElement("div");
        column.className = "col-md-4 mt-3";
        column.id = `columna-${producto.id}`;
        column.innerHTML = `
            <div class="card">
                <div class="card-body">
                <p class="card-text">Codigo:
                    <b>${producto.id}</b>
                </p>
                <p class="card-text">Nombre:
                    <b>${producto.nombre}</b>
                </p>
                <p class="card-text">Porciones:
                    <b>${producto.porciones}</b>
                </p>
                <p class="card-text">Direccion:
                    <b>${producto.direccion}</b>
                </p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger" id="botonEliminar-${producto.id}" >Eliminar</button>
                </div>
            </div>`;

        contenedorProductos.append(column);

        let botonEliminar = document.getElementById(`botonEliminar-${producto.id}`);
        botonEliminar.onclick = () => eliminarProducto(producto.id);
    });
}

function actualizarProductosStorage() {
    let productosJSON = JSON.stringify(productos);
    localStorage.setItem("productos", productosJSON);
}

function actualizarUsuarioStorage() {
    localStorage.setItem("usuario", usuario);
}

function obtenerProductosStorage() {
    let productosJSON = localStorage.getItem("productos");
    if (productosJSON) {
        productos = JSON.parse(productosJSON);
        pintarProductos();
    }
}

function obtenerUsuarioStorage() {
    let usuarioAlmacenado = localStorage.getItem("usuario");
    if (usuarioAlmacenado) {
        usuario = usuarioAlmacenado;
        mostrarTextoUsuario();
    }
}

function main() {
    inicializarElementos();
    inicializarEventos();
    obtenerProductosStorage();
    obtenerUsuarioStorage();
}

main();