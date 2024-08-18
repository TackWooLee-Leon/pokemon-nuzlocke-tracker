import styles from './Table.module.css';
import React, { useState, useEffect } from 'react';
import TableRow from './TableRow';
import PokemonStorage from './PokemonStorage';
import PokemonInfo from './PokemonData';


export default function Table() {
    const [player1NameInput, setplayer1NameInput] = useState("");
    const [player2NameInput, setplayer2NameInput] = useState("");
    const [player1Name, setplayer1Name] = useState("");
    const [player2Name, setplayer2Name] = useState("");
    const [pokemonInfo, setPokemonInfo] = useState([]); 


    useEffect(()=>{
        PokemonInfo()
            .then((data) => {
                setPokemonInfo(data)
            })
    }, [])

    const handleChange = (event) => {
        // extracting name and value properties from event.target which is input
        const { name, value } = event.target;
        if (name === "player1") {
            setplayer1NameInput(value);
        } else if (name === "player2") {
            setplayer2NameInput(value);
        }
    };


    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            // update th's value separately, if update together (without checking name prop) 
            // then one name will disappear as the other one gets updated
            if (event.target.name === "player1") {
                setplayer1Name(player1NameInput);
                setplayer1NameInput("");
            } else if (event.target.name === "player2") {
                setplayer2Name(player2NameInput);
                setplayer2NameInput("");
            }
        }
    }

    const [rows, setRows] = useState([0]);
    const addRow =() => {
        setRows(prevRows => [...prevRows, prevRows.length]);
    };

    const [selectedPokemon, setSelectedPokemon] = useState({
        team: Array(12).fill({ name: '', pokemonTypes: '', spriteUrl: ''}),
        storage: Array(12).fill({ name: '', pokemonTypes: '', spriteUrl: ''})
    });
    
    console.log(selectedPokemon)

    const handleSelectChange = (optionIndex, selectedOption) => {
        const { name, pokemonTypes, spriteUrl } = selectedOption;
        setSelectedPokemon(prevState => ({
            ...prevState,
            team: prevState.team.map((pokemon, index) =>
                index === optionIndex 
                    ? { name, pokemonTypes, spriteUrl }
                    : pokemon
            )
        }));
        
    }

    const [buttonBackgroundImage, setButtonBackgroundImage] = useState({
        team: Array(12).fill(''),
        storage: Array(12).fill('')
    });
    console.log(buttonBackgroundImage)


    const handleAddButtonClick = (playerIndex) => {
        if (selectedPokemon.team[playerIndex]) {
            const spriteUrl = selectedPokemon.team[playerIndex].spriteUrl;
    
            setButtonBackgroundImage(prevState => ({
                ...prevState,
                team: prevState.team.map((image, index) => 
                    index === playerIndex 
                        ? spriteUrl 
                        : image 
                )
            }));
        }
    };
    

    return(
        <div className={styles.tableContainer}>
            <div className={styles.team}>
                <div className={styles.playersNameInput}>
                    <input
                        type="text"
                        name="player1"
                        placeholder="enter player 1's name"
                        value={player1NameInput}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                    />
                
                    <input
                        type="text"
                        name="player2"
                        placeholder="enter player 2's name"
                        value={player2NameInput}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                    />

                    <button className={styles.addRow}onClick={addRow}>Add A New Pair</button>  
                </div>

                <table>
                    <thead>
                        <tr>
                            <th className={styles.location}>Location</th>
                            <th className={styles.playersNameDisplay}>{player1Name}</th>
                            <th className={styles.playersNameDisplay}>{player2Name}</th>
                            <th className={styles.nicknames}>Nicknames</th>
                        </tr>
                    </thead>
                        
                    <tbody>
                    
                    <TableRow
                        key={0}
                        playerProps={{
                            player1Index: 0,
                            player2Index: 1,
                            selectedPokemon,
                            buttonBackgroundImage
                        }}
                        selectProps={{
                            handleSelectChange,
                            handleAddButtonClick
                        }}
                        pokemonInfo={pokemonInfo}
                    />

                    <TableRow
                        key={1}
                        playerProps={{
                            player1Index: 2,
                            player2Index: 3,
                            selectedPokemon,
                            buttonBackgroundImage
                        }}
                        selectProps={{
                            handleSelectChange,
                            handleAddButtonClick
                        }}
                        pokemonInfo={pokemonInfo}
                    />

                    <TableRow
                        key={2}
                        playerProps={{
                            player1Index: 4,
                            player2Index: 5,
                            selectedPokemon,
                            buttonBackgroundImage
                        }}
                        selectProps={{
                            handleSelectChange,
                            handleAddButtonClick
                        }}
                        pokemonInfo={pokemonInfo}
                    />

                    <TableRow
                        key={3}
                        playerProps={{
                            player1Index: 6,
                            player2Index: 7,
                            selectedPokemon,
                            buttonBackgroundImage
                        }}
                        selectProps={{
                            handleSelectChange,
                            handleAddButtonClick
                        }}
                        pokemonInfo={pokemonInfo}
                    />

                    <TableRow
                        key={4}
                        playerProps={{
                            player1Index: 8,
                            player2Index: 9,
                            selectedPokemon,
                            buttonBackgroundImage
                        }}
                        selectProps={{
                            handleSelectChange,
                            handleAddButtonClick
                        }}
                        pokemonInfo={pokemonInfo}
                    />

                    <TableRow
                        key={5}
                        playerProps={{
                            player1Index: 10,
                            player2Index: 11,
                            selectedPokemon,
                            buttonBackgroundImage
                        }}
                        selectProps={{
                            handleSelectChange,
                            handleAddButtonClick
                        }}
                        pokemonInfo={pokemonInfo}
                    />            
                    </tbody>
                </table>
            </div>

            <table className={styles.storage}>

                <tbody>
                    <PokemonStorage
                        playerProps={{
                            selectedPokemon,
                            buttonBackgroundImage
                        }}
                        selectedProps={{
                            handleSelectChange,
                            handleAddButtonClick
                        }}
                        pokemonInfo={pokemonInfo}
                        setSelectedPokemon={setSelectedPokemon}
                    />

                    <PokemonStorage
                        playerProps={{
                            selectedPokemon,
                            buttonBackgroundImage
                        }}
                        selectedProps={{
                            handleSelectChange,
                            handleAddButtonClick
                        }}
                        pokemonInfo={pokemonInfo}
                    />
                    <PokemonStorage
                        playerProps={{
                            selectedPokemon,
                            buttonBackgroundImage
                        }}
                        selectedProps={{
                            handleSelectChange,
                            handleAddButtonClick
                        }}
                        pokemonInfo={pokemonInfo}
                    />

                    <PokemonStorage
                        playerProps={{
                            selectedPokemon,
                            buttonBackgroundImage
                        }}
                        selectedProps={{
                            handleSelectChange,
                            handleAddButtonClick
                        }}
                        pokemonInfo={pokemonInfo}
                    />
                    <PokemonStorage
                        playerProps={{
                            selectedPokemon,
                            buttonBackgroundImage
                        }}
                        selectedProps={{
                            handleSelectChange,
                            handleAddButtonClick
                        }}
                        pokemonInfo={pokemonInfo}
                    />

                    <PokemonStorage
                        playerProps={{
                            selectedPokemon,
                            buttonBackgroundImage
                        }}
                        selectedProps={{
                            handleSelectChange,
                            handleAddButtonClick
                        }}
                        pokemonInfo={pokemonInfo}
                    />
                </tbody>
            </table>
        </div>
    )
}