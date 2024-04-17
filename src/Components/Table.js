import styles from './Table.module.css'
import React, { useState, useEffect } from 'react';
import PokemonInfo from './PokemonData';
import Select from 'react-select';

export default function Table() {
    const [playerOneNameInput, setPlayerOneNameInput] = useState("");
    const [playerTwoNameInput, setPlayerTwoNameInput] = useState("");
    const [playerOneName, setPlayerOneName] = useState("");
    const [playerTwoName, setPlayerTwoName] = useState("");
    const [pokemonInfo, setPokemonInfo] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);

    function togglePopUp() {
        setShowPopUp(!showPopUp);
    }


    useEffect(()=>{
        PokemonInfo()
            .then((data) => {
                setPokemonInfo(data)
                console.log(pokemonInfo)
            })
    }, [])

    const handleChange = (event) => {
        // extracting name and value properties from event.target which is input
        const { name, value } = event.target;
        if (name === "playerOne") {
            setPlayerOneNameInput(value);
        } else if (name === "playerTwo") {
            setPlayerTwoNameInput(value);
        }
    };


    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            // update th's value separately, if update together (without checking name prop) 
            // then one name will disappear as the other one gets updated
            if (event.target.name === "playerOne") {
                setPlayerOneName(playerOneNameInput);
                setPlayerOneNameInput("");
            } else if (event.target.name === "playerTwo") {
                setPlayerTwoName(playerTwoNameInput);
                setPlayerTwoNameInput("");
            }
        }
    }

    return(
        <div>
            <div className={styles.playersName}>
                <input
                    type="text"
                    name="playerOne"
                    placeholder="enter player 1's name"
                    value={playerOneNameInput}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
            
                <input
                    type="text"
                    name="playerTwo"
                    placeholder="enter player 2's name"
                    value={playerTwoNameInput}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
            </div>

            {/* table to display players' data */}
            <table>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>{playerOneName}</th>
                        <th>{playerTwoName}</th>
                        <th className={styles.textLeft}>Nicknames</th>
                    </tr>
                </thead>
                
            <tbody>
                <tr>
                    <td>
                        <input type="text" placeholder='e.g. route 101'></input>
                    </td>
                    <td  className={styles.pokemonDisplay}>
                        <div style={{display: showPopUp ? "flex" : "none"}} className={styles.popUpMenu}>
                            <div className={styles.selectWrapper}>
                                <Select 
                                    placeholder="Find Pokemon"
                                    formatOptionLabel={(pokemon) => {
                                        return ( 
                                        <div style={{ display: 'flex', alignItems: 'center'}}>
                                            <img src={pokemon.spriteUrl} alt={pokemon.name} style={{ width: 30, marginRight: 5 }}></img>
                                            <span>{pokemon.name}</span>

                                        </div>)
                                    
                                    }}
                                    options={pokemonInfo} 
                                    getOptionLabel={options => options.name}
                                    getOptionValue={options => options.name}
                                    
                                    />
                            </div>
                            
                            <input 
                                type="text" 
                                placeholder='Enter nickname'
                            />

                            <div className={styles.popUpMenuBtns}>
                                <button>Cancel</button>

                                <button type="submit" value="submit">Add</button>
                            </div>
                            
                        </div>

                        <button className={styles.addPokemonBtns} onClick={togglePopUp}>
                            <svg viewBox="0 0 128 128" style={{ enableBackground: 'new 0 0 128 128' }}>
                                <path style={{ fill: '#303030' }} d="M128 63.954c0 2.006-.797 3.821-2.136 5.127-1.308 1.337-3.125 2.133-5.166 2.133H71.302v49.356c0 4.012-3.284 7.292-7.302 7.292-2.009 0-3.827-.828-5.166-2.134-1.308-1.337-2.136-3.152-2.136-5.159V71.214H7.302c-4.05 0-7.302-3.248-7.302-7.26 0-2.006.797-3.853 2.136-5.159a7.279 7.279 0 0 1 5.166-2.134h49.395V7.306c0-4.012 3.284-7.26 7.302-7.26 2.009 0 3.827.828 5.166 2.133a7.238 7.238 0 0 1 2.136 5.127v49.356h49.395A7.276 7.276 0 0 1 128 63.954z"/>
                            </svg>
                        </button>

                        
                    </td>

                    <td> 
                    <div style={{display: showPopUp ? "flex" : "none"}} className={styles.popUpMenu}>
                            <div className={styles.selectWrapper}>
                                <Select 
                                    placeholder="Find Pokemon"
                                    formatOptionLabel={(pokemon) => {
                                        return ( 
                                        <div style={{ display: 'flex', alignItems: 'center'}}>
                                            <img src={pokemon.spriteUrl} alt={pokemon.name} style={{ width: 30, marginRight: 5 }}></img>
                                            <span>{pokemon.name}</span>

                                        </div>)
                                    
                                    }}
                                    options={pokemonInfo} 
                                    getOptionLabel={options => options.name}
                                    getOptionValue={options => options.name}
                                    
                                    />
                            </div>
                            
                            <input 
                                type="text" 
                                placeholder='Enter nickname'
                            />

                            <div className={styles.popUpMenuBtns}>
                                <button>Cancel</button>

                                <button type="submit" value="submit">Add</button>
                            </div>
                            
                        </div>

                        <button className={styles.addPokemonBtns} onClick={togglePopUp}>
                            <svg viewBox="0 0 128 128" style={{ enableBackground: 'new 0 0 128 128' }}>
                                <path style={{ fill: '#303030' }} d="M128 63.954c0 2.006-.797 3.821-2.136 5.127-1.308 1.337-3.125 2.133-5.166 2.133H71.302v49.356c0 4.012-3.284 7.292-7.302 7.292-2.009 0-3.827-.828-5.166-2.134-1.308-1.337-2.136-3.152-2.136-5.159V71.214H7.302c-4.05 0-7.302-3.248-7.302-7.26 0-2.006.797-3.853 2.136-5.159a7.279 7.279 0 0 1 5.166-2.134h49.395V7.306c0-4.012 3.284-7.26 7.302-7.26 2.009 0 3.827.828 5.166 2.133a7.238 7.238 0 0 1 2.136 5.127v49.356h49.395A7.276 7.276 0 0 1 128 63.954z"/>
                            </svg>
                        </button>
                    </td>

                    <td className={styles.textLeft}></td>
                </tr>
            </tbody>
        
        </table>

        </div>
        
       
    )
}