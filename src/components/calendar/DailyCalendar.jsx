import { HourBlock } from './HourBlock'

import styles from './Calendar.module.css'
import dailyStyles from './DailyCalendar.module.css'

export const DailyCalendar = () => {
    return (
        <div className={styles.container}>
            <div className={dailyStyles.dailyCalendar}>
                <HourBlock time={"9am"}/>
                <HourBlock time={"10am"}/>
                <HourBlock time={"11am"}/>
                <HourBlock time={"12pm"}/>
                <HourBlock time={"1pm"}/>
                <HourBlock time={"2pm"}/>
                <HourBlock time={"3pm"}/>
                <HourBlock time={"4pm"}/>
                <HourBlock time={"5pm"}/>
                <HourBlock time={"6pm"}/>
                <HourBlock time={"7pm"}/>
                <HourBlock time={"8pm"}/>
            </div>
        </div>
    )
}