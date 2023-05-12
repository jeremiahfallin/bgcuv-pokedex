// URL of the PokeAPI
const apiURL = "https://pokeapi.co/api/v2/pokemon/";

// Select the Pokedex container
const pokedexContainer = document.getElementById("pokedex-container");

// Select the search form and input
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// Add a placeholder card when the page loads
const initialPlaceholderCard = createPlaceholderCard();
pokedexContainer.appendChild(initialPlaceholderCard);

// Event listener for the search form submission
searchForm.addEventListener("submit", function (event) {
  // Prevent the form from being submitted normally
  event.preventDefault();

  // Clear the Pokedex container
  pokedexContainer.innerHTML = "";

  // Create and add a placeholder card
  const placeholderCard = createPlaceholderCard();
  pokedexContainer.appendChild(placeholderCard);

  // Get the search term and fetch the Pokemon data
  const searchTerm = searchInput.value.toLowerCase();
  fetch(apiURL + searchTerm)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`No Pokemon found with the name "${searchTerm}".`);
      }
      return response.json();
    })
    .then((pokemon) => {
      // Replace the placeholder card with the actual Pokemon card
      const pokemonCard = createPokemonCard(pokemon);
      pokedexContainer.replaceChild(pokemonCard, placeholderCard);
    })
    .catch((error) => {
      console.error(error);
      // If an error occurs, remove the placeholder card
      pokedexContainer.removeChild(placeholderCard);
    });
});

// Function to create a placeholder card
function createPlaceholderCard() {
  const card = document.createElement("div");
  card.classList.add("pokemon-card", "placeholder-card");
  return card;
}

// Function to create a Pokemon card
function createPokemonCard(pokemon) {
  const card = document.createElement("div");
  card.classList.add("pokemon-card");

  const name = document.createElement("h2");
  name.textContent = pokemon.name;
  card.appendChild(name);

  const image = document.createElement("img");
  image.src = pokemon.sprites.front_default;
  card.appendChild(image);

  return card;
}
