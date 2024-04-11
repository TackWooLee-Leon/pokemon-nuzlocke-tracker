
const PokemonInfo = () => {
    return fetch("https://pokeapi.co/api/v2/pokemon/?limit=135&offset=251")
    .then(response => response.json())
    .then(data => {
        // inside each url contains all the data for each pokemon, such as name, sprites, types, etc
        const pokemonUrls = data.results.map(pokemon => pokemon.url);
        // creating an array by map and store it inside pokemonDataPromises variable
        const pokemonDataPromises = pokemonUrls.map(url => 
            // fetching data from the urls
            fetch(url)
            .then(response => response.json())
            // manually selecting necessary data
            .then(pokemonData => {
                // destructing properties from pokemonData (extract specific values)
                const { name, sprites, types } = pokemonData;
                const spriteUrl = sprites?.front_default;
                const pokemonTypes = types.map(type => type.type.name);
                return { name, spriteUrl, pokemonTypes };
            })
            );
        // return a promise that can be resolved at another call site
        return Promise.all(pokemonDataPromises)
    })
}

export default PokemonInfo;