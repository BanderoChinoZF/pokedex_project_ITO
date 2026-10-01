// Atrapamos los elementos del HTML
const input = document.getElementById('pokemonInput');
const btn = document.getElementById('searchBtn');
const card = document.getElementById('pokemonCard');

// Cuando hagan clic en el botón de buscar
btn.addEventListener('click', () => {
    // Tomamos lo que el usuario escribió
    const query = input.value.trim().toLowerCase();
    
    if (query === '') {
        card.innerHTML = '<p>Por favor, escribe un nombre o número.</p>';
        return; 
    }

    // Mensaje de carga
    card.innerHTML = '<p>Buscando...</p>';

    // Consumimos la PokeAPI
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(data => {
            // Insertamos la información y la imagen en el DOM (el HTML)
            card.innerHTML = `
                <h2>${data.name.toUpperCase()}</h2>
                <p><strong>ID:</strong> #${data.id}</p>
                <p><strong>Peso:</strong> ${data.weight}</p>
                <img src="${data.sprites.front_default}" alt="${data.name}">
            `;
        })
        .catch(error => {
            card.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        });
});