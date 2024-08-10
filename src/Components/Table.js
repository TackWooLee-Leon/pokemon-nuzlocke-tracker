import styles from './Table.module.css'
import React, { useState, useEffect, useRef } from 'react';
// import PokemonInfo from './PokemonData';
// import Select from 'react-select';
import TableRow from './TableRow';

export default function Table() {
    const [player1NameInput, setplayer1NameInput] = useState("");
    const [player2NameInput, setplayer2NameInput] = useState("");
    const [player1Name, setplayer1Name] = useState("");
    const [player2Name, setplayer2Name] = useState("");


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

    const [rows, setRows] = useState([0]);
    const addRow =() => {
        setRows(prevRows => [...prevRows, prevRows.length]);
    };

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

                <button className={styles.addRow}onClick={addRow}>Add A New Pair</button>  
            </div>

            

            <table>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th className={styles.playersNameDisplay}>{player1Name}</th>
                        <th className={styles.playersNameDisplay}>{player2Name}</th>
                        <th className={styles.nicknames}>Nicknames</th>
                    </tr>
                </thead>
                    {rows.map(row => (
                            <TableRow key={row} />
                        ))}
                <tbody>

                </tbody>
                {/* <TableRow /> */}
            
        
            </table>

        </div>
        
       
    )
}