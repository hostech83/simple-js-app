let pokemonRepository = (function () {
  let e = [],
    t = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  function n(t) {
    "object" == typeof t && "name" in t && "detailsUrl" in t
      ? e.push(t)
      : console.error("Invalid Pokémon object:", t);
  }
  function o() {
    return e;
  }
  function a(e) {
    let t = document.querySelector(".pokemon-container"),
      n = document.createElement("div");
    n.classList.add("col-sm-6", "col-md-4", "col-lg-3", "mb-4");
    let o = document.createElement("div");
    o.classList.add("card");
    let a = document.createElement("img");
    a.classList.add("card-img-top"), (a.alt = e.name);
    let i = document.createElement("div");
    i.classList.add("card-body");
    let l = document.createElement("h5");
    l.classList.add("card-title"), (l.innerText = e.name);
    let r = document.createElement("button");
    (r.innerText = "Details"),
      r.classList.add("btn", "btn-primary"),
      r.setAttribute("type", "button"),
      r.setAttribute("data-toggle", "modal"),
      r.setAttribute("data-target", "#pokemonModal"),
      r.addEventListener("click", function () {
        s(e);
      }),
      i.appendChild(l),
      i.appendChild(r),
      o.appendChild(a),
      o.appendChild(i),
      n.appendChild(o),
      t.appendChild(n),
      c(e).then(function () {
        a.src = e.imageUrlFront;
      });
  }
  function c(e) {
    showLoadingMessage();
    let t = e.detailsUrl;
    return fetch(t)
      .then(function (e) {
        return e.json();
      })
      .then(function (t) {
        (e.imageUrlFront = t.sprites.other["official-artwork"].front_default),
          (e.height = t.height),
          (e.weight = t.weight),
          (e.types = t.types.map((e) => e.type.name)),
          (e.abilities = t.abilities.map((e) => e.ability.name)),
          hideLoadingMessage();
      })
      .catch(function (e) {
        console.error("Failed to load Pokémon details:", e),
          hideLoadingMessage();
      });
  }
  function s(e) {
    c(e).then(function () {
      d(
        e.name,
        e.height,
        e.weight,
        e.types,
        e.abilities,
        e.imageUrlFront,
        e.types[0]
      );
    });
  }
  function d(e, t, n, o, a, c, s) {
    let d = document.querySelector(".modal-title"),
      i = document.querySelector(".modal-body");
    d.textContent = e;
    let l = o.join(", ");
    (i.innerHTML = `\n      <div class="modal-content-top" style="background-color: ${r(
      s
    )};">\n        <img src="${c}" class="img-fluid" alt="${e} front">\n      </div>\n      <div class="modal-content-bottom">\n        <p>Height: ${t}</p>\n        <p>Weight: ${n}</p>\n        <p>Types: ${l}</p>\n        <p>Abilities: ${a.join(
      ", "
    )}</p>\n      </div>\n    `),
      i.classList.add("pokemon-modal-body"),
      $("#pokemonModal").modal("show");
  }
  function r(e) {
    return (
      {
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
      }[e] || "#A8A878"
    );
  }
  function i() {
    document.querySelector(".loading-message").innerText = "Loading...";
  }
  function l() {
    document.querySelector(".loading-message").innerText = "";
  }
  function h(t) {
    let n = e.filter((e) => e.name.toLowerCase().includes(t.toLowerCase())),
      o = document.querySelector(".pokemon-container");
    (o.innerHTML = ""), n.forEach((e) => a(e));
  }
  return {
    add: n,
    getAll: o,
    addListItem: a,
    showDetails: s,
    loadList: function () {
      i();
      return fetch(t)
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          e.results.forEach(function (e) {
            n({ name: e.name, detailsUrl: e.url });
          }),
            l();
        })
        .catch(function (e) {
          console.error("Failed to load Pokémon list:", e), l();
        });
    },
    loadDetails: c,
    filterPokemons: h,
  };
})();
document.addEventListener("DOMContentLoaded", function () {
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (e) {
      pokemonRepository.addListItem(e);
    });
  }),
    document
      .querySelector("#search-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        let t = document.querySelector("#search-input").value;
        pokemonRepository.filterPokemons(t);
      });
});
