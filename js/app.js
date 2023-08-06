let pagina = 1;
let peliculas = '';
let ultimaPelicula;
const carritoTemplate = document.querySelector('#template')
const templateFooter = document.querySelector('#templateFooter')
const carritoContenedor = document.querySelector('#contenedorPeliculas')
const contenedorFooter = document.querySelector('#footer')
const fragment = document.createDocumentFragment()

let observador = new IntersectionObserver((entradas) => {
	entradas.forEach(entrada => {
		if(entrada.isIntersecting){
			pagina++;
			cargarPeliculas();
		}
	});
}, {
	rootMargin: '0px 0px 200px 0px',
	threshold: 1.0
});

const cargarPeliculas = async() => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);
        
		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();

			datos.results.forEach(pelicula => {
				const max = 1000
				let precio = Math.floor(Math.random() * max)
				peliculas += `
					<div class="card pelicula mt-5">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
                        <p class="p">vote:${pelicula.vote_average}</p>
						<button class="btn btn-primary" data-precio="${precio}" data-pelicula="${pelicula.title}">
						Comprar</button>
					</div>
				`;
			});
			document.getElementById('contenedor').innerHTML = peliculas;
            // Limite de paginas que quiero mostrar
			if(pagina < 1){
				if(ultimaPelicula){
					observador.unobserve(ultimaPelicula);
				}
	
				const peliculasEnPantalla = document.querySelectorAll('.contenedor .pelicula');
				ultimaPelicula = peliculasEnPantalla[peliculasEnPantalla.length - 1];
				observador.observe(ultimaPelicula);
			}
		}
	} catch(error){
		console.log(error);
	}
}
cargarPeliculas();
// PAGINA DE CARRITO
document.addEventListener('click', (e)=>{
	if(e.target.matches('.btn-primary')){
		// Obtener la URL de la página que deseas redireccionar
		const paginaHTML = "carrito.html";
		// Redireccionar a la página especificada
		window.location.href = paginaHTML;
		agregarPeliculaCarrito(e)
	} 
})

const Carrito = []
const agregarPeliculaCarrito = (e) => {
	pelicula = {
		id : e.target.dataset.pelicula,
		name: e.target.dataset.pelicula,
		cantidad: 1,
		precio: parseInt(e.target.dataset.precio)
	} 
const posicion = Carrito.findIndex(( item )=>{
	item.id === peliculas.id
})
posicion === -1 ? Carrito.push(peliculas) : Carrito[posicion].cantidad++

mostrarCarrito()
}

const mostrarCarrito = () =>{
    carritoContenedor.textContent = ''
    Carrito.forEach((item) => {
        const clone = carritoTemplate.content.cloneNode(true)

        clone.querySelector('.list-group-item .badge').textContent = item.cantidad
        clone.querySelector('.lead').textContent = item.name
        clone.querySelector('.lead span').textContent = item.cantidad * item.precio

        clone.querySelector('.btn-success').dataset.id = item.id
        clone.querySelector('.btn-danger').dataset.id = item.id

        fragment.appendChild(clone)
    })  
    carritoContenedor.appendChild(fragment)
}