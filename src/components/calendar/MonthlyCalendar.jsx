import styles from './Calendar.module.css'
import monthlyStyles from './MonthlyCalendar.module.css'

export const MonthlyCalendar = () => {
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