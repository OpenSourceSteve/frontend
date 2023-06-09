import { useEffect, useRef, useState } from "react"

import { useNavigate } from "react-router-dom"

import { useGetEventsQuery } from "./eventsSlice"

import { CreateEventInputModal } from './CreateEventInputModal'
import { UpdateEventInputModal } from './UpdateEventInputModal'

import { EventsEmptyState } from "./EventsEmptyState"

import { eventTypeOptions } from "../../app/eventTypeOptions"

import resourceStyles from '../resourceStyles.module.css'
import styles from './Events.module.css'

export const EventsTab = ({ caseInstance }) => {
    const navigate = useNavigate()

    const [eventId, setEventId] = useState(false)

    const createEventDialogRef = useRef(1)
    const updateEventDialogRef = useRef(2)

    const clientId = caseInstance._links.client.href.split("/users/")[1]
    const caseId = caseInstance._links.self.href.split("/cases/")[1]

    const {
        data: events,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetEventsQuery({ caseId })

    const keyDownHandler = ({ keyCode, target }, eventResourceId) => {
        if (keyCode === 13) {
            // const eventId = target.dataset['eventId']
            // navigate(`/cases/${caseId}?view=/events/${target.dataset['eventId']}`)
            openDialog("events", eventResourceId)
        }
    }

    const clickHandler = event => {
        event.preventDefault()
        setEventId(event.target.parentElement.dataset['eventId'])
    }

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
        else {
            if (!createEventDialogRef.current.open) {
                createEventDialogRef.current.showModal()
            }
        }
    }

    const closeDialog = mode => {
        if (mode === "create") {
            if (createEventDialogRef.current.open) {
                createEventDialogRef.current.close()
            }
        }
        if (mode === "update") {
            if (updateEventDialogRef.current.open) {
                updateEventDialogRef.current.close()
            }
        }
        setEventId(false)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }
    else if (isSuccess) {
        if (events.length === 0) {
            return (
                <>
                    <EventsEmptyState openDialog={openDialog} />
                    <CreateEventInputModal ref={createEventDialogRef}
                        caseInstance={caseId}
                        closeHandler={closeDialog}
                        clientId={clientId}
                        eventTypeOptions={eventTypeOptions}
                    />
                </>
            )
        }
        return (
            <>
                <div className={resourceStyles.fullpage}>
                    <button onClick={openDialog}>Create New Event</button>
                    <div className={resourceStyles.resourceList}>
                        <div className={styles.resourceListHeader}>
                            <div>Type</div>
                            <div>Date</div>
                            <div>Time</div>
                            <div>Duration (minutes)</div>
                            <div>Title</div>
                        </div>
                        <div className={resourceStyles.resourceListBody}>
                            {events.map(event => {
                                const startDatetime = new Date(event.startDatetime)
                                const startDate = startDatetime.toLocaleDateString()
                                const startTime = startDatetime.toLocaleTimeString()
                                const adjustedStartTime = startTime.split(":")[0] + ":" + startTime.split(":")[1] + " " + startTime.split(" ")[1]
                                return (
                                    <div key={event.id}
                                        tabIndex={0}
                                        className={resourceStyles.resourceListRow}
                                        data-event-id={event.id}
                                        onKeyDown={e => keyDownHandler(e, event.id)}
                                    >
                                        <a className={styles.resourceListRow}
                                            // onKeyDown={e => keyDownHandler(e, event)}
                                            data-event-id={event.id}
                                            onClick={clickHandler}
                                            href={`/cases/${caseId}?view=/events/${event.id}`}
                                        >
                                            <div>{eventTypeOptions[event.type - 1] || ""}</div>
                                            <div>{startDate}</div>
                                            <div>{adjustedStartTime}</div>
                                            <div>{event.duration || ""}</div>
                                            <div>{event.title || ""}</div>
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <CreateEventInputModal ref={createEventDialogRef}
                    caseInstance={caseId}
                    closeHandler={closeDialog}
                    clientId={clientId}
                    eventTypeOptions={eventTypeOptions}
                />
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
    else if (isError) {
        if (error.status === 403) {
            navigate("/login")
        }
        console.log(error)
        const { timestamp, status, error: errorError, message, path } = error.data
        const errorInfo = (
            <>
                <div>Timestamp: {timestamp}</div>
                <div>Status: {status}</div>
                <div>Error: {errorError}</div>
                <div>Message: {message}</div>
                <div>Path: {path}</div>
            </>
        )
        return (
            <>
                <div>This was an error retrieving charges.</div>
                {errorInfo}
            </>
        )
    }
}