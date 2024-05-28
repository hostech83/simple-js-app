let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
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
    card.classList.add("col-sm-6", "col-md-4", "col-lg-3", "mb-4");

    let cardInner = document.createElement("div");
    cardInner.classList.add("card");

    let cardImageFront = document.createElement("img");
    cardImageFront.classList.add("card-img-top");
    cardImageFront.alt = pokemon.name;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = pokemon.name;

    let button = document.createElement("button");
    button.innerText = "Details";
    button.classList.add("btn", "btn-primary");
    button.setAttribute("type", "button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");

    button.addEventListener("click", function () {
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
            detailsUrl: item.url,
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
        item.imageUrlFront =
          details.sprites.other["official-artwork"].front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types.map((type) => type.type.name);
        item.abilities = details.abilities.map(
          (ability) => ability.ability.name
        );
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error("Failed to load Pokémon details:", e);
        hideLoadingMessage();
      });
  }

  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(
        item.name,
        item.height,
        item.weight,
        item.types,
        item.abilities,
        item.imageUrlFront,
        item.types[0]
      );
    });
  }

  function typeColor(type) {
    const colors = {
      grass: "#78C850",
      fire: "#F08030",
      water: "#6890F0",
      bug: "#A8B820",
      normal: "#A8A878",
      poison: "#A040A0",
      electric: "#F8D030",
      ground: "#E0C068",
      fairy: "#EE99AC",
      fighting: "#C03028",
      psychic: "#F85888",
      rock: "#B8A038",
      ghost: "#705898",
      ice: "#98D8D8",
      dragon: "#7038F8",
      dark: "#705848",
      steel: "#B8B8D0",
      flying: "#A890F0",
    };
    return colors[type] || "#A8A878";
  }

  function showModal(
    title,
    height,
    weight,
    types,
    abilities,
    imageUrlFront,
    primaryType
  ) {
    let modalTitle = document.querySelector(".modal-title");
    let modalBody = document.querySelector(".modal-body");

    modalTitle.textContent = title;

    let typesText = types.join(", ");

    modalBody.innerHTML = `
      <div class="modal-content-top"  style="background-color:${typeColor(
        primaryType
      )};">
        <img src="${imageUrlFront}" class="img-fluid" alt="${title} front">
      </div>
      <div class="modal-content-bottom">
        <p>Height: ${height}</p>
        <p>Weight: ${weight}</p>
        <p>Types: ${typesText}</p>
        <p>Abilities: ${abilities.join(", ")}</p>
      </div>
    `;

    modalBody.classList.add("pokemon-modal-body");

    $("#pokemonModal").modal("show");
  }

  function showLoadingMessage() {
    document.querySelector(".loading-message").innerText = "Loading...";
  }

  function hideLoadingMessage() {
    document.querySelector(".loading-message").innerText = "";
  }

  function filterPokemons(searchTerm) {
    let filteredPokemons = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    let pokemonContainer = document.querySelector(".pokemon-container");
    pokemonContainer.innerHTML = "";
    filteredPokemons.forEach((pokemon) => addListItem(pokemon));
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    filterPokemons: filterPokemons,
  };
})();

document.addEventListener("DOMContentLoaded", function () {
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });

  document
    .querySelector("#search-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      let searchTerm = document.querySelector("#search-input").value;
      pokemonRepository.filterPokemons(searchTerm);
    });
});
