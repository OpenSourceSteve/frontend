import { useEffect, useRef, useState } from "react"

import { HourBlock } from './HourBlock'
import { EventBlock } from './EventBlock'
import { CalendarEmptyState } from './CalendarEmptyState'

import { UpdateEventInputModal } from "../../features/events/UpdateEventInputModal"

// import static data
import { eventTypeOptions } from "../../app/eventTypeOptions"
import { hours } from '../../utils/hours'
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

    const [eventId, setEventId] = useState(false)
    const [caseId, setCaseId] = useState(0)
    const [clientId, setClientId] = useState(0)

    const updateEventDialogRef = useRef(2)

    useEffect(() => {
        if (eventId) {
            openDialog()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventId])

    const openDialog = () => {
        if (eventId) {
            if (!updateEventDialogRef.current.open) {
                updateEventDialogRef.current.showModal()
            }
        }
    }

    const closeDialog = mode => {
        if (mode === "update") {
            if (updateEventDialogRef.current.open) {
                updateEventDialogRef.current.close()
            }
        }
        setEventId(false)
    }

    const clickHandler = (eventResource) => {
        setCaseId(eventResource.caseInstance.id)
        setClientId(eventResource.caseInstance.client.id)
        setEventId(eventResource.id)
    }

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
                    {hours.map(hour => <HourBlock key={hour} time={hour} />)}
                    {events.map(event => {
                        return (
                            <EventBlock key={event.id} event={event} clickHandler={clickHandler}/>
                        )
                    })}
                </div>
            </div>
            {eventId && <UpdateEventInputModal ref={updateEventDialogRef}
                caseInstance={caseId}
                closeHandler={closeDialog}
                clientId={clientId}
                eventId={eventId}
                eventTypeOptions={eventTypeOptions}
            />}
        </>
    )
}