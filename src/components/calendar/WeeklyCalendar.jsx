import { WeeklyDayBlock } from './WeeklyDayBlock'

import { days } from '../../app/days'
import { months } from '../../app/months'

import calendarStyles from './Calendar.module.css'
import weeklyStyles from './WeeklyCalendar.module.css'

export const WeeklyCalendar = () => {
    const today = new Date()

    const sunday = new Date(today);

    const days_to_sunday = today.getDay() % 7

    sunday.setDate(sunday.getDate() - days_to_sunday)

    const datesOfWeek = []
    days.forEach((_, index) => {
        const date = new Date(sunday)
        date.setDate(sunday.getDate() + index)
        datesOfWeek.push(date)
    })

    return (
        <>
            <div>
                <h1>Week of {`${datesOfWeek[0].getDate()} ${months[datesOfWeek[0].getMonth()]} ${datesOfWeek[0].getFullYear()}`} to {`${datesOfWeek[6].getDate()} ${months[datesOfWeek[6].getMonth()]} ${datesOfWeek[6].getFullYear()}`}</h1>
            </div>
            <div className={calendarStyles.container}>
                <div className={weeklyStyles.weeklyCalendar}>
                    {days.map((_, index) => <WeeklyDayBlock key={index} date={datesOfWeek[index]}/>)}
                </div>
            </div>
        </>
    )
}