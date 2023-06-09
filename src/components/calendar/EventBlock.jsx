import { eventTypeOptions } from "../../app/eventTypeOptions"

import eventBlockStyles from "./EventBlock.module.css"

export const EventBlock = ({ event, clickHandler }) => {
    const startDatetime = new Date(event.startDatetime)
    const endDatetime = new Date(event.startDatetime)
    endDatetime.setTime(endDatetime.getTime() + 60000 * event.duration)
    const top = (+startDatetime.getHours() * 100) + ((+startDatetime.getMinutes() / 60) * 100) + 15
    const height = ((event.duration / 60) * 100) - 22
    return (
        <div className={eventBlockStyles.eventBlock}
            onClick={() => clickHandler(event)}
            style={{ top: top + "px", height: height + "px", left: "40px" }}
        >
            <div>{eventTypeOptions[event.type - 1]}: {event.title}</div>
            <div>{startDatetime.toLocaleTimeString()} - {endDatetime.toLocaleTimeString()}</div>
        </div>
    )
}