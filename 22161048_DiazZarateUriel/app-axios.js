// VERSIÓN ALTERNATIVA USANDO AXIOS
// Para usar este archivo, reemplaza la referencia en index.html:
// <script src="app-axios.js"></script>
// Y agrega antes de este script: <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

// URL base de la PokeAPI
const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

// Obtener referencias a los elementos del DOM
const pokemonInput = document.getElementById('pokemonInput');
const searchButton = document.getElementById('searchButton');
const resultContainer = document.getElementById('resultContainer');
const errorMessage = document.getElementById('errorMessage');

// Event Listener para el botón de búsqueda
searchButton.addEventListener('click', buscarPokemon);

// Event Listener para buscar al presionar Enter en el input
pokemonInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarPokemon();
    }
});

/**
 * Función principal para buscar un Pokémon usando Axios
 */
async function buscarPokemon() {
    // Obtener el valor del input y limpiarlo
    const nombreOId = pokemonInput.value.trim().toLowerCase();

    // Validar que no esté vacío
    if (!nombreOId) {
        mostrarError('Por favor ingresa un nombre o ID de Pokémon');
        return;
    }

    // Limpiar mensajes de error previos
    ocultarError();

    try {
        // Mostrar indicador de carga
        resultContainer.innerHTML = '<p class="loading">Buscando...</p>';
        resultContainer.style.display = 'block';

        // Realizar la petición a la API usando Axios
        // Axios automáticamente convierte la respuesta a JSON
        const response = await axios.get(`${API_URL}${nombreOId}`);

        // Los datos están en response.data
        const pokemon = response.data;

        // Mostrar la información del Pokémon
        mostrarPokemon(pokemon);

    } catch (error) {
        // Axios tiene una estructura de error diferente
        console.error('Error:', error);

        if (error.response && error.response.status === 404) {
            mostrarError('Pokémon no encontrado. Verifica el nombre o ID e intenta nuevamente.');
        } else {
            mostrarError('Error al conectar con la API. Intenta nuevamente.');
        }

        resultContainer.style.display = 'none';
    }
}

/**
 * Función para mostrar la información del Pokémon en el DOM
 * @param {Object} pokemon - Objeto con los datos del Pokémon
 */
function mostrarPokemon(pokemon) {
    // Extraer los datos necesarios del objeto pokemon
    const nombre = pokemon.name;
    const id = pokemon.id;
    const peso = pokemon.weight;
    const altura = pokemon.height;
    const imagen = pokemon.sprites.front_default;

    // Crear el HTML de la tarjeta del Pokémon
    const pokemonCard = `
        <div class="pokemon-card">
            <h2 class="pokemon-name">${nombre}</h2>
            <p class="pokemon-id">#${id.toString().padStart(3, '0')}</p>
            <img src="${imagen}" alt="${nombre}">

            <div class="pokemon-info">
                <div class="info-item">
                    <span class="info-label">Peso</span>
                    <span class="info-value">${peso / 10} kg</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Altura</span>
                    <span class="info-value">${altura / 10} m</span>
                </div>
            </div>
        </div>
    `;

    // Insertar el HTML en el contenedor de resultados
    resultContainer.innerHTML = pokemonCard;
    resultContainer.style.display = 'block';
}

/**
 * Función para mostrar mensajes de error
 * @param {string} mensaje - Mensaje de error a mostrar
 */
function mostrarError(mensaje) {
    errorMessage.textContent = mensaje;
    errorMessage.classList.add('show');
}

/**
 * Función para ocultar mensajes de error
 */
function ocultarError() {
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
}

/*
DIFERENCIAS PRINCIPALES ENTRE FETCH Y AXIOS:

1. SINTAXIS:
   - Fetch: const response = await fetch(url); const data = await response.json();
   - Axios: const response = await axios.get(url); const data = response.data;

2. CONVERSIÓN DE JSON:
   - Fetch: Requiere llamar .json() manualmente
   - Axios: Convierte automáticamente a JSON

3. MANEJO DE ERRORES:
   - Fetch: Solo rechaza en errores de red, no en códigos HTTP 4xx/5xx
   - Axios: Rechaza en cualquier código de estado fuera del rango 2xx

4. COMPATIBILIDAD:
   - Fetch: Nativo en navegadores modernos
   - Axios: Requiere instalación/importación

5. CONFIGURACIÓN:
   - Fetch: Más verboso para configuraciones avanzadas
   - Axios: Más fácil de configurar (interceptores, timeout, etc.)
*/
