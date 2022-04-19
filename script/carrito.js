const listaProductos = JSON.parse(localStorage.getItem("carrito"));

let listaCarrito = document.getElementById("listaCarrito");

for (const comic of listaProductos) {
    let articulo = document.createElement("div");

    articulo.classList.add("productoCarrito");
    //desestructuracion
    const {
        id: comicId,
        titulo: comicTitulo,
        precio: comicPrecio,
        autor: comicAutor,
        imagen: comicImagen
    } = comic

    articulo.innerHTML = `<div>
    <img  class="imagenCarrito" src=".${comicImagen}" alt="">
            </div>
        <div class="descripcionCarrito">
         <h2>${comicTitulo}</h2>
         <p>Precio: ${comicPrecio}</p>
         <p>Autor: ${comicAutor}</p>
        </div>
    `;


    listaCarrito.append(articulo);

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


//Funcion para sumar un grupo de numeros con spread
function sumar(...listaNumeros) {
    return listaNumeros.reduce((a, b) => a + b, 0);
}