import { DailyCalendar } from './DailyCalendar'
import { MonthlyCalendar } from './MonthlyCalendar'
import { WeeklyCalendar} from './WeeklyCalendar'

export const Calendar = ({ view, events }) => {
    events = events || []

    if (view === "daily") {
        return <DailyCalendar events={events} />
    }
    if (view === "weekly") {
        return <WeeklyCalendar events={events} />
    }
    if (view === "monthly") {
        return <MonthlyCalendar events={events} />
    }
    throw new Error("No calendar specified")
}