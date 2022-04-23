const listaProductos = JSON.parse(localStorage.getItem("carrito")) || [];
let listaCarrito = document.getElementById("listaCarrito");
let cantidadCarrito = document.querySelector(".cantidadEnCarrito");

//Cargando la pagina 
mostrarCantidad();
cargarPagina();


//Funcion para mostrar la cantidad de productos en el carrito
function mostrarCantidad() {

    let cantidad = document.createElement("div");
    let resultado = listaProductos.map((comic) => comic.cantidad);
    let totalResultado = resultado.reduce((a, b) => a + b, 0);

    cantidad.innerHTML = `<p>${totalResultado}</p>`;

    cantidadCarrito.append(cantidad);
}

//Funcion para cargar la pagina

function cargarPagina() {

    //mensaje para indicar que el carrito esta vacio
    if (listaProductos.length == 0) {
        let mensajeVacio = document.createElement("div");
        mensajeVacio.classList.add("contenedorVacio");

        mensajeVacio.innerHTML = `<h2 class="mensajeVacio">EL CARRITO ESTA VACIO</h2>
                                    <img src="../media/carro-vacio.png" alt="">`;

        listaCarrito.append(mensajeVacio);
    } else {
        //Se muestra todo el contenido del carrito
        for (const comic of listaProductos) {
            let articulo = document.createElement("div");

            articulo.classList.add("productoCarrito");
            //desestructuracion
            const {
                titulo: comicTitulo,
                precio: comicPrecio,
                autor: comicAutor,
                imagen: comicImagen,
                cantidad: comicCantidad
            } = comic

            articulo.innerHTML = `<div>
            <img  class="imagenCarrito" src=".${comicImagen}" alt="">
                    </div>
                <div class="descripcionCarrito">
                <div>
                 <h2 class="tituloProducto">${comicTitulo}</h2>
                 <p>Autor: ${comicAutor}</p>
                 <p>Precio: ${comicPrecio}</p>
                 </div>
                 <div class="cantidadProducto"><p>Cantidad: ${comicCantidad}</p></div>
                 <div class="modificadorCantidad"><img class="aumentador" src="../media/suma.png" alt=""><img class="disminuidor" src="../media/resta.png" alt=""></div>
                 <div class="espacioCerrar"><button type="button" class="btn-close botonCerrar" aria-label="Close"></button></div>
                </div>
            `;

            listaCarrito.append(articulo);

        }

        //Se agregan las funciones de los botones

        const botonesCerrar = document.querySelectorAll(".botonCerrar");
        botonesCerrar.forEach((element) => {
            element.addEventListener("click", eliminarProducto)
        });

        const botonesAumentar = document.querySelectorAll(".aumentador");
        botonesAumentar.forEach((element) => {
            element.addEventListener("click", aumentarCantidad)
        });

        const botonesDisminuir = document.querySelectorAll(".disminuidor");
        botonesDisminuir.forEach((element) => {
            element.addEventListener("click", disminuirCantidad)
        });


    }

    //Se muestra el precio total de todo el carrito

    let total = document.getElementById("precioTotal");

    total.innerHTML = `<p>TOTAL: ${sumarTotal(listaProductos)}</p>`;

    let botonFinalizar = document.getElementById("botonFinalizar");
    botonFinalizar.addEventListener("click", finalizar);


}


//Funcion para sumar un todos los precios y devolver el total
function sumarTotal(listaComics) {
    let total = 0;

    for (let i = 0; i < listaComics.length; i++) {
        total += listaComics[i].precio * listaComics[i].cantidad;
    }

    return total;
}

//Funcion para borrar todo del carrito

function finalizar() {

    carrito = [];
    const listaEnJsonCarrito = JSON.stringify(carrito);
    localStorage.setItem("carrito", listaEnJsonCarrito);

    //Le avisa al usuario que se realizo con exito la compra

    let fecha = new Date();
    Swal.fire({
        title: 'COMPRA REALIZADA CON EXITO',
        icon: 'success',
        text: `Compra hecha el ${fecha.toLocaleDateString()} a las ${fecha.toTimeString()}`,
        confirmButtonText: 'ACEPTAR',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            document.location.reload(true)
        }
    })
}

//Funcion para depositar en el carrito modificaciones y volver a cargar la pagina

function cargarAlCarrito(lista) {
    localStorage.setItem("carrito", JSON.stringify(lista));

    listaCarrito.innerHTML='';
    cantidadCarrito.innerHTML='';
    mostrarCantidad();
    cargarPagina();

}

//Funcion para eliminar un producto del carrito
function eliminarProducto(e) {
    const producto = e.target.closest(".descripcionCarrito");
    const tituloProducto = producto.querySelector(".tituloProducto").textContent;

    console.log(tituloProducto);

    for (let i = 0; i < listaProductos.length; i++) {
        listaProductos[i].titulo == tituloProducto && listaProductos.splice(i, 1);
    }

    cargarAlCarrito(listaProductos);

}

//Funcion para aumentar la cantidad de un producto
function aumentarCantidad(e) {
    const producto = e.target.closest(".descripcionCarrito");
    const tituloProducto = producto.querySelector(".tituloProducto").textContent;

    console.log(tituloProducto);

    for (let i = 0; i < listaProductos.length; i++) {
        listaProductos[i].titulo == tituloProducto && listaProductos[i].cantidad++;
    }

    cargarAlCarrito(listaProductos);

}

//Funcion para disminuir la cantidad de un producto y si es 0 se elimina del carrito
function disminuirCantidad(e) {
    const producto = e.target.closest(".descripcionCarrito");
    const tituloProducto = producto.querySelector(".tituloProducto").textContent;

    console.log(tituloProducto);

    for (let i = 0; i < listaProductos.length; i++) {
        listaProductos[i].titulo == tituloProducto && listaProductos[i].cantidad--;
        listaProductos[i].cantidad <= 0 && listaProductos.splice(i, 1);
    }

    cargarAlCarrito(listaProductos);

}

