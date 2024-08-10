import styles from './Table.module.css'
import React, { useState, useEffect, useRef } from 'react';
import PokemonInfo from './PokemonData';
import Select from 'react-select';

export default function TableRow () {
    useEffect(()=>{
        PokemonInfo()
            .then((data) => {
                setPokemonInfo(data)
            })
    }, [])

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

    const [pokemonInfo, setPokemonInfo] = useState([]); 

    const [selectedPokemon, setSelectedPokemon] = useState({
        0: {name: '', pokemonTypes: '', spriteUrl: ''},
        1: {name: '', pokemonTypes: '', spriteUrl: ''}
    });

    // useEffect(() => {
    //     console.log('Selected Pokémon:', selectedPokemon);
    //   }, [selectedPokemon]);

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

    const handleAddButtonClick = (buttonIndex) => {
        if (selectedPokemon[buttonIndex]) {
            const spriteUrl = selectedPokemon[buttonIndex].spriteUrl;
            setButtonBackgroundImage(prevState => ({
                ...prevState,
                [buttonIndex]: spriteUrl
            }));
        }
    }

    const [buttonBackgroundImage, setButtonBackgroundImage] = useState({
        0: '',
        1: ''
    });

    function Player1PokemonSelect() {
        const input1Ref = useRef(null);
        const displayFirstName = () => {
            const input1Value = input1Ref.current.value;
            setplayer1Nickname (input1Value);
        };

        // useEffect(() => {
        //     console.log('Player1PokemonSelect mounted or updated', pokemonInfo);
        // }, [pokemonInfo]);
        
        return(
            <td className={styles.pokemonDisplay}>
                <div className={styles.popUpMenu} style={{ 
                    display: showPopUp[0] ? "flex" : "none", 
                    position: "absolute", 
                    bottom: "65px",
                    right: "-40px"
                }}>
                    <div className={styles.selectWrapper}>
                        <Select 
                            placeholder="Find Pokemon"
                            onChange={(selectedOption) => {handleSelectChange(0, selectedOption)}}
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
                            value={selectedPokemon[0] && pokemonInfo.find(pokemon => pokemon.name === selectedPokemon[0].name)}
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
        )
    }

    function Player2PokemonSelect () {
        const input2Ref = useRef(null);
        const displaySecondName = () => {
            const input2Value = input2Ref.current.value;
            setplayer2Nickname (input2Value);
        }
        return (
            <td className={styles.pokemonDisplay}> 
                <div className={styles.popUpMenu} style={{
                    display: showPopUp[1] ? "flex" : "none", 
                    position: "absolute", 
                    bottom: "65px", 
                    left: "-40px"
                }}>
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
                            value={selectedPokemon[1] && pokemonInfo.find(pokemon => pokemon.name === selectedPokemon[1].name)}
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
        )
    }

    return(
        <tr>
            <td>
                <input type="text" placeholder='e.g. route 101'></input>
            </td>
            <Player1PokemonSelect />
            <Player2PokemonSelect />

            <td className={styles.nicknames}>{player1Nickname} & {player2Nickname}</td>
        </tr>
)
    

}
