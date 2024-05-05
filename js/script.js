var pokemonList = [
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


// Iterate over each item in pokemonList using a for loop

for (var i = 0; i < pokemonList.length; i++) {

    // Access the current Pokemon object in the array

    var pokemon = pokemonList[i];

    // Construct the string to be written to the DOM

    var pokemonInfo = pokemon.name + " (height: " + pokemon.height + ")";

    // Check if height is above certain threshold

if (pokemon.height > 6) {

    (pokemonInfo += "-Wow, that's really big!")

     }

    // Use document.write() to write the Pokémon name and height to the DOM
    
    document.write(pokemonInfo + "<br>");
} 

