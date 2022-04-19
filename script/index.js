
let listaOrd = document.getElementById("listaProductos");
//mostrando en la pagina

async function cargarPagina() {
//usando fetch
    const resp = await fetch('./BaseDeDatos/comics.json')
    const listaComics = await resp.json();

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
          <p class="card-text">Precio: ${comicPrecio}</p>
          <p class="card-text">Autor: ${comicAutor}</p>
          <button type="button" id="${comicId}" class="boton btn btn-primary">Comprar</button>   
          </div>`;


        listaOrd.append(articulo);

    }

    const botones = document.querySelectorAll(".boton");
    botones.forEach(element => {
        element.addEventListener("click", agregarProducto)
    });



}


cargarPagina();


//agregando al carrito


async function agregarProducto(e) {
    //condicional
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = e.target.closest(".card");
    const tituloProducto = producto.querySelector(".card-title").textContent;

    console.log(tituloProducto);
//usando fetch
    const resp = await fetch('./BaseDeDatos/comics.json');
    const listaComics = await resp.json();

    for (let i = 0; i < listaComics.length; i++) {
        //condicional
        listaComics[i].titulo == tituloProducto && carrito.push(listaComics[i]);
    }

    const listaEnJsonCarrito = JSON.stringify(carrito);
    localStorage.setItem("carrito", listaEnJsonCarrito);
    //Le avisa al usuario que se agrego al carrito
    Toastify({
        text: "Agregado al carrito",
        duration: 3000,
        destination: "./secciones/carrito.html",
        newWindow: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "rgb(2,0,36)",
            background: "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(6,159,199,1) 0%, rgba(3,185,226,1) 0%, rgba(185,210,232,1) 0%, rgba(62,177,223,1) 100%, rgba(0,212,255,1) 100%)",
        },
        onClick: function () { } // Callback after click
    }).showToast();


}
