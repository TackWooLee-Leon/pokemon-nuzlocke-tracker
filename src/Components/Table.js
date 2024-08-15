import styles from './Table.module.css'
import React, { useState } from 'react';
import TableRow from './TableRow';
import PokemonStorage from './PokemonStorage';

export default function Table() {
    const [player1NameInput, setplayer1NameInput] = useState("");
    const [player2NameInput, setplayer2NameInput] = useState("");
    const [player1Name, setplayer1Name] = useState("");
    const [player2Name, setplayer2Name] = useState("");


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
        0: {name: '', pokemonTypes: '', spriteUrl: ''},
        1: {name: '', pokemonTypes: '', spriteUrl: ''},
        2: {name: '', pokemonTypes: '', spriteUrl: ''},
        3: {name: '', pokemonTypes: '', spriteUrl: ''},
        4: {name: '', pokemonTypes: '', spriteUrl: ''},
        5: {name: '', pokemonTypes: '', spriteUrl: ''},
        6: {name: '', pokemonTypes: '', spriteUrl: ''},
        7: {name: '', pokemonTypes: '', spriteUrl: ''},
        8: {name: '', pokemonTypes: '', spriteUrl: ''},
        9: {name: '', pokemonTypes: '', spriteUrl: ''},
        10: {name: '', pokemonTypes: '', spriteUrl: ''},
        11: {name: '', pokemonTypes: '', spriteUrl: ''},
    });

    const handleSelectChange = (optionIndex, selectedOption) => {
        const { name, pokemonTypes, spriteUrl } = selectedOption;
        setSelectedPokemon(prevState => ({
            ...prevState,
            [optionIndex]: {
                name: name,
                pokemonTypes: pokemonTypes,
                spriteUrl: spriteUrl
            }
        }));
    }

    const [buttonBackgroundImage, setButtonBackgroundImage] = useState({
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
        10: '',
        11: '',
    });

    const handleAddButtonClick = (buttonIndex) => {
        if (selectedPokemon[buttonIndex]) {
            const spriteUrl = selectedPokemon[buttonIndex].spriteUrl;
            setButtonBackgroundImage(prevState => ({
                ...prevState,
                [buttonIndex]: spriteUrl
            }));
        }
    }

    return(
        <div className={styles.tableContainer}>
            <div className={styles.teamLayout}>
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
                    />            
                    </tbody>
                </table>
            </div>

            <table className={styles.storage}>
                <tbody>
                        
                            
                </tbody>
            </table>
        </div>
    )
}