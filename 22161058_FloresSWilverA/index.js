const input = document.getElementById("pokemonInput");
const boton = document.getElementById("btnBuscar");
const resultado = document.getElementById("resultado");

boton.addEventListener("click", async () => {
    const pokemon = input.value.toLowerCase().trim();

    try {
        const peticionGet = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );
        console.log(peticionGet);

        if (!peticionGet.ok) throw new Error();

        const datosPokemon = await peticionGet.json();
        console.log("-----");
        console.log(datosPokemon);
        
        resultado.innerHTML = `
            <h2>${datosPokemon.name}</h2>    
            <img src="${datosPokemon.sprites.other.dream_world.front_default}" alt="imagen del pokemon">
            <p>N.º ${datosPokemon.id}</p>
            <p>Altura: ${datosPokemon.height}</p>
            <p>Peso: ${datosPokemon.weight}</p>
        `;
    } catch {
        resultado.innerHTML = "<p>Pokémon no encontrado</p>";
    }
});