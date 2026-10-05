// 1. Tomamos los elementos del HTML por su id
const entrada = document.getElementById("entrada");
const btnBuscar = document.getElementById("btnBuscar");
const resultado = document.getElementById("resultado");

// 2. Función que consulta la API
async function buscarPokemon() {
  // La API solo acepta minúsculas y sin espacios
  const valor = entrada.value.trim().toLowerCase();

  if (valor === "") {
    resultado.innerHTML = `<p class="error">Escribe un nombre o un número.</p>`;
    return;
  }

  resultado.innerHTML = `<p>Buscando...</p>`;

  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${valor}`);

    // Si el Pokémon no existe, la API responde 404
    if (!respuesta.ok) {
      throw new Error("No se encontró ese Pokémon");
    }

    const datos = await respuesta.json(); // convertimos la respuesta a objeto JS

    // 3. Navegamos el objeto para sacar lo que pide el reto
    const nombre = datos.name;
    const id = datos.id;
    const peso = datos.weight / 10; // la API da el peso en hectogramos
    const imagen = datos.sprites.front_default;

    // 4. Insertamos la tarjeta en el DOM
    resultado.innerHTML = `
      <div class="tarjeta">
        <img src="${imagen}" alt="${nombre}">
        <h2>${nombre}</h2>
        <p><strong>ID:</strong> #${id}</p>
        <p><strong>Peso:</strong> ${peso} kg</p>
      </div>
    `;
  } catch (error) {
    resultado.innerHTML = `<p class="error">${error.message}</p>`;
  }
}

// 5. Ejecutamos la búsqueda al hacer clic en el botón
btnBuscar.addEventListener("click", buscarPokemon);

// y también al presionar Enter en el recuadro
entrada.addEventListener("keydown", (e) => {
  if (e.key === "Enter") buscarPokemon();
});