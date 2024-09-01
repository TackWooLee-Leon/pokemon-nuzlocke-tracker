import styles from './Table.module.css'
import React, { useState, useEffect, useRef } from 'react';

import Select from 'react-select';

export default function PokemonTeam ( { playerProps, selectProps, pokemonInfo }) {
    const { player1Index, player2Index, selectedPokemon, buttonBackgroundImage, handleNicknameChange } = playerProps;
    const { handleSelectChange, handleAddButtonClick } = selectProps;


    const [showPopUp, setShowPopUp] = useState(Array(2).fill(false));
    function togglePopUp(index) {
        setShowPopUp((prevShowPopUp) => {
            const newShowPopUp = [...prevShowPopUp];
            newShowPopUp[index] = !newShowPopUp[index];
            return newShowPopUp
        });
    };

    const [player1Nickname, setplayer1Nickname] = useState("")
    const [player2Nickname, setplayer2Nickname] = useState("")



    // useEffect(() => {
    //     console.log('Selected Pokémon:', selectedPokemon);
    //   }, [selectedPokemon]);

    // useEffect(() => {
    //     console.log('plyaerIndex', player1Index);
    // }, [player1Index])

    function checkForDuplicatingTypes() {
        const typeCounts = {};

        for (let i in selectedPokemon.team) {
            if (selectedPokemon.team.hasOwnProperty(i)) {
                const pokemon = selectedPokemon.team[i];
                const type = pokemon.pokemonTypes[0];

                if (!type) continue;

                if (!typeCounts[type]) {
                    typeCounts[type] = {count: 0, names: [] };
                }

                typeCounts[type].count += 1;
                typeCounts[type].names.push(pokemon.name);
            }
        }

        console.log('Type counts:', typeCounts);
        
        let duplicatedFound = false;

        for (const type in typeCounts) {
            if (typeCounts.hasOwnProperty(type)) {
                const entry = typeCounts[type];
                if (entry.count > 1) {
                    duplicatedFound = true;
                    console.log(`Duplicates found for type: ${type}. Pokemon: ${entry.names.join(', ')}`);
                }
            }
        }

        if (!duplicatedFound) {
            console.log('no duplicated found');
        }
    }

    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    
    function Player1PokemonSelect() {

        
        return(
            <td className={styles.pokemonDisplay}>
                <div className={styles.popUpMenu} style={{ 
                    display: showPopUp[player1Index] ? "flex" : "none", 
                    position: "absolute", 
                    bottom: "65px",
                    right: "-40px"
                }}>
                    <div className={styles.selectWrapper}>
                        <Select 
                            placeholder="Find Pokemon"
                            onChange={(selectedOption) => {handleSelectChange(player1Index, selectedOption, 'team')}}
                            formatOptionLabel={(pokemon) => {
                                return( 
                                    <div style={{ display: "flex", alignItems: "center"}}>
                                        <img src={pokemon.spriteUrl} alt={pokemon.name} style={{ width: 50, marginRight: 5 }}></img>
                                        <span>{pokemon.name}</span>
                                    </div>)
                            }}
                            options={pokemonInfo} 
                            getOptionLabel={options => options.name}
                            getOptionValue={options => options.name}
                            value={selectedPokemon.team[player1Index] && pokemonInfo.find(pokemon => pokemon.name === selectedPokemon.team[player1Index].name)}
                        />
                    </div>

                    <input 
                        type="text" 
                        placeholder='Enter nickname'
                        ref={input1Ref}
                    />

                    <div className={styles.popUpMenuBtns}>
                        <button onClick={() => {togglePopUp(player1Index)}}>Cancel</button>
                        <button 
                        onClick={() => {togglePopUp(player1Index); handleNicknameChange(player1Index, input1Ref.current.value, 'team'); handleAddButtonClick(player1Index); checkForDuplicatingTypes()}}>Add</button>
                    </div>
                </div>

                <button style={{  
                    backgroundImage: `url(${buttonBackgroundImage.team[player1Index]})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: "4rem", 
                    width: "4rem",
                    borderRadius: '15px',
                    border: 'none',
                }}
                    onClick={() => {togglePopUp(player1Index)}}>
                +</button>
            </td>
        )
    }

    function Player2PokemonSelect () {
        
        return (
            <td className={styles.pokemonDisplay}> 
                <div className={styles.popUpMenu} style={{
                    display: showPopUp[player2Index] ? "flex" : "none", 
                    position: "absolute", 
                    bottom: "65px", 
                    left: "-40px"
                }}>
                    <div className={styles.selectWrapper}>
                        <Select 
                            placeholder="Find Pokemon"
                            onChange={(selectedOption) => {handleSelectChange(player2Index, selectedOption, 'team')}}
                            formatOptionLabel={(pokemon) => {
                                return ( 
                                    <div style={{ display: 'flex', alignItems: 'center'}}>
                                        <img src={pokemon.spriteUrl} alt={pokemon.name} style={{ width: 50, marginRight: 5 }}></img>
                                        <span>{pokemon.name}</span>
                                    </div>)
                            }}
                            options={pokemonInfo} 
                            getOptionLabel={options => options.name}
                            getOptionValue={options => options.name}
                            value={selectedPokemon.team[player2Index] && pokemonInfo.find(pokemon => pokemon.name === selectedPokemon.team[player2Index].name)}
                            />
                    </div>
                    <input 
                        type="text" 
                        placeholder='Enter nickname'
                        ref={input2Ref}
                    />

                    <div className={styles.popUpMenuBtns}>
                        <button onClick={() => {togglePopUp(player2Index)}}>Cancel</button>
                        <button 
                        onClick={() => {togglePopUp(player2Index); handleNicknameChange(player2Index, input2Ref.current.value, 'team'); handleAddButtonClick(player2Index); checkForDuplicatingTypes()}}>Add</button>
                    </div>
                </div>

                <button style={{  
                    backgroundImage: `url(${buttonBackgroundImage.team[player2Index]})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: "4rem", 
                    width: "4rem",
                    borderRadius: '15px',
                    border: 'none',
                }}
                    onClick={() => {togglePopUp(player2Index)}}>
                +</button>
            </td>
        )
    }

    return(
            <tr>
                <td>
                    <input 
                        type="text" 
                        placeholder='e.g. route 101' 
                        style={{
                        fontSize: '0.9rem'
                    }}></input>
                </td>
                <Player1PokemonSelect/>
                <Player2PokemonSelect/>

                <td className={styles.nicknames}>{selectedPokemon.team[player1Index].nickname} & {selectedPokemon.team[player2Index].nickname}</td>
            </tr>

    
        
)
    

}
