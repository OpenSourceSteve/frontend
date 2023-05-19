import { MonthlyDayBlock } from './MonthlyDayBlock'

import calendarStyles from './Calendar.module.css'
import monthlyStyles from './MonthlyCalendar.module.css'

export const MonthlyCalendar = () => {
    const today = new Date()

    const sunday = new Date(today);

    const days_to_sunday = today.getDay() % 7

    sunday.setDate(sunday.getDate() - days_to_sunday)

    const days = []

    for (let i = 0; i < 35; i++) {
        const date = new Date(sunday)
        date.setDate(sunday.getDate() + i)
        days.push(date)
    }



    return (
        <>
            <div>
                <h1>Monthly View</h1>
            </div>
            <div className={calendarStyles.container}>
                <div className={monthlyStyles.monthlyCalendar}>
                    {days.map((day, index) => <MonthlyDayBlock day={day} index={index} />)}
                </div>
            </div>
        </>
    )
}