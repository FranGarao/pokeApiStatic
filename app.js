const pokeList = document.querySelector("#poke-list");
const searchName = document.querySelector("#search");
const searchType = document.querySelector("#searchType");
const fetchPokemons = async () => {
  const apiEndpoint = "https://pokeapi.co/api/v2/pokemon/";
  // const how = prompt("Cuantos pokemons queres ver?");
  for (let index = 1; index <= 150; index++) {
    try {
      const response = await fetch(apiEndpoint + index);
      const pokemonsData = await response.json();
      const pokemon = {
        name: pokemonsData.name,
        image: pokemonsData.sprites.front_default,
        type: pokemonsData.types
          .map((currentType) => currentType.type.name)
          .join(", "),
        id: pokemonsData.id,
      };
      const pokemonLi = document.createElement("li");
      pokemonLi.classList.add("card");
      pokemonLi.style = "padding: 10px; margin: 2%; list-style-type: none;";
      pokemonLi.id = `pokemon-${pokemon.id}`;

      const pokemonName = document.createElement("h2");
      pokemonName.innerText =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      // pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
      pokemonLi.appendChild(pokemonName);
      //

      const pokemonImg = document.createElement("img");
      pokemonImg.src = pokemon.image;
      pokemonLi.appendChild(pokemonImg);

      const pokemonType = document.createElement("p");
      pokemonType.innerText = pokemon.type.toUpperCase();
      pokemonLi.appendChild(pokemonType);

      pokeList.appendChild(pokemonLi);
    } catch (error) {
      console.log(error);
    }
  }
};
searchName.addEventListener("input", (e) => {
  searchPokemon(e.target.value);
});
searchType.addEventListener("input", (e) => {
  searchPokemonByType(e.target.value);
});
const searchPokemonByType = (type) => {
  const pokemonList = Array.from(document.querySelectorAll(".card p"));
  pokemonList.forEach((pokemonType) => {
    if (!pokemonType.innerText.toLowerCase().includes(type)) {
      pokemonType.parentElement.style.display = "none";
    } else {
      pokemonType.parentElement.style.display = "list-item";
    }
  });
};

const searchPokemon = (name) => {
  const pokemonNodeList = document.querySelectorAll(".card h2");
  const pokemonList = Array.from(pokemonNodeList);

  const filteredListName = pokemonList.forEach((pokemonName) => {
    if (!pokemonName.innerText.toLowerCase().includes(name.toLowerCase())) {
      pokemonName.parentElement.style.display = "none";
    } else {
      pokemonName.parentElement.style.display = "list-item";
    }
  });
};

fetchPokemons();
