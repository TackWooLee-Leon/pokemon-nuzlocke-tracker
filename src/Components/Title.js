import styles from './Title.module.css'
export default function Title (){
    return(
        <div className={styles.title}>
            <h1>
                Pokémon Gen 3 Soullocke Tracker
            </h1>
            <h2>
                Left table is your team, right table is your PC. You can drag and drop pairs between tables.
            </h2>
        </div>
    )
    
}