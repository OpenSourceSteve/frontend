import styles from './DayBlock.module.css'

export const DayBlock = ({ day }) => {
    return <div className={styles.dayBlock}>{day}</div>
}