import { forwardRef, useState } from 'react'

import {
    useCreateChargeMutation
} from "./chargesSlice"

import resourceStyles from '../resourceStyles.module.css'

export const CreateChargeInputModal = forwardRef(({ caseInstance, clientId, closeHandler, chargeStatusOptions }, ref) => {
    const [createCharge, { isError: isCreateError }] = useCreateChargeMutation()

    const chargeStatusOptionsArray = chargeStatusOptions.reduce((prev, curr, currIndex) => {
        prev.push({ name: curr, value: currIndex + 1 })
        return prev
    }, [])

    const formFields = [
        { name: "statute", type: "text", label: "Statute" },
        { name: "description", type: "text", label: "Description" }
    ]

    const [chargeState, setChargeState] = useState({
        caseInstance: caseInstance,
        status: 1,
        statute: "",
        description: ""
    })

    const submitAndReset = () => {
        createCharge(chargeState)
        resetAndClose()
    }

    const resetAndClose = () => {
        closeHandler("create")
        setChargeState({
            caseInstance: caseInstance,
            status: 1,
            statute: "",
            description: ""
        })
    }

    const changeHandler = ({ target }) => {
        const { checked, name, type, value } = target
        setChargeState({
            ...chargeState,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    return (
        <dialog ref={ref} className={resourceStyles.modal}>
            <div className={resourceStyles.header}>
                <div className={resourceStyles.headerTitle}>Create New Charge</div>
                <button className={resourceStyles.headerCloseButton}
                // onClick={resetAndClose}
                >X</button>
            </div>
            <div className={resourceStyles.body}>
                <form method="dialog">
                    <div key="type" className={resourceStyles.labelledTextInput}>
                        <label htmlFor="type">Charge Status</label>
                        <select id="status" name="status" onChange={changeHandler} value={chargeState.status}>
                            <option key="default" value="">Please choose charge status</option>
                            {chargeStatusOptionsArray.map(option => <option key={option.value} value={option.value}>{option.name}</option>)}
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
                                        value={chargeState[field.name]}
                                        onChange={changeHandler} />
                                </div>
                            )
                        )
                    })}
                </form>
            </div>
            <div className={resourceStyles.footer}>
                <button type="button" onClick={submitAndReset} >Add Charge</button>
                <button type="button" onClick={resetAndClose} >Cancel</button>
            </div>
        </dialog>
    )
})