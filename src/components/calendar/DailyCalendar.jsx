import { HourBlock } from './HourBlock'
import { EventBlock } from './EventBlock'
import { CalendarEmptyState } from './CalendarEmptyState'

// import static data
import { eventTypeOptions } from "../../app/eventTypeOptions"
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
                    <HourBlock time={"9am"} >
                        <EventBlock event={events[0]} />
                    </HourBlock>
                    <HourBlock time={"10am"} >
                        <EventBlock event={events[1]} />
                    </HourBlock>
                    <HourBlock time={"11am"} ></HourBlock>
                    <HourBlock time={"12pm"}></HourBlock>
                    <HourBlock time={"1pm"} ></HourBlock>
                    <HourBlock time={"2pm"} ></HourBlock>
                    <HourBlock time={"3pm"} ></HourBlock>
                    <HourBlock time={"4pm"} ></HourBlock>
                    <HourBlock time={"5pm"} ></HourBlock>
                    <HourBlock time={"6pm"} ></HourBlock>
                    <HourBlock time={"7pm"} ></HourBlock>
                    <HourBlock time={"8pm"} ></HourBlock>
                </div>
            </div>
        </>
    )
}