// 1. Conectamos JavaScript con los elementos del HTML usando su ID
const input = document.getElementById("pokemonInput");
const boton = document.getElementById("btnBuscar");
const resultado = document.getElementById("resultado");

// 2. El botón "escucha" el evento click y ejecuta buscarPokemon()
boton.addEventListener("click", buscarPokemon);

function buscarPokemon() {
    // 3. Obtenemos lo que escribió el usuario, en minúsculas y sin espacios extra
    const pokemon = input.value.toLowerCase().trim();

    // 4. Si el recuadro está vacío, avisamos y detenemos la función
    if (pokemon === "") {
        resultado.innerHTML = `<p>Ingresa el nombre o ID de un Pokémon.</p>`;
        return;
    }

    // 5. Consumimos la PokeAPI con el método GET (fetch usa GET por defecto)
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => {
            // response.ok verifica si la petición fue exitosa (código 200)
            if (!response.ok) {
                throw new Error("Pokémon no encontrado");
            }
            // Convertimos la respuesta a un objeto JSON utilizable
            return response.json();
        })
        .then(data => {
            // 6. Navegamos el objeto "data" para extraer nombre, id, peso e imagen
            //    La imagen está anidada: data.sprites.front_default
            resultado.innerHTML = `
                <div class="tarjeta">
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <h2>${data.name}</h2>
                    <p><strong>ID:</strong> ${data.id}</p>
                    <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
                </div>
            `;
        })
        .catch(error => {
            // 7. Si el Pokémon no existe o falla la conexión, mostramos un mensaje
            resultado.innerHTML = `<p>Pokémon no encontrado.</p>`;
            console.error(error);
        });
}