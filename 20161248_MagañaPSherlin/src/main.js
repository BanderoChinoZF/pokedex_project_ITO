import './style.css';
console.log("¡MAIN.JS ESTÁ FUNCIONANDO!");

const input = document.getElementById("pokemonInput");
const boton = document.getElementById("buscarBtn");
const resultado = document.getElementById("resultado");

async function buscarPokemon() {

    const pokemon = input.value.trim().toLowerCase();

    if (pokemon === "") {
        resultado.innerHTML = `
            <p class="error">
                Escribe el nombre o número de un Pokémon.
            </p>
        `;
        return;
    }

    resultado.innerHTML = `
        <p>Buscando Pokémon...</p>
    `;

    try {

        const respuesta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );

        if (!respuesta.ok) {
            throw new Error("Pokémon no encontrado");
        }

        const datos = await respuesta.json();

        console.log(datos);

        const nombre = datos.name;
        const id = datos.id;
        const peso = datos.weight;
        const imagen = datos.sprites.front_default;

        resultado.innerHTML = `
            <div class="tarjeta">

                <img
                    src="${imagen}"
                    alt="Imagen de ${nombre}"
                >

                <h2>${nombre}</h2>

                <p class="dato">
                    <strong>ID:</strong> ${id}
                </p>

                <p class="dato">
                    <strong>Peso:</strong> ${peso}
                </p>

            </div>
        `;

    } catch (error) {

        console.error(error);

        resultado.innerHTML = `
            <p class="error">
                No se encontró el Pokémon.
            </p>
        `;
    }
}

boton.addEventListener("click", buscarPokemon);

input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        buscarPokemon();
    }

});