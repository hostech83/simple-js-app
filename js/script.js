let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Function to add a Pokémons to the list
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  
  // Function to get all Pokémons in the list
  function getAll() {
    return pokemonList;
  }
  
  // Function to add a list item Pokémon
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  // Function to load the list of Pokémon from the API
  function loadList() {
    // Show loading message
    showLoadingMessage();

    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
        // Hide loading message after data is loaded
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
        // Hide loading message in case of error
        hideLoadingMessage();
      });
  }

  // Function to load details of a Pokémon
  function loadDetails(item) {
    // Show loading message
    showLoadingMessage();

    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        // Hide loading message after details are loaded
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
        // Hide loading message in case of error
        hideLoadingMessage();
      });
  }

  // Function to show details of a Pokémon
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  // Function to show the loading message
  function showLoadingMessage() {

    // Display loading message on the page
    document.querySelector(".loading-message").innerText = "Loading...";
  }

  // Function to hide the loading message
  function hideLoadingMessage() {

    // Hide loading message from the page
    document.querySelector(".loading-message").innerText = "";
  }

  // Return functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

// Load the list of Pokémon
pokemonRepository.loadList().then(function () {
  // Add list items for each Pokémon
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
