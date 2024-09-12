# Pokémon Soullocke Tracker 
The Pokémon Soullocke Tracker is a web application designed to help players track Pokémon pairs during a Soullocke run, ensuring compliance with Soullocke rules such as type restrictions of Pokémon across pairs. 

Here's a live demo: https://tackwoolee-leon.github.io/pokemon-soullocke-tracker/

![Screenshot 2024-09-11 at 15 28 24](https://github.com/user-attachments/assets/b6778d62-2be2-46d3-909e-59bbe4df65a5)

# Why I Made This
As a fan of Pokémon Soullocke challenges, I've noticed a common issue amongst content creators who upload their gameplay on YouTube. These players often face difficulties keeping track of their Pokémon pairs, especially when their upload schedule is irregular. Since they may not film or play every day, it's easy for them to forget which Pokémon are paired together. This can lead to mistakes, where they inadvertently use the wrong Pokémon pairs, and these errors might only be discovered after the video is uploaded and viewers point them out in the comments.

Many YouTubers rely on physical notebooks to manually track their Pokémon pairs, which can be both tedious and confusing. While there are existing trackers available, they often lack essential features like checking for duplicated pairings, a crucial aspect of Soullocke challenges.

To address this problem, I decided to create a Pokémon Soullocke Tracker. This tool helps players keep track of their Pokémon pairs efficiently and automatically detects duplicated pairings.

# Soullocke Rules
1. Each player can only catch 1 Pokémon per route/area.
2. You can only catch the 1st wild encountered Pokemon per route/area.
3. Caught Pokémon from the same route/area are linked, thus becomes a pair.
4. When one player's Pokémon faints, the other one is considered fainted as well.
5. Once a Pokémon is fainted, it's out of the challenge entirely. Which means the pair is no longer useable.
6. Players must give a nickname to their caught Pokémon.
7. Players can't have the same primary type Pokemon on their team.
   
   - Example: 1st pair has Treecko (grass) and Torchic (fire), this is a valid pair. 2nd pair has Mudkip (water) and Seedot (grass), which is also a valid pair, however, Seedot and Treecko both share the same primary Type (grass), therefore, one of the pairs have to be placed into PC.


# How I Made This
## Tech used

- HTML
- CSS
- JavaScript
- React.js
- PokiAPI
- React-Select

This project was built using React.js for its component-based architecture, which makes state management and UI updates efficient. I fetched data from the Poké API for all Generation 3 Pokémon, filtered out all unnecessary data for each Pokémon (abilities, Pokédex numbers, etc.), and then cached and stored the relevant data locally. I also used React-Select to create dynamic dropdown menus for Pokémon selection, allowing users to filter and choose from a list of available Pokémon.

## Features

### Pokémon Pair Tracking
The purpose of the Pokémon pair tracking system, specifically through the checkForDuplicatingTypes function, is to ensure that no two Pokémon in a team share the same primary type. 

**1. Iterate Over the Pokémon Team**
- The funciton loops through each Pokémon in the `selectedPokemon.team`, checking for the priamry type (`pokemonTypes[0]`).

```javascript
const [selectedPokemon, setSelectedPokemon] = useState({
   team: Array(12).fill({ name: '', pokemonTypes: '', spriteUrl: '', nickname: '', location: ''}),
   storage: Array(5).fill().flatMap(() => Array(12).fill({ name: '', pokemonTypes: '', spriteUrl: '', nickname: '', location: ''}))
});
```

```javascript
for (let i in selectedPokemon.team) {
  if (selectedPokemon.team.hasOwnProperty(i)) {
    const pokemon = selectedPokemon.team[i];

    // Primary type
    const type = pokemon.pokemonTypes[0]; 

    // Skip if there's no type 
    if (!type) continue; 
  }
}
```

**2. Track Type Occurrences**
- The function uses a `typeCounts` object to keep track of how many times each type appears and stores Pokémon nmaes and nicknames.

```javascript
if (!typeCounts[type]) {
  typeCounts[type] = { count: 0, names: [], nicknames: [] };
}

typeCounts[type].count += 1;
typeCounts[type].names.push(pokemon.name);
typeCounts[type].nicknames.push(pokemon.nickname);
```

**3. Check for Duplicates**
- It checks if any type has a count greater than 1 (i.e., it's duplicated). It found, it passes the duplicated type and Pokémon names to the `onDuplicatedtype` function which the parent component will render the type and names.

```javascript
for (const type in typeCounts) {
  if (typeCounts[type].count > 1) {
    const duplicatedType = type;
    const duplicatedPokemon = typeCounts[type].names.join(', ');

    // Handle duplicate
    onDuplicatedType(duplicatedType, duplicatedPokemon); 
  }
}
```

### Drag-and-Drop
The drag-and-drop feature allows users to rearrange Pokémon entries within the application. This functionality enhances user experience by providing a more interactive and intuitive way to manage Pokémon data.

**1. Drag Initialization:**
- `handleDragStart`: When a drag operation starts, this function captures the Pokémon data from the source row (`player1` and `player2`) along with their indices and the source table (`team` or `storage`). This data is serialized into JSON and stored in the `dataTransfer` object of the event, which will be used during the drop operation.


```javascript
  const handleDragStart = (event, player1Index, player2Index, sourceTable) => {
    const dataToTransfer = {
      player1: selectedPokemon[sourceTable][player1Index] || {},
      player2: selectedPokemon[sourceTable][player2Index] || {},
      player1Index,
      player2Index,
      sourceTable,
    };
    
    event.dataTransfer.setData('application/json', JSON.stringify(dataToTransfer));
}; 
 ```


**2. Allowing Drop:**
- `allowDrop`: This function prevents the default browser behavior, which is required to enable dropping. It ensures that the drop action can be handled by your custom logic.

```javascript
const allowDrop = (event) => {
    event.preventDefault();
};
```

**3. Handling Drop:**
- `handleDrop`: When a dragged item is dropped onto a target row, this function retrieves the stored data from the `dataTransfer` object. It then updates the state to swap the Pokémon data and button background images between the source and target rows. This function ensures that the Pokémon and their associated background images are correctly swapped between the source and target tables.

```javascript
const handleDrop = (event, player1Index, player2Index, targetTable) => {
    event.preventDefault();
    
    const draggedData = JSON.parse(event.dataTransfer.getData('application/json'));

    if (draggedData.sourceTable === targetTable) {
        return;
    }
    
    setSelectedPokemon((prevState) => {
        const updatedSource = [...prevState[draggedData.sourceTable]];
        const updatedTarget = [...prevState[targetTable]];

        const tempPlayer1 = updatedSource[draggedData.player1Index];
        const tempPlayer2 = updatedSource[draggedData.player2Index];

        updatedSource[draggedData.player1Index] = updatedTarget[player1Index];
        updatedSource[draggedData.player2Index] = updatedTarget[player2Index];

        updatedTarget[player1Index] = tempPlayer1;
        updatedTarget[player2Index] = tempPlayer2;

        return {
            ...prevState,
            [draggedData.sourceTable]: updatedSource,
            [targetTable]: updatedTarget,
        };
    });

    setButtonBackgroundImage((prevState) => {
        const updatedSourceBg = [...prevState[draggedData.sourceTable]];
        const updatedTargetBg = [...prevState[targetTable]];

        const tempBg1 = updatedSourceBg[draggedData.player1Index];
        const tempBg2 = updatedSourceBg[draggedData.player2Index];

        updatedSourceBg[draggedData.player1Index] = updatedTargetBg[player1Index];
        updatedSourceBg[draggedData.player2Index] = updatedTargetBg[player2Index];

        updatedTargetBg[player1Index] = tempBg1;
        updatedTargetBg[player2Index] = tempBg2;

        return {
            ...prevState,
            [draggedData.sourceTable]: updatedSourceBg,
            [targetTable]: updatedTargetBg,
        };
    });
};
```

### Fetching Data From PokéAPI
This feature involves fetching Pokémon data from the PokéAPI, a comprehensive and free API that provides information about Pokémon, their abilities, types, and other attributes. The data retrieved from the API is used to populate and manage Pokémon information within the application.

The `PokemonInfo` component is responsible for fetching Pokémon data from the PokéAPI. 

```javascript
const PokemonInfo = () => {
    const cachedData = localStorage.getItem('pokemonData');

    if (cachedData) {
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
                    localStorage.setItem('pokemonData', JSON.stringify(pokemonData));
                    return pokemonData;
                });
        });
}

export default PokemonInfo;

```

**1. Check Local Storage:**
```javascript
const cachedData = localStorage.getItem('pokemonData');

if (cachedData) {
  return Promise.resolve(JSON.parse(cachedData));
```

- The component first attempts to retrieve the Pokémon data from the browser's local storage using `localStorage.getItem('pokemonData')`

- If cached data is found, it parses the JSON string and returns it as a resolved promise using `Promise.resolve()`. This avoids making unnecessary API requests and speeds up the loading time.

**2. Fetch Data from PokéAPI:**
```javascript
return fetch("https://pokeapi.co/api/v2/pokemon/?limit=135&offset=251")
    .then(response => response.json())
```

- If no cached data is found, the component proceeds to fetch data from PokéAPI.
- It makes a network request to the endpoint `https://pokeapi.co/api/v2/pokemon/?limit=135&offset=251`, which retrieves a list of Generation 3 Pokémon URLs.
  - `limit` is used to specify the maximum number of items to return. 135 is the total number of Generation 3 Pokémon which is why we set it to 135.
  - `offset` is used to specify the number of items to skip before starting to collect the response data. Generation 1 and Generation 2 have a total of 251 Pokémon, therefore 251 Pokémon are skipped.

**3. Extract Relevant Pokémon Information:**
```javascript
.then(pokemonData => {
    const { name, sprites, types } = pokemonData;
```

- The code extracts only the relevant properties from the data:
  - `name`: The Pokémon's name.
  - `sprites`: An object containing image URLs of the Pokémon.
  - `types`: An array of Pokémon types.

**4. Filter Out Specific Data:**
```javascript
const spriteUrl = sprites?.front_default;
const pokemonTypes = types.map(type => type.type.name);
```

- `spriteUrl`: Retrieves the URL for the Pokémon's default front sprite image (`sprites.front_default`). This ensures only the URL for the front sprite is included, filtering out other sprite variations (e.g., back, shiny).
- `pokemonTypes`: Maps the `types` array to include only the type names (`type.type.name`), which filters out other type-related details such as type URLs.

**5. Create a Clean Data Object:**
```javascript
return { name, spriteUrl, pokemonTypes };
```

- Constrcuts a new object containing only the essential properties: `name`, `spriteUrl`, and `pokemonTypes`.
- This new object excludes all other properties and nested objects from the original Pokémon data, which are not needed for this application.

**6. Cache and Return:**
```javascript
localStorage.setItem('pokemonData', JSON.stringify(pokemonData));
return pokemonData;
```

- Stores the fetched Pokémon data in the browser's `localStorage`, this way the app doesn't have to fetch again from the API later.
- Returns the fetched data from the function.

# Lessons Learned

Pokémon Soullock Tracker was a bit challenging to build from the scratch due to several reasons:

1. Overcoming Challenges Without Guidance
   - This project is one-of-its-own, there aren't tutorials online to guide you through it. Whenever I encountered a challenge, I relied on my own problem-solving skills, often writing down issues in a notebook and breaking them down into smaller, more manageable tasks. This approach allowed me to focus on one problem at a time and find effective solutions.
   - Visualizing the component structure by sketching it out helped me understand how parent and child components interact, especially when it came to state management. Although I didn’t have a guide to refer to, I was able to rely on critical thinking to push through obstacles. The process was tough, but it helped me grow and develop resilience as a programmer, allowing me to overcome complex challenges and keep moving forward.
    
2. The Importance of Data Caching
   - Initially, I didn’t store the data retrieved from the PokéAPI locally. I quickly realized this was inefficient, as each time a user interacted with a Pokémon Select component, it triggered a new API call, slowing down the app.
   - Through trial and error, I learned the value of caching data. Implementing local caching for Pokémon data significantly reduced unnecessary API requests, improving the app's performance and creating a more seamless user experience. This experience underscored the importance of efficiency in web development, especially when working with external APIs.
  
3. State Management
   - In this project, I realized how essential it is to keep the state in the correct component. Moving from local state in individual rows to managing state in the parent component allowed me to track Pokémon selections across multiple rows and tables.


# Contact
Email: tackwlee01@gmail.com

GitHub Repo: https://github.com/TackWooLee-Leon
