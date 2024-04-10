import { useState, useEffect } from 'react';

const PokemonInfo = () => {
    useEffect(() => {
        // retrieving data from pokeAPI, data would be arrays of Pokemon with names and urls
        // this won't give you the full list of data, we have to dig deeper into the urls
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=135&offset=251")
        // parsing/converting the data (json format) to javascript object
        .then(response => response.json())
        .then(data => {
            // inside each url contains all the data for each pokemon, such as name, sprites, types, etc
            // we only need those three data, so we need to filter out other unnecessary information
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

            Promise.all(pokemonDataPromises)
                .then(pokemonData => {
                    console.log(pokemonData);
                })
        })
            
    })
}

export default PokemonInfo;