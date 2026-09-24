const inputPokemon = document.getElementById('pokemonInput');
const botonBuscar = document.getElementById('searchButton');
const contenedor = document.getElementById('pokebola');

botonBuscar.addEventListener('click', () => {
    
    const pokemon = inputPokemon.value.toLowerCase();
    
    console.log("Buscando a: ", pokemon);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(respuesta => respuesta.json())
        .then(datos => {
            contenedor.innerHTML = `
                <h2>${datos.name}</h2>
                <p><strong>ID:</strong> ${datos.id}</p>
                <p><strong>Peso:</strong> ${datos.weight / 10} kg</p>
                <img src="${datos.sprites.front_default}" alt="Imagen de ${datos.name}">
            `;
        })
        .catch(error => {
            console.log("Error. Quizá el Pokémon no existe:", error);
            contenedor.innerHTML = `<p>Pokémon no encontrado. Intenta de nuevo.</p>`;
        });
});