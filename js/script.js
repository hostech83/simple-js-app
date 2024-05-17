


let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Function to add a Pokémon to the list
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
  
  // Function to get all Pokémon in the list
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
        item.types = details.types.map((type) => type.type.name);
        item.abilities = details.abilities.map((ability) => ability.ability.name);
        // Hide loading message after details are loaded
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
        // Hide loading message in case of error
        hideLoadingMessage();
      });
  }

  // Function to show details of a Pokémon in a modal
  function showDetails(item) {
    loadDetails(item).then(function () {
      let modalContainer = document.querySelector('.modal-container');
      let modalName = document.querySelector('#modal-name');
      let modalHeight = document.querySelector('#modal-height');
      let modalTypes = document.querySelector('#modal-types');
      let modalAbilities = document.querySelector('#modal-abilities');
      let modalImage = document.querySelector('#modal-image');

      modalName.textContent = item.name;
      modalHeight.textContent = `Height: ${item.height}`;
      modalTypes.textContent =`Types: ${item.types}`;
      modalAbilities.textContent =`Abilities: ${item.abilities}`;
      modalImage.src = item.imageUrl;

      modalContainer.style.display = 'block';
    });
  }

  // Close modal when clicking the close button
  document.querySelector('.close-button').addEventListener('click', function() {
    hideModal();
  });
  
  // Close modal when pressing Escape key
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      hideModal();
    }
  });

  // Close modal when clicking outside the modal content
  window.addEventListener('click', function(event) {
    let modalContainer = document.querySelector('.modal-container');
    if (event.target === modalContainer) {
      hideModal();
    }
  });

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

  // Function to hide the modal
  function hideModal() {
    let modalContainer = document.querySelector('.modal-container');
    modalContainer.style.display = 'none';
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
