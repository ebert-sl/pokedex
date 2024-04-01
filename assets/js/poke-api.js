const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()

  pokemon.number = pokeDetail.id

  pokemon.name = pokeDetail.name

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types
  pokemon.types = types
  pokemon.type = type

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  pokemon.cry = pokeDetail.cries.latest

  pokemon.height = pokeDetail.height / 10
  
  pokemon.weight = pokeDetail.weight / 10

  const abilities = pokeDetail.abilities
  .filter((abilitySlot) => abilitySlot.is_hidden == false)
  .map((abilitySlot) => abilitySlot.ability.name)
  pokemon.abilities = abilities

  const stats = pokeDetail.stats.map((statSlot) => statSlot.base_stat)
  pokemon.stats = stats

  return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
} 

pokeApi.getPokemons = (offset, limit) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.error(error))
}

pokeApi.getPokemon = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  return fetch(url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
    .catch((error) => console.error(error))
}