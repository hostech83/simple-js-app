let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon && "detailsUrl" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.error("Invalid Pokémon object:", pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonContainer = document.querySelector(".pokemon-container");

    let card = document.createElement("div");
    card.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4');

    let cardInner = document.createElement("div");
    cardInner.classList.add('card');

    let cardImageFront = document.createElement("img");
    cardImageFront.classList.add('card-img-top');
    cardImageFront.alt = pokemon.name;

    let cardBody = document.createElement("div");
    cardBody.classList.add('card-body');

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add('card-title');
    cardTitle.innerText = pokemon.name;

    let button = document.createElement("button");
    button.innerText = "Details";
    button.classList.add('btn', 'btn-primary');
    button.setAttribute('type', 'button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');

    button.addEventListener('click', function () {
      showDetails(pokemon);
    });

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(button);
    cardInner.appendChild(cardImageFront);
    cardInner.appendChild(cardBody);
    card.appendChild(cardInner);
    pokemonContainer.appendChild(card);

    loadDetails(pokemon).then(function () {
      cardImageFront.src = pokemon.imageUrlFront;
    });
  }

  function loadList() {
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
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error("Failed to load Pokémon list:", e);
        hideLoadingMessage();
      });
  }

  function loadDetails(item) {
    showLoadingMessage();

    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.types = details.types.map((type) => type.type.name);
        item.abilities = details.abilities.map((ability) => ability.ability.name);
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error("Failed to load Pokémon details:", e);
        hideLoadingMessage();
      });
  }

  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item.name, `Height: ${item.height}`, `Types: ${item.types.join(', ')}`, `Abilities: ${item.abilities.join(', ')}`, item.imageUrlFront, item.imageUrlBack);
    });
  }

  function showModal(title, height, types, abilities, imageUrlFront, imageUrlBack) {
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');

    modalTitle.textContent = title;

    modalBody.innerHTML = `
      <p>${height}</p>
      <p>${types}</p>
      <p>${abilities}</p>
      <div class="row">
        <div class="col-6">
          <img src="${imageUrlFront}" class="img-fluid" alt="${title} front">
        </div>
        <div class="col-6">
          <img src="${imageUrlBack}" class="img-fluid" alt="${title} back">
        </div>
      </div>
    
      `;
    $('#pokemonModal').modal('show');
  }

  function showLoadingMessage() {
    document.querySelector(".loading-message").innerText = "Loading...";
  }

  function hideLoadingMessage() {
    document.querySelector(".loading-message").innerText = "";
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

document.addEventListener("DOMContentLoaded", function () {
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
});
