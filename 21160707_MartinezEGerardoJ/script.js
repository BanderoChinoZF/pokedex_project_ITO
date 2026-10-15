// Referencias a los elementos del HTML (DOM)
const inputPokemon = document.getElementById("inputPokemon");
const btnBuscar = document.getElementById("btnBuscar");
const mensajeError = document.getElementById("mensajeError");
const tarjeta = document.getElementById("tarjeta");
const imagenPokemon = document.getElementById("imagenPokemon");
const nombrePokemon = document.getElementById("nombrePokemon");
const idPokemon = document.getElementById("idPokemon");
const pesoPokemon = document.getElementById("pesoPokemon");

// Función principal: consume la API
async function buscarPokemon() {
  const valor = inputPokemon.value.trim().toLowerCase();

  mensajeError.classList.add("oculto");
  tarjeta.classList.add("oculto");

  if (valor === "") {
    mostrarError("Escribe el nombre o el ID de un Pokémon.");
    return;
  }


  const url = `https://pokeapi.co/api/v2/pokemon/${valor}`;

  try {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error("Pokémon no encontrado");
    }

    const datos = await respuesta.json();

    const nombre = datos.name;
    const id = datos.id;
    const peso = datos.weight;
    const imagen = datos.sprites.front_default;


    mostrarPokemon(nombre, id, peso, imagen);

  } catch (error) {
    mostrarError("No se encontró el Pokémon. Verifica el nombre o ID.");
  }
}

function mostrarPokemon(nombre, id, peso, imagen) {
  nombrePokemon.textContent = nombre;
  idPokemon.textContent = id;
  pesoPokemon.textContent = `${peso} hg (${peso / 10} kg)`;
  imagenPokemon.src = imagen;
  imagenPokemon.alt = `Imagen frontal de ${nombre}`;

  tarjeta.classList.remove("oculto");
}

function mostrarError(mensaje) {
  mensajeError.textContent = mensaje;
  mensajeError.classList.remove("oculto");
}

btnBuscar.addEventListener("click", buscarPokemon);

inputPokemon.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    buscarPokemon();
  }
});
