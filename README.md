# Pokémon Soullocke Tracker 
The Pokémon Soullocke Tracker is a web application designed to help players track Pokémon pairs during a Soullocke run, ensuring compliance with Soullocke rules such as type restrictions of Pokémon across pairs. 

Here's a live demo: https://tackwoolee-leon.github.io/pokemon-soullocke-tracker/

![Screenshot 2024-09-11 at 15 28 24](https://github.com/user-attachments/assets/b6778d62-2be2-46d3-909e-59bbe4df65a5)

# Why I made this
As a fan of Pokémon Soullocke challenges, I've noticed a common issue amongst content creators who upload their gameplay on YouTube. These players often face difficulties keeping track of their Pokémon pairs, especially when their upload schedule is irregular. Since they may not film or play every day, it's easy for them to forget which Pokémon are paired together. This can lead to mistakes, where they inadvertently use the wrong Pokémon pairs, and these errors might only be discovered after the video is uploaded and viewers point them out in the comments.

Many YouTubers rely on physical notebooks to manually track their Pokémon pairs, which can be both tedious and confusing. While there are existing trackers available, they often lack essential features like checking for duplicated pairings, a crucial aspect of Soullocke challenges.

To address this problem, I decided to create a Pokémon Soullocke Tracker. This tool helps players keep track of their Pokémon pairs efficiently and automatically detects duplicated pairings.

# How I made this
## Tech used

- HTML
- CSS
- JavaScript
- React.js
- PokiAPI
- React-Select

This project was built using React.js for its component-based architecture, which makes state management and UI updates efficient. I fetched data from the Poké API for all Generation 3 Pokémon, filtered out all unnecessary data for each Pokémon (abilities, Pokédex numbers, etc.), and then cached and stored the relevant data locally.

## Features

- 
