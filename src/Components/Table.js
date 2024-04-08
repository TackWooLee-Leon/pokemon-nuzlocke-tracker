import styles from './Table.module.css'
import React, { useState } from 'react';

export default function Table() {
    const [playerOneNameInput, setPlayerOneNameInput] = useState("");
    const [playerTwoNameInput, setPlayerTwoNameInput] = useState("");
    const [playerOneName, setPlayerOneName] = useState("");
    const [playerTwoName, setPlayerTwoName] = useState("");

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
                    <th>Nicknames</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>
                        <input type="text" name="Location" placeholder='e.g. route 101'></input>
                    </td>
                    <td>Pokemon 1</td>
                    <td>Pokemon 2</td>
                    <td>Nick & Rick</td>
                </tr>
            </tbody>
        
        </table>

        </div>
        
       
    )
}