import { DayBlock } from './DayBlock'

import styles from './Calendar.module.css'
import weeklyStyles from './WeeklyCalendar.module.css'

export const WeeklyCalendar = () => {
    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
    ]
    return (
        <div className={styles.container}>
            <div className={weeklyStyles.weeklyCalendar}>
                {days.map(day => <DayBlock day={day} />)}
            </div>
        </div>
    )
}