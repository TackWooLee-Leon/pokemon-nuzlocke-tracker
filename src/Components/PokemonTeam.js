import styles from './PokemonTeam.module.css'
import React, { useState, useEffect, useRef } from 'react';

import Select from 'react-select';

export default function PokemonTeam ( { playerProps, selectProps, pokemonInfo, handleLocationChange }) {
    const { player1Index, player2Index, selectedPokemon, buttonBackgroundImage, handleNicknameChange } = playerProps;
    const { handleSelectChange, handleAddButtonClick } = selectProps;


    const [showPopUp, setShowPopUp] = useState(Array(2).fill(false));
    const popupRefs = useRef([]);

    function togglePopUp(index, event) {

        setShowPopUp((prevShowPopUp) => {
            return prevShowPopUp.map((show, i) => 
                i === index ? !show : show
        );
        });
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRefs.current.every(ref => ref && !ref.contains(event.target))) {
                setShowPopUp(Array(2).fill(false));
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return() => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
    console.log(showPopUp)
    
    function Player1PokemonSelect() {

        
        return(
            <td className={styles.teamPokemonDisplay}>
                <div 
                    className={styles.teamPopUpMenu} 
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
                    border: 'none',
                }}
                    ref={el => popupRefs.current[player1Index] = el}
                    onClick={(event) => {togglePopUp(player1Index, event)}}>
                    
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
                    border: 'none',
                }}
                    ref={el => popupRefs.current[player2Index] = el}
                    onClick={(event) => {togglePopUp(player2Index, event)}}>
                +</button>
            </td>
        )
    }

    return(
            <tr>
                <td>
                    <input 
                        type="text" 
                        
                        onChange={(e) => handleLocationChange(player1Index, player2Index, 'team', e)}
                        placeholder='e.g. route 101' 
                        style={{
                        fontSize: '0.9rem'
                    }}></input>
                </td>
                <Player1PokemonSelect/>
                <Player2PokemonSelect/>

                <td className={styles.teamNicknames}>{selectedPokemon.team[player1Index].nickname} & {selectedPokemon.team[player2Index].nickname}</td>
            </tr>

    
        
)
    

}
