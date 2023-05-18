import styles from "./HourBlock.module.css"

export const HourBlock = ({ time }) => {
    return <div className={styles.hourBlock}>{time}</div>
}