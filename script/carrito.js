const listaProductos = JSON.parse(localStorage.getItem("carrito"));
const listaProductos2 = removeDuplicates(listaProductos);

function removeDuplicates(arr) {
    return arr.filter((item, 
        index) => arr.indexOf(item) === index);
}

let listaCarrito = document.getElementById("listaCarrito");

if(listaProductos.length == 0){
    let mensajeVacio = document.createElement("div");

    mensajeVacio.innerHTML = `<h2 class="mensajeVacio">EL CARRITO ESTA VACIO</h2>`;

    listaCarrito.append(mensajeVacio);
} else {

    for (const comic of listaProductos) {
        let articulo = document.createElement("div");
    
        articulo.classList.add("productoCarrito");
        //desestructuracion
        const {
            id: comicId,
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
             <p>Precio: ${comicPrecio}</p>
             <p>Autor: ${comicAutor}</p>
             </div>
             <div>Cantidad: ${comicCantidad}</div>
             <div class="espacioCerrar"><button type="button" class="btn-close botonCerrar" aria-label="Close"></button></div>
            </div>
        `;
    
        listaCarrito.append(articulo);
    
    }

    const botonesCerrar = document.querySelectorAll(".botonCerrar");
    botonesCerrar.forEach(element => {
        element.addEventListener("click", eliminarProducto)
    });


}

function cantidad(idcomic){
    const resultado = listaProductos.filter((producto) => producto.id == idcomic);
    return resultado.length;
}

let total = document.getElementById("precioTotal");
const listaPrecios = listaProductos.map((a) => a.precio);

total.innerText = `TOTAL: ${sumar(...listaPrecios)}`;

let botonFinalizar = document.getElementById("botonFinalizar");
botonFinalizar.addEventListener("click", finalizar);

//Funcion para borrar todo del carrito

function finalizar() {

    carrito = [];
    const listaEnJsonCarrito = JSON.stringify(carrito);
    localStorage.setItem("carrito", listaEnJsonCarrito);

//Le avisa al usuario que se realizo con exito la compra
    Swal.fire({
        title: 'COMPRA REALIZADA CON EXITO',
        icon: 'success',
        confirmButtonText: 'ACEPTAR',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            document.location.reload(true)
        }
      })
}

function eliminarProducto(e){
    const producto = e.target.closest(".descripcionCarrito");
    const tituloProducto = producto.querySelector(".tituloProducto").textContent;

    console.log(tituloProducto);

    for(let i = 0; i < listaProductos.length; i++){
        listaProductos[i].titulo == tituloProducto && listaProductos.splice(i,1);
    }

    const listaEnJsonCarrito = JSON.stringify(listaProductos);
    localStorage.setItem("carrito", listaEnJsonCarrito);

    document.location.reload(true);

}


//Funcion para sumar un grupo de numeros con spread
function sumar(...listaNumeros) {
    return listaNumeros.reduce((a, b) => a + b, 0);
}