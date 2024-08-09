import styles from './Table.module.css'
import React, { useState, useEffect, useRef } from 'react';
import PokemonInfo from './PokemonData';
import Select from 'react-select';

export default function Table() {
    const [player1NameInput, setplayer1NameInput] = useState("");
    const [player2NameInput, setplayer2NameInput] = useState("");
    const [player1Name, setplayer1Name] = useState("");
    const [player2Name, setplayer2Name] = useState("");
    const [pokemonInfo, setPokemonInfo] = useState([]);
    const [showPopUp, setShowPopUp] = useState(Array(2).fill(false));
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const [player1Nickname, setplayer1Nickname] = useState("")
    const [player2Nickname, setplayer2Nickname] = useState("")
    const [buttonBackgroundImage, setButtonBackgroundImage] = useState({
        0: '',
        1: ''
    });
    const [selectedPokemon, setSelectedPokemon] = useState({
        0: {name: '', pokemonTypes: '', spriteUrl: ''},
        1: {name: '', pokemonTypes: '', spriteUrl: ''}
    });

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
                // console.log(pokemonInfo)
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

    const displayFirstName = () => {
        const input1Value = input1Ref.current.value;
        setplayer1Nickname (input1Value);
    };

    const displaySecondName = () => {
        const input2Value = input2Ref.current.value;
        setplayer2Nickname (input2Value);
    }

    // optionIndex works as key aka where is the selected Pokemon coming from (player 1 or 2)
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

    useEffect(() => {
        console.log(selectedPokemon);
    }, [selectedPokemon]);

    const handleAddButtonClick = (buttonIndex) => {
        if (selectedPokemon[buttonIndex]) {
            const spriteUrl = selectedPokemon[buttonIndex].spriteUrl;
            setButtonBackgroundImage(prevState => ({
                ...prevState,
                [buttonIndex]: spriteUrl
            }));

        }
    }

    useEffect(() => {
        console.log(buttonBackgroundImage);
    }, [buttonBackgroundImage]);

    return(
        <div>
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

            {/* table to display players' data */}
            <table>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th className={styles.playersNameDisplay}>{player1Name}</th>
                        <th className={styles.playersNameDisplay}>{player2Name}</th>
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
                                    onChange={(selectedOption) => {handleSelectChange(0, selectedOption)}}
                                    formatOptionLabel={(pokemon) => {
                                        return ( 
                                        <div style={{ display: "flex", alignItems: "center"}}>
                                            <img src={pokemon.spriteUrl} alt={pokemon.name} style={{ width: 50, marginRight: 5 }}></img>
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

                                <button 
                                onClick={() => {togglePopUp(0); displayFirstName(); handleAddButtonClick(0)}}>Add</button>
                                
                            </div>
                            
                        </div>
                                    
                        
                        <button style={{  
                            backgroundImage: `url(${buttonBackgroundImage[0]})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            height: "3rem", 
                            width: "3rem",
                            borderRadius: '15px',
                            border: 'none',
                        }}
                            onClick={() => {togglePopUp(0)}}>
                           
                        +</button>
                    </td>

                    <td className={styles.pokemonDisplay}> 
                        <div className={styles.popUpMenu} style={{display: showPopUp[1] ? "flex" : "none", position: "absolute", top: "41%", left: "47%"}}>
                            <div className={styles.selectWrapper}>
                                <Select 
                                    placeholder="Find Pokemon"
                                    onChange={(selectedOption) => {handleSelectChange(1, selectedOption)}}
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
                                    
                                    />
                            </div>
                            
                            <input 
                                type="text" 
                                placeholder='Enter nickname'
                                ref={input2Ref}
                            />

                            <div className={styles.popUpMenuBtns}>
                                <button onClick={() => {togglePopUp(1)}}>Cancel</button>

                                <button 
                                onClick={() => {togglePopUp(1); displaySecondName(); handleAddButtonClick(1)}}>Add</button>
                            </div>
                            
                        </div>

                        <button style={{  
                            backgroundImage: `url(${buttonBackgroundImage[1]})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            height: "3rem", 
                            width: "3rem",
                            borderRadius: '15px',
                            border: 'none',
                        }}
                            onClick={() => {togglePopUp(1)}}>
                           
                        +</button>
                    </td>

                    <td className={styles.nicknames}>{player1Nickname} & {player2Nickname}</td>
                </tr>
            </tbody>
        
        </table>

        </div>
        
       
    )
}