import styles from './PokemonStorage.module.css'
import React, { useState, useEffect, useRef } from 'react'
import Select from 'react-select';


export default function PokemonStorage ({ 
    playerProps, 
    selectProps, 
    pokemonInfo, 
    handleLocationChange, 
    onDragStart,
    onDrop,
    onDragOver,
    draggable
    }) {
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

    const input1Ref = useRef(null);
    const input2Ref = useRef(null);

    function StoragePlayer1PokemonSelect() {
        

        return (
            <td className={styles.storagePokemonDisplay}> 
                <div className={styles.storagePopUpMenu} style={{
                    display: showPopUp[0] ? "flex" : "none", 
                    position: "absolute", 
                    bottom: "75px", 
                    left: "-80px"
                }}>
                <div className={styles.storageSelectWrapper}>
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

                <div className={styles.storagePopUpMenuBtns}>
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
                border: '1px solid #071452'
            }}
                onClick={() => {togglePopUp(0)}}>
            +</button>
        </td>
        )}

    function StoragePlayer2PokemonSelect() {
       


        return (
            <td className={styles.storagePokemonDisplay}> 
            <div className={styles.storagePopUpMenu} style={{
                display: showPopUp[1] ? "flex" : "none", 
                position: "absolute", 
                bottom: "75px", 
                left: "-80px"
            }}>
                <div className={styles.storageSelectWrapper}>
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

                <div className={styles.storagePopUpMenuBtns}>
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
                border: '1px solid #071452'
            }}
                onClick={() => {togglePopUp(1)}}>
            +</button>
        </td>
        )
    }

        return (
            <tr
                draggable={draggable}
                onDragStart={onDragStart}
                onDrop={onDrop}
                onDragOver={onDragOver}    
            >
                <td>
                    <input 
                        type="text" 
                        value={selectedPokemon.storage[player1Index].location}
                        onChange={(e) => handleLocationChange(player1Index, player2Index, 'storage', e)}
                        placeholder='e.g. route 101' 
                        style={{
                            border: '2px solid #071452',
                            width: '10rem',
                            marginLeft: '0.7rem',
                            fontSize: '0.9rem'
                    }}></input>
                </td>
                <StoragePlayer1PokemonSelect/>
                <StoragePlayer2PokemonSelect/>

                <td className={styles.storageNicknames}>{selectedPokemon.storage[player1Index].nickname} & {selectedPokemon.storage[player2Index].nickname}</td>
            </tr> 
            
        )
    };

   