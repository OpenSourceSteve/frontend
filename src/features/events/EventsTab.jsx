import { useNavigate } from "react-router-dom"

import { useGetEventsQuery } from "./eventsSlice"

import resourceStyles from '../resourceStyles.module.css'
import styles from './Events.module.css'

export const EventsTab = ({ eventOptions }) => {
    const navigate = useNavigate()

    const {
        data: events,
        isLoading,
        isSuccess,
        isError: isLoadError,
        error
    } = useGetEventsQuery()

    if (isSuccess) {
        return (
            <div className={resourceStyles.fullpage}>
                <div className={resourceStyles.resourceList}>
                    {events.length === 0 && <div>No events to show.</div>}
                    {events.length > 0 && (
                        <div className={styles.resourceListHeader}>
                            <div>Type</div>
                            <div>Date</div>
                            <div>Time</div>
                            <div>Duration (minutes)</div>
                            <div>Title</div>
                        </div>
                    )}
                    {events?.map(event => {
                        const startDatetime = new Date(event.startDatetime)
                        const startDate = startDatetime.toLocaleDateString()
                        const startTime = startDatetime.toLocaleTimeString()
                        return (
                            <div key={event.id} className={resourceStyles.resourceListRow}>
                                <a className={styles.resourceListRow}>
                                    <div>{eventOptions[event.type] || ""}</div>
                                    <div>{startDate}</div>
                                    <div>{startTime}</div>
                                    <div>{event.duration || ""}</div>
                                    <div>{event.title || ""}</div>
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
    else if (isLoadError) {
        if (error.status === 403) {
            navigate("/login")
        }
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