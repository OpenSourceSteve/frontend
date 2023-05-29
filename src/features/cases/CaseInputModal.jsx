import { forwardRef, useRef, useState } from 'react'

import { CaseClient } from './CaseClient'

import resourceStyles from '../resourceStyles.module.css'

export const CaseInputModal = forwardRef(({ caseInstance, closeHandler, submitHandler }, ref) => {
    caseInstance = caseInstance || {}

    console.log(caseInstance)

    const timeoutRef = useRef(0)
    const debounced = useRef(false)

    const formFields = [
        { type: "text", name: "caseNumber", label: "Case Number" },
        { type: "text", name: "jurisdiction", label: "Jurisdiction" },
        { type: "text", name: "court", label: "Court" },
        { type: "text", name: "judge", label: "Judge" },
        { type: "text", name: "prosecutor", label: "Prosecutor" }
    ]

    const [caseState, setCaseState] = useState({
        id: caseInstance._links?.self.href.split("/cases/")[1] || "",
        caseNumber: caseInstance.caseNumber || "",
        clientId: caseInstance._links?.client.href.split("/users/")[1] || "",
        clientFirstName: caseInstance.clientFirstName || "",
        clientLastName: caseInstance.clientLastName || "",
        clientName: caseInstance.clientName || "",
        jurisdiction: caseInstance.jurisdiction || "",
        court: caseInstance.court || "",
        judge: caseInstance.judge || "",
        prosecutor: caseInstance.prosecutor || ""
    })

    const resetCaseState = () => {
        setCaseState({
            id: caseInstance._links?.self.href.split("/cases/")[1] || "",
            caseNumber: caseInstance.caseNumber || "",
            clientId: caseInstance._links?.client.href.split("/users/")[1] || "",
            clientFirstName: caseInstance.clientFirstName || "",
            clientLastName: caseInstance.clientLastName || "",
            clientName: caseInstance.clientName || "",
            jurisdiction: caseInstance.jurisdiction || "",
            court: caseInstance.court || "",
            judge: caseInstance.judge || "",
            prosecutor: caseInstance.prosecutor || ""
        })
    }

    const clientHandler = (client) => {
        setCaseState({
            ...caseState,
            clientId: client.id,
            clientFirstName: client.firstName,
            clientLastName: client.lastName
        })
    }

    const changeHandler = ({ target }) => {
        const { name, value } = target
        setCaseState({
            ...caseState,
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

    const submitCloseReset = () => {
        submitHandler(caseState)
        resetAndClose()
    }

    const resetAndClose = () => {
        resetCaseState()
        closeHandler()
    }

    return (
        <dialog ref={ref} className={resourceStyles.modal}>
            <div className={resourceStyles.header}>
                <div className={resourceStyles.headerTitle}>Add New Client</div>
                <button className={resourceStyles.headerCloseButton}
                    onClick={resetAndClose}
                >X</button>
            </div>
            <div className={resourceStyles.body}>
                <form method="dialog">
                    <CaseClient clientId={caseState.clientId}
                                clientName={caseState.clientName}
                                clientHandler={clientHandler}
                                changeHandler={changeHandler}
                                debounced={debounced}
                    />
                    {formFields.map(field => {
                        if (field.label) {
                            return (
                                <div key={field.name} className={resourceStyles.labelledTextInput}>
                                    <label htmlFor={field.name}>{field.label}</label>
                                    <input type="text" id={field.name} name={field.name} value={caseState[field.name]} onChange={changeHandler} />
                                </div>
                            )
                        }
                        return null
                    })}
                </form>
            </div>
            <div className={resourceStyles.footer}>
                <button type="button" onClick={() => submitCloseReset()}>{caseInstance._links ? "Update Case" : "Add Case"}</button>
                <button type="button" onClick={() => resetAndClose()}>Cancel</button>
            </div>
        </dialog >
    )
})