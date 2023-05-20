import { months } from '../../utils/months'

import monthlyStyles from './MonthlyCalendar.module.css'

export const MonthlyDayBlock = ({ day, index }) => {
    const today = new Date()

    let content

    if (index === 0 || day.getDate() === 1) {
        content = `${months[day.getMonth()]} ${day.getDate()}`
    }
    else {
        content = `${day.getDate()}`
    }

    if (day.getUTCDate() === today.getUTCDate()) {
        return (
            <div className={monthlyStyles.outerDayBlock} key={day.getUTCDate()}>
                <div className={monthlyStyles.today}>{content}</div>
            </div>
        )
    }
    return (
        <div className={monthlyStyles.outerDayBlock} key={day.getUTCDate()}>
            <div className={monthlyStyles.notToday}>{content}</div>
        </div>
    )
}