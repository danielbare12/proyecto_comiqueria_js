//mostrando en la pagina

let cantidadCarrito = document.querySelector(".cantidadEnCarrito");
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

mostrarCantidad();
cargarPagina();

//Mostrando cantidad de productos en el carrito en total aunque se repitan 

function mostrarCantidad() {

    let cantidad = document.createElement("div");
    let resultado = carrito.map((comic) => comic.cantidad);
    let totalResultado = resultado.reduce((a, b) => a + b, 0);

    cantidad.innerHTML = `<p>${totalResultado}</p>`;

    cantidadCarrito.append(cantidad);
}

//En esta funcion se carga la pagina para mostrar los productos

let listaOrd = document.getElementById("listaProductos");

async function cargarPagina() {
    //usando fetch
    const resp = await fetch('./BaseDeDatos/comics.json')
    const listaComics = await resp.json();

    mostrarLista(listaComics);
}

//En esta funcion se muestran los productos, se creo una funcion por que se reutiliza

function mostrarLista(listaComics) {
    for (const comic of listaComics) {
        let articulo = document.createElement("div");

        articulo.classList.add("card");
        //desestructuracion
        const {
            id: comicId,
            titulo: comicTitulo,
            precio: comicPrecio,
            autor: comicAutor,
            imagen: comicImagen

        } = comic;

        articulo.innerHTML = `
        <img src="${comicImagen}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${comicTitulo}</h5>
          <p class="card-text">Autor: ${comicAutor}</p>
          <p class="card-text">Precio: ${comicPrecio}</p>
          <button type="button" id="${comicId}" class="boton btn btn-primary">Comprar</button>   
          </div>`;

        listaOrd.append(articulo);
    }
    const botones = document.querySelectorAll(".boton");
    botones.forEach((element) => {
        element.addEventListener("click", agregarProducto)
    });
}

//En esta funcion se agregan al carrito

async function agregarProducto(e) {
    const resp = await fetch('./BaseDeDatos/comics.json');
    const listaComics = await resp.json();

    //condicional
    const producto = e.target.closest(".card");
    const tituloProducto = producto.querySelector(".card-title").textContent;
    const titulosCarrito = carrito.map((producto) => producto.titulo);

    console.log(tituloProducto);
    //usando fetch

    if (titulosCarrito.includes(tituloProducto)) {
        for (let i = 0; i < carrito.length; i++) {
            if (carrito[i].titulo == tituloProducto) {
                carrito[i].cantidad++;
            }
        }
    } else {
        for (let i = 0; i < listaComics.length; i++) {
            //condicional
            listaComics[i].titulo == tituloProducto && carrito.push(listaComics[i]);
        }
    }

    const listaEnJsonCarrito = JSON.stringify(carrito);
    localStorage.setItem("carrito", listaEnJsonCarrito);
    //Le avisa al usuario que se agrego al carrito
    Toastify({
        text: "Agregado al carrito",
        duration: 3000,
        destination: "./secciones/carrito.html",
        newWindow: false,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "rgb(2,0,36)",
            background: "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(6,159,199,1) 0%, rgba(3,185,226,1) 0%, rgba(185,210,232,1) 0%, rgba(62,177,223,1) 100%, rgba(0,212,255,1) 100%)",
        },
        onClick: function () { } // Callback after click
    }).showToast();

    cantidadCarrito.innerHTML = '';
    mostrarCantidad();

}

//Aca se filtran los productos para que muestren los comics que el usuario quiere ver

let formulario = document.getElementById("formulario");
let busqueda = document.getElementById("buscador");

formulario.addEventListener("submit", buscar);

function buscar(e) {

    e.preventDefault();
    //usando fetch
    fetch('../BaseDeDatos/comics.json')
        .then((res) => res.json())
        .then((listaComics) => {
            const resultado = listaComics.filter((comic) => comic.titulo.toLowerCase().includes(busqueda.value.toLowerCase()) || comic.autor.toLowerCase().includes(busqueda.value.toLowerCase()));
            if (resultado.length == 0) {
                listaProductos.innerHTML = '';
                let mensajeVacio = document.createElement("div");

                mensajeVacio.innerHTML = `<h2 class="mensajeVacio">No hay resultados</h2>`;

                listaProductos.append(mensajeVacio);
            } else {
                listaProductos.innerHTML = '';
                mostrarLista(resultado);
                resultado.splice(0, resultado.length);

            }
        })
}

