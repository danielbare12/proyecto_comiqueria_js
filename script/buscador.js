const listaComics = JSON.parse(localStorage.getItem("listaDeProductos"));

let formulario = document.getElementById("formulario");
let busqueda = document.getElementById("buscador");


formulario.addEventListener("submit",buscar);

function buscar(e){
    e.preventDefault();
   
    const resultado = listaComics.filter((comic) => comic.titulo.toLowerCase().includes(busqueda.value.toLowerCase()));
    mostrarLista(resultado);
    resultado.splice(0,resultado.length);


}

function mostrarLista(listaComics){
    listaBuscada.innerHTML = "";
    for(const comic of listaComics){
        let articulo = document.createElement("div");
    
        articulo.classList.add("card");

        const {
            id: comicId,
            titulo: comicTitulo,
            precio: comicPrecio,
            autor: comicAutor,
            imagen: comicImagen
    
        } = comic;
    
        articulo.innerHTML = `
        <img src=".${comicImagen}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${comicTitulo}</h5>
          <p class="card-text">Precio: ${comicPrecio}</p>
          <p class="card-text">Autor: ${comicAutor}</p>
        </div>`;
    
        listaBuscada.append(articulo);
    }
}
