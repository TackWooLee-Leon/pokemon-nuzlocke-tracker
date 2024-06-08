import styles from './Table.module.css'
import React, { useState, useEffect, useRef } from 'react';
import PokemonInfo from './PokemonData';
import Select from 'react-select';

export default function Table() {
    const [playerOneNameInput, setPlayerOneNameInput] = useState("");
    const [playerTwoNameInput, setPlayerTwoNameInput] = useState("");
    const [playerOneName, setPlayerOneName] = useState("");
    const [playerTwoName, setPlayerTwoName] = useState("");
    const [pokemonInfo, setPokemonInfo] = useState([]);
    const [showPopUp, setShowPopUp] = useState(Array(2).fill(false));
    const [content, setContent] = useState("&");
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);

    // toggle popUpMenu individually
    function togglePopUp(index) {
        setShowPopUp((prevShowPopUp) => {
            const newShowPopUp = [...prevShowPopUp];
            newShowPopUp[index] = !newShowPopUp[index];
            return newShowPopUp
        });
    };


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

    const displayFirstName = () => {
        const input1Value = input1Ref.current.value;
        setContent(input1Value + " " + content);
    };

    const displaySecondName = () => {
        const input2Value = input2Ref.current.value;
        setContent(content + " " + input2Value);
    }

    return(
        <div>
            <div className={styles.playersNameInput}>
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
                        <th className={styles.playersNameDisplay}>{playerOneName}</th>
                        <th className={styles.playersNameDisplay}>{playerTwoName}</th>
                        <th className={styles.nicknames}>Nicknames</th>
                    </tr>
                </thead>
                
            <tbody>
                <tr>
                    <td>
                        <input type="text" placeholder='e.g. route 101'></input>
                    </td>

                    <td className={styles.pokemonDisplay}>
                        <div className={styles.popUpMenu} style={{ display: showPopUp[0] ? "flex" : "none", position: "absolute", top: "41%", left: "35%"}}>
                            <div className={styles.selectWrapper}>
                                <Select 
                                    placeholder="Find Pokemon"
                                    formatOptionLabel={(pokemon) => {
                                        return ( 
                                        <div style={{ display: "flex", alignItems: "center"}}>
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
                                ref={input1Ref}
                            />

                            <div className={styles.popUpMenuBtns}>
                                <button onClick={() => {togglePopUp(0)}}>Cancel</button>

                                <button onClick={() => {togglePopUp(0); displayFirstName()}}>Add</button>
                                
                            </div>
                            
                        </div>
                                    
                        <button className={styles.addPokemonBtns} onClick={() => {togglePopUp(0)}}>
                            <svg viewBox="0 0 128 128" style={{ enableBackground: 'new 0 0 128 128' }}>
                                <path style={{ fill: '#303030' }} d="M128 63.954c0 2.006-.797 3.821-2.136 5.127-1.308 1.337-3.125 2.133-5.166 2.133H71.302v49.356c0 4.012-3.284 7.292-7.302 7.292-2.009 0-3.827-.828-5.166-2.134-1.308-1.337-2.136-3.152-2.136-5.159V71.214H7.302c-4.05 0-7.302-3.248-7.302-7.26 0-2.006.797-3.853 2.136-5.159a7.279 7.279 0 0 1 5.166-2.134h49.395V7.306c0-4.012 3.284-7.26 7.302-7.26 2.009 0 3.827.828 5.166 2.133a7.238 7.238 0 0 1 2.136 5.127v49.356h49.395A7.276 7.276 0 0 1 128 63.954z"/>
                            </svg>
                        </button>
                    </td>

                    <td className={styles.pokemonDisplay}> 
                        <div className={styles.popUpMenu} style={{display: showPopUp[1] ? "flex" : "none", position: "absolute", top: "41%", left: "47%"}}>
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
                                ref={input2Ref}
                            />

                            <div className={styles.popUpMenuBtns}>
                                <button onClick={() => {togglePopUp(1)}}>Cancel</button>

                                <button onClick={() => {togglePopUp(1); displaySecondName()}}>Add</button>
                            </div>
                            
                        </div>

                        <button className={styles.addPokemonBtns} onClick={() => {togglePopUp(1)}}>
                            <svg viewBox="0 0 128 128" style={{ enableBackground: 'new 0 0 128 128' }}>
                                <path style={{ fill: '#303030' }} d="M128 63.954c0 2.006-.797 3.821-2.136 5.127-1.308 1.337-3.125 2.133-5.166 2.133H71.302v49.356c0 4.012-3.284 7.292-7.302 7.292-2.009 0-3.827-.828-5.166-2.134-1.308-1.337-2.136-3.152-2.136-5.159V71.214H7.302c-4.05 0-7.302-3.248-7.302-7.26 0-2.006.797-3.853 2.136-5.159a7.279 7.279 0 0 1 5.166-2.134h49.395V7.306c0-4.012 3.284-7.26 7.302-7.26 2.009 0 3.827.828 5.166 2.133a7.238 7.238 0 0 1 2.136 5.127v49.356h49.395A7.276 7.276 0 0 1 128 63.954z"/>
                            </svg>
                        </button>
                    </td>

                    <td className={styles.nicknames}>{content}</td>
                </tr>
            </tbody>
        
        </table>

        </div>
        
       
    )
}