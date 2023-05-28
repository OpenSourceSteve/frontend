import { forwardRef, useState } from 'react'

import resourceStyles from '../resourceStyles.module.css'

export const ClientInputModal = forwardRef(({ closeHandler, submitHandler }, ref) => {

    const formFields = [
        { type: "text", name: "firstName", label: "First Name" },
        { type: "text", name: "lastName", label: "Last Name" },
        { type: "email", name: "email", label: "Email" },
        { type: "tel", name: "phone", label: "Phone" },
        { type: "text", name: "address1", label: "Address 1" },
        { type: "text", name: "address2", label: "Address 2" },
        { type: "text", name: "city", label: "City" },
        { type: "text", name: "state", label: "State" },
        { type: "text", name: "zip", label: "Zip" },
        { type: "date", name: "dob", label: "Date of Birth" },
        { type: "text", name: "referralSource", label: "Referral Source" },
        { type: "checkbox", name: "createCase", label: "Create Default Case" },
    ]

    const [clientState, setClientState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        dob: "",
        referralSource: "",
        createCase: true
    })

    const resetClientState = () => {
        setClientState({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zip: "",
            dob: "",
            referralSource: "",
            createCase: true
        })
    }

    const changeHandler = ({ target }) => {
        const { checked, name, type, value } = target
        setClientState({
            ...clientState,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const submitAndReset = () => {
        submitHandler(clientState)
        resetClientState()
    }

    const resetAndClose = () => {
        resetClientState()
        closeHandler()
    }

    return (
        <dialog ref={ref} className={resourceStyles.modal}>
            <div className={resourceStyles.header}>
                <div className={resourceStyles.headerTitle}>Add New Client</div>
                <button className={resourceStyles.headerCloseButton}
                    onClick={closeHandler}
                >X</button>
            </div>
            <div className={resourceStyles.body}>
                <form method="dialog">
                    {formFields.map(field => {
                        if (field.type === "checkbox") {
                            return (
                                <div key={field.name} className={resourceStyles.labelledCheckboxInput}>
                                    <label htmlFor={field.name}>{field.label}</label>
                                    <input type={field.type}
                                        name={field.name}
                                        id={field.name}
                                        checked={clientState[field.name]}
                                        onChange={changeHandler} />
                                </div>
                            )
                        }
                        return (
                            (
                                <div key={field.name} className={resourceStyles.labelledTextInput}>
                                    <label htmlFor={field.name}>{field.label}</label>
                                    <input type={field.type}
                                        name={field.name}
                                        id={field.name}
                                        value={clientState[field.name]}
                                        onChange={changeHandler} />
                                </div>
                            )
                        )
                    })}
                    <div className={resourceStyles.footer}>
                        <button type="button" onClick={() => submitAndReset()}>Add Client</button>
                        <button type="button" onClick={() => resetAndClose()}>Cancel</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
})