import { MonthlyDayBlock } from './MonthlyDayBlock'

import { days } from '../../utils/days'

import monthlyStyles from './MonthlyCalendar.module.css'

export const MonthlyCalendar = () => {
    const today = new Date()

    const sunday = new Date(today);

    const days_to_sunday = today.getDay() % 7

    sunday.setDate(sunday.getDate() - days_to_sunday)

    const monthdays = []

    for (let i = 0; i < 35; i++) {
        const date = new Date(sunday)
        date.setDate(sunday.getDate() + i)
        monthdays.push(date)
    }



    return (
        <>
            <div>
                <h1>Monthly View</h1>
            </div>
            <div className={monthlyStyles.monthlyCalendarContainer}>
                <div className={monthlyStyles.monthlyCalendarHeader} >
                    {days.map(day => <div key={day}>{day}</div>)}
                </div>
                <div className={monthlyStyles.monthlyCalendar}>
                    {monthdays.map((day, index) => <MonthlyDayBlock key={index} day={day} index={index} />)}
                </div>
            </div>
        </>
    )
}