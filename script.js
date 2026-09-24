const form = document.querySelector('#search-form');
const input = document.querySelector('#pokemon-input');
const button = document.querySelector('#search-button');
const status = document.querySelector('#status');
const card = document.querySelector('#pokemon-card');
const image = document.querySelector('#pokemon-image');
const placeholder = document.querySelector('#screen-placeholder');
const name = document.querySelector('#pokemon-name');
const id = document.querySelector('#pokemon-id');
const types = document.querySelector('#pokemon-types');
const weight = document.querySelector('#pokemon-weight');
const height = document.querySelector('#pokemon-height');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchTerm = input.value.trim().toLowerCase();

  if (!searchTerm) return;

  button.disabled = true;
  card.classList.add('hidden');
  image.classList.add('hidden');
  placeholder.classList.remove('hidden');
  status.className = 'status';
  status.textContent = 'Conectando con la PokéAPI...';

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(searchTerm)}`);

    if (!response.ok) {
      throw new Error('No se encontró ese registro en la Pokédex.');
    }

    const pokemon = await response.json();
    name.textContent = pokemon.name;
    id.textContent = `NO. ${String(pokemon.id).padStart(3, '0')}`;
    weight.textContent = `${pokemon.weight / 10} kg`;
    height.textContent = `${pokemon.height / 10} m`;
    image.src = pokemon.sprites.front_default;
    image.alt = `Imagen frontal de ${pokemon.name}`;
    types.innerHTML = pokemon.types.map(({ type }) => `<span class="type-badge">${type.name}</span>`).join('');
    placeholder.classList.add('hidden');
    image.classList.remove('hidden');
    card.classList.remove('hidden');
    status.textContent = 'Registro encontrado. Datos sincronizados.';
  } catch (error) {
    status.className = 'status error';
    status.textContent = error.message || 'No fue posible conectar con la PokéAPI.';
  } finally {
    button.disabled = false;
  }
});