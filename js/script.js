let pokemonRepository = (function () {
    let pokemonList = [
        //Pokemon data here
        {
            name: "Bulbasaur",
            height: 7,
            types: ['Grass', 'Poison']
        },
        {
            name: "Charizard",
            height: 6,
            types: ['Fire']
        },
        {
            name: "Squirtle",
            height: 5,
            types: ['Water']
        }
    ];
    return {
        getAll: function () {
            return pokemonList;
        },

        add: function (pokemon) {
            pokemonList.push(pokemon);
        }

    };
})(); // <-- This line invokes the IIFE

pokemonRepository.getAll().forEach(function (pokemon) {
    document.write(pokemon.name + " (height: " + pokemon.height + ")<br>");
});
