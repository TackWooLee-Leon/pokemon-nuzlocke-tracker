import styles from './Table.module.css'
import React, { useState } from 'react';
import PokemonInfo from './PokemonData';
import Select from 'react-select';
import { useEffect } from 'react';

export default function Table() {
    const [playerOneNameInput, setPlayerOneNameInput] = useState("");
    const [playerTwoNameInput, setPlayerTwoNameInput] = useState("");
    const [playerOneName, setPlayerOneName] = useState("");
    const [playerTwoName, setPlayerTwoName] = useState("");
    const [pokemonInfo, setPokemonInfo] = useState([])

    useEffect(()=>{
        PokemonInfo()
            .then((data) => {
                setPokemonInfo(data)
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
                    <td className={styles.pokemonDisplay}>
                        
                        <div className={styles.popupMenu}>
                            <Select options={pokemonInfo?.map((item) => {
                                console.log(item)
                                return {value: item.name, label: item.name}
                            })} />
                            {/* <form>
                                <input 
                                    type="text"
                                    placeholder='Search Pokemon'
                                />
                                <input 
                                    type="text"
                                    placeholder='Enter nicknames'
                                />
                            </form> */}

                            <div className={styles.popupMenuBtns}>
                                <button>Cancel</button>

                                <button type="submit" value="submit">Add</button>
                            </div>
                            
                        </div>

                        <button className={styles.addPokemonBtns}>
                            <svg viewBox="0 0 128 128" style={{ enableBackground: 'new 0 0 128 128' }}>
                                <path style={{ fill: '#303030' }} d="M128 63.954c0 2.006-.797 3.821-2.136 5.127-1.308 1.337-3.125 2.133-5.166 2.133H71.302v49.356c0 4.012-3.284 7.292-7.302 7.292-2.009 0-3.827-.828-5.166-2.134-1.308-1.337-2.136-3.152-2.136-5.159V71.214H7.302c-4.05 0-7.302-3.248-7.302-7.26 0-2.006.797-3.853 2.136-5.159a7.279 7.279 0 0 1 5.166-2.134h49.395V7.306c0-4.012 3.284-7.26 7.302-7.26 2.009 0 3.827.828 5.166 2.133a7.238 7.238 0 0 1 2.136 5.127v49.356h49.395A7.276 7.276 0 0 1 128 63.954z"/>
                            </svg>
                        </button>

                        
                    </td>

                    <td> 
                        <div className={styles.popupMenu}>
                            <input 
                                type="text"
                                placeholder='Search Pokemon'
                            />

                            <input 
                                type="text"
                                placeholder='Enter nicknames'
                            />

                            <div className={styles.popupMenuBtns}>
                                <button>Cancel</button>

                                <button>Add</button>
                            </div>
                        </div>

                        <button className={styles.addPokemonBtns}>
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