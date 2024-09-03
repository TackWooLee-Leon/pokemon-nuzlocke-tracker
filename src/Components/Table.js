import styles from './Table.module.css';
import React, { useState, useEffect } from 'react';
import PokemonTeam from './PokemonTeam';
import PokemonStorage from './PokemonStorage';
import PokemonInfo from './PokemonData';


export default function Table() {
    const [player1NameInput, setplayer1NameInput] = useState("");
    const [player2NameInput, setplayer2NameInput] = useState("");
    const [player1Name, setplayer1Name] = useState("");
    const [player2Name, setplayer2Name] = useState("");
    const [pokemonInfo, setPokemonInfo] = useState([]); 
    const [currentPage, setCurrentPage] = useState(0);


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


    const [selectedPokemon, setSelectedPokemon] = useState({
        team: Array(12).fill({ name: '', pokemonTypes: '', spriteUrl: '', nickname: '', location: ''}),
        storage: Array(5).fill().flatMap(() => Array(12).fill({ name: '', pokemonTypes: '', spriteUrl: '', nickname: '', location: ''}))
        })
    ;
    
    console.log(selectedPokemon)

    const handleSelectChange = (optionIndex, selectedOption, type) => {
        const { name, pokemonTypes, spriteUrl } = selectedOption;
        setSelectedPokemon(prevState => ({
            ...prevState,
            [type]: prevState[type].map((pokemon, index) => 
                index === optionIndex
                    ? { ...pokemon, name, pokemonTypes, spriteUrl }
                    : pokemon
            )
        }));
        
    }

    const [buttonBackgroundImage, setButtonBackgroundImage] = useState({
        team: Array(12).fill(''),
        storage: Array(60).fill('')
    });
    


    const handleAddButtonClick = (playerIndex, type) => {
        if (selectedPokemon[type][playerIndex]) {
            const spriteUrl = selectedPokemon[type][playerIndex].spriteUrl;
    
            setButtonBackgroundImage(prevState => ({
                ...prevState,
                [type]: prevState[type].map((image, index) => 
                    index === playerIndex 
                        ? spriteUrl 
                        : image 
                )
            }));
        }
    };

    const teamRenderRows = () => {
        return Array(6).fill().map((_, rowIndex) => {
            const player1Index = rowIndex * 2;
            const player2Index = player1Index + 1;
                return (
                    // <tr key={rowIndex}>
                        <PokemonTeam 
                            key={rowIndex}
                            playerProps={{
                                player1Index,
                                player2Index,
                                selectedPokemon,
                                setSelectedPokemon,
                                buttonBackgroundImage,
                                handleNicknameChange
                        }}
                            selectProps={{
                                handleSelectChange: (optionIndex, selectedOption) => handleSelectChange(optionIndex, selectedOption, 'team'),
                                handleAddButtonClick: (buttonIndex) => handleAddButtonClick(buttonIndex, 'team')
                        }}
                        pokemonInfo={pokemonInfo}
                        handleLocationChange={handleLocationChange}

                    />
                    // </tr>
                    
                )
        })
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    }

    const storageRenderRows = () => {
        return Array(6).fill().map((_, rowIndex) => {
            const player1Index = currentPage * 12 + rowIndex * 2;
            const player2Index = player1Index + 1;
                return (
                    <tr key={rowIndex}>
                        <PokemonStorage 
                            key={rowIndex}
                            playerProps={{
                                player1Index,
                                player2Index,
                                selectedPokemon,
                                setSelectedPokemon,
                                buttonBackgroundImage,
                                handleNicknameChange
                        }}
                            selectProps={{
                                handleSelectChange: (optionIndex, selectedOption) => handleSelectChange(optionIndex, selectedOption, 'storage'),
                                handleAddButtonClick: (buttonIndex) => handleAddButtonClick(buttonIndex, 'storage')
                        }}
                        pokemonInfo={pokemonInfo}
                        handleLocationChange={handleLocationChange}
                    />
                    </tr>
                    
                )
        })
    }

    const handleNicknameChange = (index, nickname, type) => {
        setSelectedPokemon((prevSelectedPokemon) => {
            const updatedSelectedPokemon = [...prevSelectedPokemon[type]];
            updatedSelectedPokemon[index] = {
                ...updatedSelectedPokemon[index],
                nickname: nickname
            };
            return {
                ...prevSelectedPokemon,
                [type]: updatedSelectedPokemon
            };
        });
    };

    const handleLocationChange = (player1Index, player2Index, type, event) => {
        const newLocation = event.target.value;
    
        setSelectedPokemon((prevSelectedPokemon) => {
            // Create a copy of the array to update
            const updatedArray = [...prevSelectedPokemon[type]];
    
            // Update the location for the specified indices
            updatedArray.forEach((player, index) => {
                if (index === player1Index || index === player2Index) {
                    updatedArray[index] = {
                        ...player,
                        location: newLocation
                    };
                }
            });
    
            // Return the new state object
            return {
                ...prevSelectedPokemon,
                [type]: updatedArray
            };
        });
    };
    
    // console.log(selectedPokemon.team[0].location);

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
                        {teamRenderRows()}

                    </tbody>
                </table>
            </div>

            <div> 
                <table className={styles.storage}>
                    {/* <thead><tr></tr></thead> */}
                    
                    <tbody>
                        {storageRenderRows()}
                    </tbody>
                </table>

                <div>
                    {Array.from({ length: 5}, (_, i) => (
                        <button key={i} onClick={() => handlePageChange(i)}>
                            Page {i +1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}