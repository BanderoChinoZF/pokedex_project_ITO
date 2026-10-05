// URL base de la PokeAPI
const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

// Obtener referencias a los elementos del DOM
const pokemonInput = document.getElementById('pokemonInput');
const screenDisplay = document.getElementById('screenDisplay');
const pokemonInfoDisplay = document.getElementById('pokemonInfoDisplay');
const errorMessage = document.getElementById('errorMessage');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

// Variable para almacenar el ID actual del Pokémon
let currentPokemonId = null;

// Event Listener para buscar al presionar Enter en el input
pokemonInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarPokemon();
    }
});

// Event Listeners para los botones de navegación
prevButton.addEventListener('click', () => {
    if (currentPokemonId && currentPokemonId > 1) {
        buscarPokemonPorId(currentPokemonId - 1);
    }
});

nextButton.addEventListener('click', () => {
    if (currentPokemonId) {
        buscarPokemonPorId(currentPokemonId + 1);
    }
});

/**
 * Función principal para buscar un Pokémon
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
        screenDisplay.innerHTML = '<p class="loading-text">Buscando...</p>';
        pokemonInfoDisplay.textContent = '';

        // Realizar la petición a la API usando Fetch
        const response = await fetch(`${API_URL}${nombreOId}`);

        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }

        // Convertir la respuesta a JSON
        const pokemon = await response.json();

        // Mostrar la información del Pokémon
        mostrarPokemon(pokemon);

        // Limpiar el input después de una búsqueda exitosa
        pokemonInput.value = '';

    } catch (error) {
        // Manejar errores
        console.error('Error:', error);
        mostrarError('Pokémon no encontrado. Verifica el nombre o ID e intenta nuevamente.');
        screenDisplay.innerHTML = '<div class="welcome-screen"><p>Pokémon no encontrado</p></div>';
        pokemonInfoDisplay.textContent = '';
    }
}

/**
 * Función para buscar un Pokémon por ID (usado en navegación)
 */
async function buscarPokemonPorId(id) {
    try {
        // Mostrar indicador de carga
        screenDisplay.innerHTML = '<p class="loading-text">Cargando...</p>';
        pokemonInfoDisplay.textContent = '';

        // Realizar la petición a la API
        const response = await fetch(`${API_URL}${id}`);

        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }

        const pokemon = await response.json();
        mostrarPokemon(pokemon);

    } catch (error) {
        console.error('Error:', error);
        mostrarError('No se pudo cargar el Pokémon');
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
    const imagen = pokemon.sprites.front_default;

    // Actualizar el ID actual para la navegación
    currentPokemonId = id;

    // Crear el HTML para la pantalla (solo la imagen)
    const pokemonDisplay = `
        <div class="pokemon-display">
            <img src="${imagen}" alt="${nombre}" class="pokemon-sprite">
        </div>
    `;

    // Insertar la imagen en la pantalla
    screenDisplay.innerHTML = pokemonDisplay;

    // Mostrar el ID y nombre debajo de la pantalla
    pokemonInfoDisplay.textContent = `${id} - ${capitalizar(nombre)}`;

    // Actualizar estado de los botones de navegación
    actualizarBotonesNavegacion();
}

/**
 * Función para capitalizar la primera letra del nombre
 * @param {string} texto - Texto a capitalizar
 * @returns {string} - Texto capitalizado
 */
function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/**
 * Función para actualizar el estado de los botones de navegación
 */
function actualizarBotonesNavegacion() {
    // Deshabilitar botón "Anterior" si estamos en el Pokémon #1
    prevButton.disabled = currentPokemonId <= 1;

    // Siempre habilitar botón "Siguiente" (hay más de 1000 Pokémon)
    nextButton.disabled = false;
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
