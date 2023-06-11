import { forwardRef, useRef, useState } from 'react'

import {
    useCreateEventMutation
} from "./eventsSlice"

import resourceStyles from '../resourceStyles.module.css'
import { ClientSelector } from '../clients/ClientSelector'
import { CaseSelector } from '../cases/CaseSelector'

export const SelectClientCreateEventInputModal = forwardRef(({ closeHandler, eventTypeOptions }, ref) => {
    const timeoutRef = useRef(0)
    const debounced = useRef(false)

    const [createEvent, { isError: isCreateError }] = useCreateEventMutation()

    const eventTypeOptionsArray = eventTypeOptions.reduce((prev, curr, currIndex) => {
        prev.push({ name: curr, value: currIndex + 1 })
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
        clientId: "",
        clientName: "",
        caseInstance: "",
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
        closeHandler("create")
        eventState.startDatetime = eventState.startDatetime.replace("T", " ") + ":00"
        createEvent(eventState)
        reset()
    }

    const reset = () => {
        setEventState({
            clientId: "",
            clientName: "",
            caseInstance: "",
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
        const { name, value } = target
        setEventState({
            ...eventState,
            [name]: value
        })
        if (name === "clientName") {
            clearTimeout(timeoutRef)
            debounced.current = false
            timeoutRef.current = setTimeout(() => {
                debounced.current = true
            }, 600)
        }
    }

    const clientHandler = (client) => {
        setEventState({
            ...eventState,
            clientId: client.id,
            clientName: client.firstName + " " + client.lastName
        })
    }

    const caseHandler = (caseInstance) => {
        setEventState({
            ...eventState,
            caseInstance: caseInstance.id,
            caseNumber: caseInstance.caseNumber
        })
    }

    return (
        <dialog ref={ref} className={resourceStyles.modal}>
            <div className={resourceStyles.header}>
                <div className={resourceStyles.headerTitle}>Create New Event</div>
                <button className={resourceStyles.headerCloseButton}
                    onClick={() => closeHandler("create")}
                >X</button>
            </div>
            <div className={resourceStyles.body}>
                <form method="dialog">
                    <ClientSelector
                        clientId={eventState.clientId}
                        clientName={eventState.clientName}
                        changeHandler={changeHandler}
                        clientHandler={clientHandler}
                        debounced={debounced}
                    />
                    {eventState.clientId && (
                        <CaseSelector clientId={eventState.clientId}
                                      caseInstance={eventState.caseInstance}
                                      caseName={eventState.caseName}
                                      caseHandler={caseHandler}
                        />
                    )}
                    {eventState.caseInstance && (
                        <>
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
                        </>
                    )}
                </form>
            </div>
            <div className={resourceStyles.footer}>
                <button type="button" onClick={submitAndReset} >Add Event</button>
                <button type="button" onClick={() => closeHandler("create")} >Cancel</button>
            </div>
        </dialog>
    )
})