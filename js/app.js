let pagina = 1;
let peliculas = "";
let ultimaPelicula;
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
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
	  console.log(datos.results)
      datos.results.forEach((item) => {
        const max = 1000;
        let precio = Math.floor(Math.random() * max);
        const clone = cardsTemplate.content.cloneNode(true);
        clone.querySelector(
          ".poster"
        ).src = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
        clone.querySelector(".titulo").textContent = item.title;
        clone.querySelector(".p").textContent = `Precio: $${precio}`;
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
    }
  } catch (error) {
    console.log(error);
  }
};
cargarPeliculas();


// PAGINA DE CARRITO
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-primary")) {
    agregarPeliculaCarrito(e);
  }
});

const Carrito = [];
const agregarPeliculaCarrito = async (e) => {
	const respuesta = await fetch(
		`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`)
		const datos = await respuesta.json();
	datos.results.forEach((peliculas)=>{
	pelicula = {
		id: peliculas.id,
		name: peliculas.title,
		cantidad: 1,
		precio: parseInt(e.target.dataset.precio),
	  };
})
  
  const posicion = Carrito.findIndex((item) => {
    item.id === pelicula.id;
  });
  posicion === -1 ? Carrito.push(pelicula) : Carrito[posicion].cantidad++;

  mostrarCarrito();
};

const mostrarCarrito = () => {
	carritoContenedor.textContent = "";
	Carrito.forEach((item) => {
		const clone = carritoTemplate.content.cloneNode(true);
		clone.querySelector(".list-group-item .badge").textContent = item.cantidad;
		clone.querySelector(".lead").textContent = item.name;
		clone.querySelector(".lead span").textContent = item.precio;
	
		fragment.appendChild(clone);
		});
  carritoContenedor.appendChild(fragment);
};
