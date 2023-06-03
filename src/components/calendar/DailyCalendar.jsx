import { HourBlock } from './HourBlock'

import { CalendarEmptyState } from './CalendarEmptyState'

// import static data
import { days } from '../../utils/days'
import { months } from '../../utils/months'

// import styles
import calendarStyles from './Calendar.module.css'
import dailyStyles from './DailyCalendar.module.css'

export const DailyCalendar = ({ events }) => {
    const now = new Date()
    const day = now.getDay()
    const date = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()

    return (
        <>
            <div>
                <h1>Docket for {days[day]}, {`${date} ${months[month]} ${year}`}</h1>
            </div>
            <div className={calendarStyles.container}>
                {events.length === 0 && (
                    <CalendarEmptyState />
                )}
                {events.length !== 0 && (
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
                )}
            </div>
        </>
    )
}