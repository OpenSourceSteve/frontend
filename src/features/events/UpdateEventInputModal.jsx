import { forwardRef, useEffect, useState } from 'react'

import {
    useUpdateEventMutation, useGetEventQuery
} from "./eventsSlice"

import resourceStyles from '../resourceStyles.module.css'

export const UpdateEventInputModal = forwardRef(({ caseInstance, clientId, eventId, eventTypeOptions, closeHandler }, ref) => {
    const { data: eventData, isLoading, isSuccess: isLoadSuccess, isError: isLoadError, error: loadError } = useGetEventQuery(eventId)
    const [ updateEvent, {data: updatedEventData,
                          isFetching,
                          isUpdateSuccess,
                          isUpdateError,
                          error: updateError
    }] = useUpdateEventMutation()

    const eventTypeOptionsArray = eventTypeOptions.reduce((prev, curr, currIndex) => {
        prev.push({ name: curr, value: currIndex + 1 })
        return prev
    }, [])

    const formFields = [
        { name: "title", type: "text", label: "Title" },
        { name: "description", type: "text", label: "Description" },
        { name: "duration", type: "number", label: "Duration (minutes)" },
        { name: "location", type: "text", label: "Location" },
        { name: "link", type: "url", label: "Link" },
        { name: "phone", type: "text", label: "Phone" }
    ]

    const [eventState, setEventState] = useState({
        id: "",
        clientInstance: "",
        caseInstance: "",
        type: "",
        startDatetime: "",
        title: "",
        description: "",
        duration: "",
        location: "",
        link: "",
        phone: ""
    })

    useEffect(() => {
        setEventState({
            id: eventData?._links.self.href.split("/events/")[1] || "",
            clientId: clientId || "",
            caseInstance: caseInstance || "",
            type: eventData?.type || "",
            startDatetime: eventData?.startDatetime || "",
            title: eventData?.title || "",
            description: eventData?.description || "",
            duration: eventData?.duration || "",
            location: eventData?.location || "",
            link: eventData?.link || "",
            phone: eventData?.phone || ""
        })
    }, [eventData])

    const submitAndReset = () => {
        const updatedEvent = Object.assign({}, eventState)

        // Placate Postgres
        updatedEvent.startDatetime = updatedEvent.startDatetime.slice(0, 19).replace("T", " ")
        if (updatedEvent.startDatetime.length === 16) {
            updatedEvent.startDatetime += ":00"
        }
        updateEvent(updatedEvent)
        resetAndClose()
    }

    const resetAndClose = () => {
        closeHandler("update")
    }

    const changeHandler = ({ target }) => {
        const { checked, name, type, value } = target
        setEventState({
            ...eventState,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    let content

    if (isLoading) {
        content = <div>Loading...</div>
    } else if (isLoadSuccess) {
        content = (
            <>
                <div className={resourceStyles.body}>
                    <form method="dialog">
                        <div key="type" className={resourceStyles.labelledTextInput}>
                            <label htmlFor="type">Event Type</label>
                            <select id="type" name="type" onChange={changeHandler} value={eventState.type}>
                                <option key="default" value="">Please choose event type</option>
                                {eventTypeOptionsArray.map(option => <option key={option.value} value={option.value} >{option.name}</option>)}
                            </select>
                        </div>
                        <div key="startDateTime" className={resourceStyles.labelledTextInput}>
                                        <label htmlFor="startDatetime">Date and Time</label>
                                        <input type="datetime-local"
                                            name="startDatetime"
                                            id="startDatetime"
                                            value={eventState.startDatetime.slice(0,16)}
                                            onChange={changeHandler} />
                                    </div>
                        {formFields.map(field => {
                            return (
                                (
                                    <div key={field.name} className={resourceStyles.labelledTextInput}>
                                        <label htmlFor={field.name}>{field.label}</label>
                                        <input type={field.type}
                                            name={field.name}
                                            id={field.name}
                                            value={eventState[field.name]}
                                            onChange={changeHandler} />
                                    </div>
                                )
                            )
                        })}
                    </form>
                </div>
                <div className={resourceStyles.footer}>
                    <button type="button" onClick={submitAndReset} >Update Event</button>
                    <button type="button" onClick={() => closeHandler("update")} >Cancel</button>
                </div>
            </>
        )
    } else if (isLoadError) {
        content = <div>There was an error retrieving event data.</div>
    }

    return (
        <dialog ref={ref} className={resourceStyles.modal}>
            <div className={resourceStyles.header}>
                <div className={resourceStyles.headerTitle}>Update Event</div>
                <button className={resourceStyles.headerCloseButton}
                    onClick={() => closeHandler("update")}
                >X</button>
            </div>
            {content}
        </dialog>
    )
})