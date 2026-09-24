# Pokédex - Subtarea 1: Consumo Directo de API

Este proyecto implementa un buscador de Pokémon utilizando la [PokeAPI](https://pokeapi.co/).

## Características

- **Búsqueda por nombre o ID**: Ingresa el nombre (ej: "pikachu") o el número (ej: "25") del Pokémon
- **Información mostrada**:
  - Nombre del Pokémon
  - ID numérico
  - Peso en kg
  - Altura en metros
  - Imagen frontal (sprite)

## Cómo usar

1. Abre el archivo `index.html` en tu navegador web
2. Ingresa el nombre o ID de un Pokémon en el campo de búsqueda
3. Presiona el botón "Buscar" o la tecla Enter
4. ¡Observa la información del Pokémon!

## Estructura del proyecto

```
Pokedex/
├── index.html      # Estructura HTML
├── styles.css      # Estilos CSS
├── app.js          # Lógica JavaScript con Fetch
└── README.md       # Este archivo
```

## Conceptos técnicos aplicados

### 1. Consumo de API con Fetch

```javascript
const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombreOId}`);
const pokemon = await response.json();
```

La API Fetch es nativa de JavaScript y permite hacer peticiones HTTP de forma asíncrona.

### 2. Manipulación del DOM

Se utilizan diferentes métodos para insertar contenido dinámicamente:

```javascript
// Obtener referencias a elementos
const elemento = document.getElementById('id');

// Insertar HTML
elemento.innerHTML = '<div>Contenido</div>';

// Mostrar/Ocultar elementos
elemento.style.display = 'block';
```

### 3. Navegación del objeto JSON

El endpoint retorna un objeto complejo. Accedemos a los datos así:

```javascript
const nombre = pokemon.name;
const id = pokemon.id;
const peso = pokemon.weight;
const imagen = pokemon.sprites.front_default;  // Navegación anidada
```

### 4. Async/Await

Usamos `async/await` para manejar promesas de forma más legible:

```javascript
async function buscarPokemon() {
    const response = await fetch(url);
    const data = await response.json();
}
```

## Ejemplos de búsqueda

Prueba con:
- `pikachu`
- `25`
- `charizard`
- `150` (Mewtwo)
- `ditto`

## Posibles mejoras

- Agregar tipos de Pokémon
- Mostrar estadísticas (HP, Attack, Defense, etc.)
- Mostrar habilidades
- Agregar más sprites (back, shiny, etc.)
- Implementar caché local
- Agregar sonidos

## Endpoint utilizado

```
GET https://pokeapi.co/api/v2/pokemon/{nombre_o_id}
```

## Versión alternativa con Axios

Si deseas usar Axios en lugar de Fetch, necesitarías:

1. Incluir Axios en el HTML:
```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

2. Cambiar la petición en app.js:
```javascript
const { data: pokemon } = await axios.get(`${API_URL}${nombreOId}`);
```

## Notas

- Los pesos están en hectogramos (se dividen por 10 para obtener kg)
- Las alturas están en decímetros (se dividen por 10 para obtener metros)
- Los nombres se convierten a minúsculas automáticamente
- La API es pública y no requiere autenticación
