import { eventTypeOptions } from "../../app/eventTypeOptions"

import eventBlockStyles from "./EventBlock.module.css"

export const EventBlock = ({event}) => {
    const startDatetime = new Date(event.startDatetime)
    const endDatetime = new Date(event.startDatetime)
    endDatetime.setTime(endDatetime.getTime() + 60000 * event.duration)
    const top = (+startDatetime.getMinutes()/60) * 100 + "px"
    return (
        <div className={eventBlockStyles.eventBlock} style={{top}}>
            <div>{eventTypeOptions[event.type - 1]}: {event.title}</div>
            <div>{startDatetime.toLocaleTimeString()} - {endDatetime.toLocaleTimeString()}</div>
        </div>
    )
}