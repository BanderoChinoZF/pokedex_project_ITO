
const input = document.getElementById('pokemonInput');
const btn = document.getElementById('searchBtn');
const card = document.getElementById('pokemonCard');


btn.addEventListener('click', () => {

    const query = input.value.trim().toLowerCase();
    
    if (query === '') {
        card.innerHTML = '<p>Por favor, escribe un nombre o número.</p>';
        return; 
    }

    card.innerHTML = '<p>Buscando...</p>';

    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(data => {

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
