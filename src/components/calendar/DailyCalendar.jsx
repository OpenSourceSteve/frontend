import { HourBlock } from './HourBlock'
import { EventBlock } from './EventBlock'
import { CalendarEmptyState } from './CalendarEmptyState'

// import static data
import { eventTypeOptions } from "../../app/eventTypeOptions"
import { hours } from '../../utils/hours'
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
                <h2>You have {events.length} events today.</h2>
            </div>
            <div className={calendarStyles.container}>
                {events.length === 0 && (
                    <CalendarEmptyState />
                )}
                <div className={dailyStyles.dailyCalendar}>
                    {hours.map(hour => <HourBlock key={hour} time={hour} />)}
                    {events.map(event => {
                    return (
                        <EventBlock key={event.id} event={event} />
                    )
                })}
                </div>
            </div>
        </>
    )
}