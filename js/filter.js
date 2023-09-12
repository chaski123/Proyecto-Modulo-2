function ordenarPeliculas() {
  const ordenSeleccionado = document.getElementById('orden').value;
  const contenedorPeliculas = document.getElementById('cards-dinamicas');
  const tarjetasPeliculas = Array.from(contenedorPeliculas.getElementsByClassName('pelicula'));

  tarjetasPeliculas.sort((a, b) => {
    const tituloA = a.querySelector('.titulo').textContent.toUpperCase();
    const tituloB = b.querySelector('.titulo').textContent.toUpperCase();

    if (ordenSeleccionado === 'ascendente') {
      return tituloA.localeCompare(tituloB);
    } else {
      return tituloB.localeCompare(tituloA);
    }
  });

  // Limpiar el contenedor
  contenedorPeliculas.innerHTML = '';

  // Agregar las tarjetas ordenadas nuevamente
  tarjetasPeliculas.forEach((tarjeta) => {
    contenedorPeliculas.appendChild(tarjeta);
  });
}
