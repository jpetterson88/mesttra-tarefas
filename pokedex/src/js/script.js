const lista_pokemons = document.getElementById("pokemons");

const getPokemons = async (name= "") => {
  if (name !== "") {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    renderOne(data);
  } else {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await response.json();
    renderAll(data.results);
  }
}

const renderOne = (pokemon) => {
  lista_pokemons.innerHTML = "";
  lista_pokemons.insertAdjacentHTML("beforeend", 
  `<li class="pokemon-card">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif" />
    <h3>${pokemon.name}</h3>
    <h4>Peso: ${pokemon.weight}</h4>
    <p>Tipo:${pokemon.types.map(item => " " + item.type.name)}</p>
  </li>`);
}

const renderAll = (pokemons) => {
  lista_pokemons.innerHTML = "";
  pokemons.map((pokemon, index) => {
    lista_pokemons.insertAdjacentHTML("beforeend", 
    `<li class="pokemon-card">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${index + 1}.gif" />
      <h3>${pokemon.name}</h3>
    </li>`)
  });
}

const searchPokemon = (event) => {
  // previne o comportamento padrao do evento submit (atualizar a pagina)
  event.preventDefault();
  const text = document.getElementById("buscarInput").value;
  getPokemons(text);
}

getPokemons();