import { forwardRef, useState } from 'react'

import {
    useCreateEventMutation
} from "./eventsSlice"

import resourceStyles from '../resourceStyles.module.css'

export const CreateEventInputModal = forwardRef(({ caseInstance, clientId, closeHandler, eventTypeOptions }, ref) => {
    const [createEvent, { isError: isCreateError }] = useCreateEventMutation()

    const eventTypeOptionsArray = eventTypeOptions.reduce((prev, curr, currIndex) => {
        prev.push({ name: curr, value: currIndex + 1})
        return prev
    }, [])

    const formFields = [
        { name: "startDatetime", type: "datetime-local", label: "Date and Time", required: true },
        { name: "title", type: "text", label: "Title", required: true },
        { name: "description", type: "text", label: "Description" },
        { name: "duration", type: "number", label: "Duration (minutes)" },
        { name: "location", type: "text", label: "Location" },
        { name: "link", type: "url", label: "Link" },
        { name: "phone", type: "text", label: "Phone" }
    ]

    const [eventState, setEventState] = useState({
        clientId: clientId,
        caseInstance: caseInstance,
        startDatetime: "",
        title: "",
        description: "",
        duration: 0,
        location: "",
        link: "",
        phone: "",
        type: ""
    })

    const submitAndReset = () => {
        const newEvent = Object.assign({}, eventState)
        // Placate Postgres
        newEvent.startDatetime = newEvent.startDatetime.slice(0, 19).replace("T", " ") + ":00"
        createEvent(newEvent)
        resetAndClose()
    }

    const resetAndClose = () => {
        closeHandler("create")
        setEventState({
            clientId: clientId,
            caseInstance: caseInstance,
            startDatetime: "",
            title: "",
            description: "",
            duration: 0,
            location: "",
            link: "",
            phone: "",
            type: ""
        })
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
                    // onClick={resetAndClose}
                >X</button>
            </div>
            <div className={resourceStyles.body}>
                <form method="dialog">
                    <div key="type" className={resourceStyles.labelledTextInput}>
                        <label htmlFor="type">Event Type</label>
                        <select id="type" name="type" onChange={changeHandler} value={eventState.type}>
                            <option key="default" value="">Please choose event type</option>
                            {eventTypeOptionsArray.map(option => <option key={option.value} value={option.value}>{option.name}</option>)}
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
                                        onChange={changeHandler}
                                    />
                                </div>
                            )
                        )
                    })}
                </form>
            </div>
            <div className={resourceStyles.footer}>
                <button type="button" onClick={submitAndReset} >Add Event</button>
                <button type="button" /* onClick={resetAndClose} */>Cancel</button>
            </div>
        </dialog>
    )
})