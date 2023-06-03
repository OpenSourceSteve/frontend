import { forwardRef, useState } from 'react'

import { useCreateEventMutation } from "./eventsSlice"

import resourceStyles from '../resourceStyles.module.css'

export const EventInputModal = forwardRef(({ caseInstance, client, closeHandler, event, eventOptions }, ref) => {
    event = event || {}

    const [createEvent, { isError: isCreateError }] = useCreateEventMutation()

    const [eventState, setEventState] = useState({
        client,
        caseInstance,
        type: "",
        startDatetime: new Date(),
        duration: 0,
        location: "",
        link: "",
        phone: "",
        title: "",
        description: ""
    })

    const resetEventState = () => {
        setEventState({
            client,
            caseInstance,
            type: "",
            startDatetime: new Date(),
            duration: 0,
            location: "",
            link: "",
            phone: "",
            title: "",
            description: ""
        })
    }

    const eventOptionsArray = eventOptions.reduce((prev, curr, currIndex) => {
        prev.push({ name: curr, value: currIndex })
        return prev
    }, [])

    const formFields = [
        { name: "startDatetime", type: "datetime-local", label: "Date and Time"},
        { name: "title", type: "text", label: "Title" },
        { name: "description", type: "text", label: "Description" },
        { name: "duration", type: "number", label: "Duration (minutes)" },
        { name: "location", type: "text", label: "Location" },
        { name: "link", type: "url", label: "Link" },
        { name: "phone", type: "text", label: "Phone" }
    ]

    const submitAndReset = () => {
        const newEvent = Object.assign({}, eventState)
        // Placate Postgres
        newEvent.startDatetime = newEvent.startDatetime.slice(0,19).replace("T", " ") + ":00"
        createEvent(newEvent)
        resetAndClose()
    }

    const resetAndClose = () => {
        resetEventState()
        closeHandler("events")
    }

    const changeHandler = ({ target }) => {
        const { checked, name, type, value } = target
        setEventState({
            ...eventState,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    return (
        <dialog ref={ref} className={resourceStyles.modal}>
            <div className={resourceStyles.header}>
                <div className={resourceStyles.headerTitle}>Create New Event</div>
                <button className={resourceStyles.headerCloseButton}
                    onClick={resetAndClose}
                >X</button>
            </div>
            <div className={resourceStyles.body}>
                <form method="dialog">
                    <div key="type" className={resourceStyles.labelledTextInput}>
                        <label htmlFor="type">Event Type</label>
                        <select id="type" name="type" onChange={changeHandler} value={eventState.type}>
                            <option key="default" value="">Please choose event type</option>
                            {eventOptionsArray.map(option => <option key={option.value} value={option.value}>{option.name}</option>)}
                        </select>
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
                <button type="button" onClick={submitAndReset}>{event._links ? "Update Event" : "Add Event"}</button>
                <button type="button" onClick={resetAndClose}>Cancel</button>
            </div>
        </dialog>
    )
})