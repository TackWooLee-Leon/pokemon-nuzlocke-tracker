const PokemonInfo = () => {
    const cachedData = localStorage.getItem('pokemonData');

    if (cachedData) {
        // If cached data exists, return it as a resolved promise
        return Promise.resolve(JSON.parse(cachedData));
    }

    return fetch("https://pokeapi.co/api/v2/pokemon/?limit=135&offset=251")
        .then(response => response.json())
        .then(data => {
            const pokemonUrls = data.results.map(pokemon => pokemon.url);
            const pokemonDataPromises = pokemonUrls.map(url =>
                fetch(url)
                    .then(response => response.json())
                    .then(pokemonData => {
                        const { name, sprites, types } = pokemonData;
                        const spriteUrl = sprites?.front_default;
                        const pokemonTypes = types.map(type => type.type.name);
                        return { name, spriteUrl, pokemonTypes };
                    })
            );
            return Promise.all(pokemonDataPromises)
                .then(pokemonData => {
                    // Cache the data in localStorage
                    localStorage.setItem('pokemonData', JSON.stringify(pokemonData));
                    return pokemonData;
                });
        });
}

export default PokemonInfo;
