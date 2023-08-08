// Variables a utilizar
let pagina = 1;
let peliculas = "";
let ultimaPelicula;
let Carrito = [];

// Elementos/etiquetas del dom a utilizar en el proyecto
const carritoTemplate = document.querySelector("#template");
const templateFooter = document.querySelector("#templateFooter");
const carritoContenedor = document.querySelector("#carritoContenedor");
const contenedorFooter = document.querySelector("#footer");
const fragment = document.createDocumentFragment();
// Cards peliculas
const contenedorCards = document.getElementById("cards-dinamicas");
const cardsTemplate = document.getElementById("template-cards");

let observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        pagina++;
        cargarPeliculas();
      }
    });
  },
  {
    rootMargin: "0px 0px 200px 0px",
    threshold: 1.0,
  }
);

const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`
    );
    // Si la respuesta es correcta
    const datos = await respuesta.json();
    datos.results.forEach((item) => {
      const max = 1000;
      let precio = Math.floor(Math.random() * max);
      const clone = cardsTemplate.content.cloneNode(true);
      clone.querySelector(
        ".poster"
      ).src = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
      clone.querySelector(".titulo").textContent = item.title;
      clone.querySelector(".p").textContent = `Precio: $${precio}`;

      clone.querySelector(".btn-primary").dataset.precio = precio;
      clone.querySelector(".btn-primary").dataset.name = item.title;
      clone.querySelector(".btn-primary").dataset.id = item.id;
      fragment.appendChild(clone);
    });
    contenedorCards.appendChild(fragment);
    // Limite de paginas que quiero mostrar
    if (pagina < 1) {
      if (ultimaPelicula) {
        observador.unobserve(ultimaPelicula);
      }
      const peliculasEnPantalla = document.querySelectorAll(
        ".contenedor .pelicula"
      );
      ultimaPelicula = peliculasEnPantalla[peliculasEnPantalla.length - 1];
      observador.observe(ultimaPelicula);
    }
  } catch (error) {
    console.log(error);
  }
};
cargarPeliculas();

const agregarPeliculaCarrito =  (e) => {
  const pelicula = {
    id: e.target.dataset.id,
    name: e.target.dataset.name,
    cantidad: 1,
    precio: parseInt(e.target.dataset.precio),
  };

  const posicion = Carrito.findIndex((item) => item.id === pelicula.id);
  posicion === -1? Carrito.push(pelicula) :Carrito[posicion].cantidad++; 
  mostrarCarrito();
};

const mostrarCarrito = () => {
  carritoContenedor.textContent = "";
  Carrito.forEach((item) => {
    const clone = carritoTemplate.content.cloneNode(true);
    clone.querySelector(".list-group-item .badge").textContent = item.cantidad;
    clone.querySelector(".lead").textContent = item.name;
    clone.querySelector(".lead span").textContent = item.precio * item.cantidad;

    clone.querySelector(".btn-success").dataset.id = item.id
    clone.querySelector(".btn-danger").dataset.id = item.id
    fragment.appendChild(clone);
  });
  carritoContenedor.appendChild(fragment);
};

const quitarBtn = (e) =>{
  Carrito = Carrito.filter((item)=>{
    if(e.target.dataset.id === item.id){
        if(item.cantidad > 0){
            item.cantidad--
        }if(item.cantidad === 0)return 
        return item
    }else{
        return item
    }
})
mostrarCarrito()
} 

const agregarBtn = (e) =>{
  Carrito.map((item)=>{
    e.target.dataset.id === item.id ? item.cantidad++ : item
  })

  mostrarCarrito()
}
//Delegacion de Eventos
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-primary")) {
    agregarPeliculaCarrito(e);
  }

  if(e.target.matches(".btn-danger")){
    quitarBtn(e)
  }

  if(e.target.matches(".btn-success")){
    agregarBtn(e)
  }
});