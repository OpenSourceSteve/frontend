import styles from "./HourBlock.module.css"

export const HourBlock = ({ children, time }) => {
    return <div className={styles.hourBlock}>
        <div className={styles.hourColumn}>{time}</div>
        <div className={styles.eventsColumn}>{children}</div>
    </div>
}