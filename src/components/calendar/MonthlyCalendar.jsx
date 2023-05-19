import styles from './Calendar.module.css'
import monthlyStyles from './MonthlyCalendar.module.css'

export const MonthlyCalendar = () => {
    const now = new Date()
    const day = now.getDay()
    const date = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()

    const days = []

    for (let i = 0; i < 35; i++) {
        days.push(i)
    }
    return (
        <div className={styles.container}>
            <div className={monthlyStyles.monthlyCalendar}>
                {days.map(day => <div>{day + 1}</div>)}
            </div>
        </div>
    )
}