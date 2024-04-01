let params = new URLSearchParams(window.location.search);
let pokemonId = params.get('id');

const pokemonSection = document.getElementById('details')

function loadPokemonDetails(id) {
  pokeApi.getPokemon(id)
    .then((pokemon) => {
      const capitalizedPokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      document.title = capitalizedPokemonName;
      pokemonSection.innerHTML = `
        <div id="header">
          <h1 id="name">${pokemon.name}</h1>
          <a id="backButton" href="index.html">Go Back</a>
        </div>
        <div id="flexContainer">
          <div id="imageContainer">
            <img src="${pokemon.photo}" alt="${pokemon.name}">
          </div>
          <div id="pokemonDetails">
            <h2>Cry:</h2>
            <audio controls>
              <source src="${pokemon.cry}" type="audio/ogg">
              Your browser does not support the audio element.
            </audio>
            <h2 id="type">Type: ${pokemon.types.join(" / ")}</h2>
            <h2 id="height">Height: ${pokemon.height} m</h2>
            <h2 id="weight">Weight: ${pokemon.weight} kg</h2>
            <h2 id="abilities">Abilities: ${pokemon.abilities.join(" / ")}</h2>
            <h3 id="stats">Base Stats:</h3>
            <ul id="statsList">
              <li>HP: ${pokemon.stats[0]}</li>
              <li>Attack: ${pokemon.stats[1]}</li>
              <li>Defense: ${pokemon.stats[2]}</li>
              <li>Special Attack: ${pokemon.stats[3]}</li>
              <li>Special Defense: ${pokemon.stats[4]}</li>
              <li>Speed: ${pokemon.stats[5]}</li>
            </ul>
          </div>
        </div>
      `
    })
}

loadPokemonDetails(pokemonId)
