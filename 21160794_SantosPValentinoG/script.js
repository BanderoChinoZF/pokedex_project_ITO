// Elementos
const entrada = document.getElementById("entrada");
const btnBuscar = document.getElementById("btnBuscar");
const resultado = document.getElementById("resultado");

// Buscar
async function buscarPokemon() {
  const valor = entrada.value.toLowerCase();

  try {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/" + valor);
    const data = await respuesta.json();

    // Mostrar
    resultado.innerHTML =
      "<img src='" + data.sprites.front_default + "'>" +
      "<h2>" + data.name + "</h2>" +
      "<p>ID: " + data.id + "</p>" +
      "<p>Peso: " + data.weight + "</p>";
  } catch (error) {
    resultado.innerHTML = "<p>No encontrado</p>";
  }
}

// Evento
btnBuscar.addEventListener("click", buscarPokemon);