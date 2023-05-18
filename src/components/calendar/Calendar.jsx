import { DailyCalendar } from './DailyCalendar'
import { MonthlyCalendar } from './MonthlyCalendar'
import { WeeklyCalendar} from './WeeklyCalendar'

export const Calendar = ({ view }) => {
    if (view === "daily") {
        return <DailyCalendar />
    }
    if (view === "weekly") {
        return <WeeklyCalendar />
    }
    if (view === "monthly") {
        return <MonthlyCalendar />
    }
    throw new Error("No calendar specified")
}