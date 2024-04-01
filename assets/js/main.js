const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

let offset = 0;
const limit = 10;
const maxRecords = 151;

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit)
  .then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map((pokemon) => `
      <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name"><a href="details.html?id=${pokemon.number}">${pokemon.name}</a></span>
        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>
          <img src="${pokemon.photo}"
          alt="${pokemon.name}">
        </div>
      </li>
    `).join('')
  })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit

  const qtdRecordNextPage = offset + limit

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItems(offset, newLimit)
    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItems(offset, limit)
  }
})