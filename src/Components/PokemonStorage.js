// import styles from './Table.module.css'

// export default function PokemonStorage () {

//     <td className={styles.pokemonDisplay}> 
//         <div className={styles.popUpMenu} style={{
//             display: showPopUp[1] ? "flex" : "none", 
//             position: "absolute", 
//             bottom: "65px", 
//             left: "-40px"
//         }}>
//             <div className={styles.selectWrapper}>
//                 <Select 
//                     placeholder="Find Pokemon"
//                     onChange={(selectedOption) => {handleSelectChange(player2Index, selectedOption)}}
//                     formatOptionLabel={(pokemon) => {
//                         return ( 
//                             <div style={{ display: 'flex', alignItems: 'center'}}>
//                                 <img src={pokemon.spriteUrl} alt={pokemon.name} style={{ width: 50, marginRight: 5 }}></img>
//                                 <span>{pokemon.name}</span>
//                             </div>)
//                     }}
//                     options={pokemonInfo} 
//                     getOptionLabel={options => options.name}
//                     getOptionValue={options => options.name}
//                     value={selectedPokemon[player2Index] && pokemonInfo.find(pokemon => pokemon.name === selectedPokemon[player2Index].name)}
//                     />
//             </div>
//             <input 
//                 type="text" 
//                 placeholder='Enter nickname'
//                 ref={input2Ref}
//             />

//             <div className={styles.popUpMenuBtns}>
//                 <button onClick={() => {togglePopUp(1)}}>Cancel</button>
//                 <button 
//                 onClick={() => {togglePopUp(1); displaySecondName(); handleAddButtonClick(player2Index); checkForDuplicatingTypes()}}>Add</button>
//             </div>
//         </div>

//         <button style={{  
//             backgroundImage: `url(${buttonBackgroundImage[player2Index]})`,
//             backgroundSize: 'cover',
//             backgroundRepeat: 'no-repeat',
//             height: "4rem", 
//             width: "4rem",
//             borderRadius: '15px',
//             border: 'none',
//         }}
//             onClick={() => {togglePopUp(1)}}>
//         +</button>
//     </td>
// }
