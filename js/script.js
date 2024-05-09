let pokemonRepository = (function () {
    let pokemonList = [
<<<<<<< HEAD
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
=======
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
>>>>>>> 092bc13f4ce415899a308a54c074a1e900f8b23a
    return {
        getAll: function () {
            return pokemonList;
        },

        add: function (pokemon) {
            pokemonList.push(pokemon);
        }
<<<<<<< HEAD

    };
})(); // <-- This line invokes the IIFE

pokemonRepository.getAll().forEach(function (pokemon) {
    document.write(pokemon.name + " (height: " + pokemon.height + ")<br>");
});
=======
        
    },
})();

pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(pokemon.name + " (height: " + pokemon.height +")<br>");
})

>>>>>>> 092bc13f4ce415899a308a54c074a1e900f8b23a
