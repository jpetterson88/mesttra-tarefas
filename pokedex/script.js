const lista_pokemons = document.getElementById("pokemons");

const pokemon_api = fetch("https://pokeapi.co/api/v2/pokemon?limit=151");

pokemon_api.then(response => {
  return response.json();
}).then(pokemons => {
  pokemons.results.map((pokemon, index) => {
    lista_pokemons.insertAdjacentHTML("beforeend", `<li>
      <p>Nome: ${pokemon.name}</p>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png" />
    </li>`)
  });
});