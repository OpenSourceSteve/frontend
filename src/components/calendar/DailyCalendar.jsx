import { HourBlock } from './HourBlock'

import { days } from '../../app/days'
import { months } from '../../app/months'

import styles from './Calendar.module.css'
import dailyStyles from './DailyCalendar.module.css'

export const DailyCalendar = () => {
    const now = new Date()
    const day = now.getDay()
    const date = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()

    return (
        <>
            <div className={styles.docketHeader}>
                <h1>Docket for {days[day]}, {`${date} ${months[month]} ${year}`}</h1>
            </div>
            <div className={styles.container}>
                <div className={dailyStyles.dailyCalendar}>
                    <HourBlock time={"9am"} />
                    <HourBlock time={"10am"} />
                    <HourBlock time={"11am"} />
                    <HourBlock time={"12pm"} />
                    <HourBlock time={"1pm"} />
                    <HourBlock time={"2pm"} />
                    <HourBlock time={"3pm"} />
                    <HourBlock time={"4pm"} />
                    <HourBlock time={"5pm"} />
                    <HourBlock time={"6pm"} />
                    <HourBlock time={"7pm"} />
                    <HourBlock time={"8pm"} />
                </div>
            </div>
        </>
    )
}