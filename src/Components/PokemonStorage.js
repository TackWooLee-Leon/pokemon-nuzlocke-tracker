import styles from './Table.module.css'
import React, { useState, useRef } from 'react'
import Select from 'react-select';


export default function PokemonStorage ({ playerProps, selectProps, pokemonInfo }) {
    const { player1Index, player2Index, selectedPokemon, setSelectedPokemon, buttonBackgroundImage, handleNicknameChange } = playerProps;
    const { handleSelectChange, handleAddButtonClick } = selectProps;
    const [showPopUp, setShowPopUp] = useState(Array(2).fill(false));

    function togglePopUp(index) {
        setShowPopUp((prevShowPopUp) => {
            const newShowPopUp = [...prevShowPopUp];
            newShowPopUp[index] = !newShowPopUp[index];
            return newShowPopUp
        });
    }
    

    const input1Ref = useRef(null);
    const input2Ref = useRef(null);

    function StoragePlayer1PokemonSelect() {
        

        return (
            <td className={styles.pokemonDisplay}> 
                <div className={styles.popUpMenu} style={{
                    display: showPopUp[0] ? "flex" : "none", 
                    position: "absolute", 
                    bottom: "65px", 
                    left: "-40px"
                }}>
                <div className={styles.selectWrapper}>
                    <Select 
                        placeholder="Find Pokemon"
                        onChange={(selectedOption) => {handleSelectChange(player1Index, selectedOption, 'storage')}}
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
                        value={selectedPokemon.storage[player1Index] && pokemonInfo.find(pokemon => pokemon.name === selectedPokemon.storage[player1Index].name)}
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
                    onClick={() => {togglePopUp(0); handleNicknameChange(player1Index, input1Ref.current.value, 'storage'); handleAddButtonClick(player1Index)}}>Add</button>
                </div>
            </div>

            <button style={{  
                backgroundImage: `url(${buttonBackgroundImage.storage[player1Index]})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: "4rem", 
                width: "4rem",
                borderRadius: '15px',
                border: 'none',
            }}
                onClick={() => {togglePopUp(0)}}>
            +</button>
        </td>
        )}

    function StoragePlayer2PokemonSelect() {
       


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
                        onChange={(selectedOption) => {handleSelectChange(player2Index, selectedOption, 'storage')}}
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
                        value={selectedPokemon.storage[player2Index] && pokemonInfo.find(pokemon => pokemon.name === selectedPokemon.storage[player2Index].name)}
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
                    onClick={() => {togglePopUp(1); handleNicknameChange(player2Index, input2Ref.current.value, 'storage'); handleAddButtonClick(player2Index)}}>Add</button>
                </div>
            </div>

            <button style={{  
                backgroundImage: `url(${buttonBackgroundImage.storage[player2Index]})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: "4rem", 
                width: "4rem",
                borderRadius: '15px',
                border: 'none',
            }}
                onClick={() => {togglePopUp(1)}}>
            +</button>
        </td>
        )
    }

        return (
            <tr>
                <td>
                    <input 
                        type="text" 
                        placeholder='e.g. route 101' 
                        style={{
                        fontSize: '0.9rem'
                    }}></input>
                </td>
                <StoragePlayer1PokemonSelect player1Index={0}/>
                <StoragePlayer2PokemonSelect player2Index={1}/>

                <td className={styles.nicknames}>{selectedPokemon.storage[player1Index].nickname} & {selectedPokemon.storage[player2Index].nickname}</td>
            </tr> 
            
        )
    };

   