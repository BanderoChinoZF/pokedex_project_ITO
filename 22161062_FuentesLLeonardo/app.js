// Elementos usados
const boton = document.getElementById('buscarBtn');
const input = document.getElementById('pokemonInput');
const resultado = document.getElementById('resultado');

// Evento al hacer clic en el botón 
boton.addEventListener('click', async () => {
    // Valor en minúsculas y sin espacios
    const busqueda = input.value.toLowerCase().trim();

    if (!busqueda) {
        resultado.innerHTML = '<p>Por favor ingresa un nombre o ID.</p>';
        return;
    }

    try {
        // Consumo directo del endpoint de PokeAPI
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda}`);
        // Si el Pokémon no existe (código 404)
        if (!respuesta.ok) {
            resultado.innerHTML = '<p>Pokémon no encontrado.</p>';
            return;
        }
        const data = await respuesta.json();
        // Inserción en el HTML
        resultado.innerHTML = `
            <h2>${data.name.toUpperCase()} (#${data.id})</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p><strong>Peso:</strong> ${data.weight}</p>
        `;
    } catch (error) {
        resultado.innerHTML = '<p>Error al conectar con la API.</p>';
    }
});
