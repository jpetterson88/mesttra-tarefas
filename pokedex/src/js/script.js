const lista_pokemons = document.getElementById("pokemons");

const getPokemons = () => {
  const pokemon_api = fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  
  pokemon_api.then(response => {
    return response.json();
  }).then(data => {
    render(data.results);
  });
}

const render = (pokemons) => {
  pokemons.map((pokemon, index) => {
    lista_pokemons.insertAdjacentHTML("beforeend", 
    `<li class="pokemon-card">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${index + 1}.gif" />
      <h3>${pokemon.name}</h3>
    </li>`)
  });
}

getPokemons();