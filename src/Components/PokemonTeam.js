import styles from './PokemonTeam.module.css'
import React, { useState, useEffect, useRef } from 'react';

import Select from 'react-select';

export default function PokemonTeam ( { 
    playerProps, 
    selectProps, 
    pokemonInfo, 
    handleLocationChange,
    onDragStart, 
    onDrop, 
    onDragOver 
    }) {
    const { player1Index, player2Index, selectedPokemon, buttonBackgroundImage, handleNicknameChange } = playerProps;
    const { handleSelectChange, handleAddButtonClick } = selectProps;


    const [showPopUp, setShowPopUp] = useState(Array(2).fill(false));
    // const popupRefs = useRef([]);

    function togglePopUp(index) {

        setShowPopUp((prevShowPopUp) => {
            const newShowPopUp = [...prevShowPopUp];
            newShowPopUp[index] = !newShowPopUp[index];
            return newShowPopUp
        });
    };


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
    // console.log(showPopUp)

    function Player1PokemonSelect() {

        
        return(
            <td className={styles.teamPokemonDisplay}>
                <div 
                    className={styles.teamPopUpMenu} 
                    // ref={el => popupRefs.current[player1Index] = el}
                    style={{ 
                        display: showPopUp[player1Index] ? "flex" : "none", 
                        position: "absolute", 
                        bottom: "75px",
                        right: "-40px"
                }}>
                    <div className={styles.teamSelectWrapper}>
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

                    <div className={styles.teamPopUpMenuBtns}>
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
                    border: '1px solid #071452'
                }}
                    onClick={() => {togglePopUp(player1Index)}}>
                    
                +</button>
            </td>
        )
    }

    function Player2PokemonSelect () {
        
        return (
            <td className={styles.teamPokemonDisplay}> 
                <div className={styles.teamPopUpMenu} style={{
                    display: showPopUp[player2Index] ? "flex" : "none", 
                    position: "absolute", 
                    bottom: "75px", 
                    left: "-40px"
                }}>
                    <div className={styles.teamSelectWrapper}>
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

                    <div className={styles.teamPopUpMenuBtns}>
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
                    border: '1px solid #071452'
                }}
                    // ref={el => popupRefs.current[player2Index] = el}
                    onClick={() => {togglePopUp(player2Index)}}>
                +</button>
            </td>
        )
    }

    return(
            <tr
                draggable
                onDragStart={onDragStart}
                onDrop={onDrop}
                onDragOver={onDragOver}
            >
                <td>
                    <input 
                        type="text" 
                        value={selectedPokemon.team[player1Index].location}
                        onChange={(e) => handleLocationChange(player1Index, player2Index, 'team', e)}
                        placeholder='e.g. route 101' 
                        style={{
                            border: '2px solid #071452',
                            width: '10rem',
                            marginLeft: '0.7rem',
                            fontSize: '0.9rem'
                    }}></input>
                </td>
                <Player1PokemonSelect
                    player1Index={player1Index}
                    tableType="team"
                    selectedPokemon={selectedPokemon}
                    handleSelectChange={selectProps.handleSelectChange}
                    pokemonInfo={pokemonInfo}
                />
                <Player2PokemonSelect 
                    player2Index={player2Index}
                    tableType="team"
                    selectedPokemon={selectedPokemon}
                    handleSelectChange={selectProps.handleSelectChange}
                    pokemonInfo={pokemonInfo}
                />

                <td className={styles.teamNicknames}>{selectedPokemon.team[player1Index].nickname} & {selectedPokemon.team[player2Index].nickname}</td>
            </tr>

    
        
)
    

}
