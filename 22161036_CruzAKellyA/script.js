const input = document.getElementById("pokemonInput");
const boton = document.getElementById("btnBuscar");
const resultado = document.getElementById("resultado");

boton.addEventListener("click", buscarPokemon);

function buscarPokemon() {

    const pokemon = input.value.toLowerCase().trim();

    if (pokemon === "") {
        resultado.innerHTML = "<p>Ingresa un nombre o ID.</p>";
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => {

            if (!response.ok) {
                throw new Error("Pokémon no encontrado");
            }

            return response.json();
        })

        .then(data => {

            resultado.innerHTML = `
                <div class="tarjeta">

                    <img
                        src="${data.sprites.front_default}"
                        alt="${data.name}"
                    >

                    <h2>${data.name}</h2>

                    <p>ID: ${data.id}</p>

                    <p>Peso: ${data.weight}</p>

                </div>
            `;

        })

        .catch(error => {

            resultado.innerHTML = `
                <p>No se encontró el Pokémon.</p>
            `;

            console.error(error);
        });
}