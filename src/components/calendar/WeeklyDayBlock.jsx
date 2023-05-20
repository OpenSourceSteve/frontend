import styles from './WeeklyDayBlock.module.css'

import { days } from '../../utils/days'
import { months } from '../../utils/months'

export const WeeklyDayBlock = ({ date }) => {
    return (
        <div className={styles.dayBlock}>
            {`${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}
        </div>
    )
}