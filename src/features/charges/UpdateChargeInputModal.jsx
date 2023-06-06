import { forwardRef, useEffect, useState } from 'react'

import {
    useUpdateChargeMutation, useGetChargeQuery
} from "./chargesSlice"

import resourceStyles from '../resourceStyles.module.css'

export const UpdateChargeInputModal = forwardRef(({ caseInstance, clientId, chargeId, closeHandler, chargeStatusOptions }, ref) => {
    const { data: charge, isLoading, isSuccess: isLoadSuccess, isError: isLoadError, error: loadError } = useGetChargeQuery(chargeId)

    const [updateCharge, { data: updatedCharge,
        isFetching,
        isUpdateSuccess,
        isUpdateError,
        error: updateError
    }] = useUpdateChargeMutation()

    const chargeStatusOptionsArray = chargeStatusOptions.reduce((prev, curr, currIndex) => {
        prev.push({ name: curr, value: currIndex + 1 })
        return prev
    }, [])

    const formFields = [
        { name: "statute", type: "text", label: "Statute" },
        { name: "description", type: "text", label: "Description" }
    ]

    const [chargeState, setChargeState] = useState({
        id: "",
        caseInstance: caseInstance,
        status: 1,
        statute: "",
        description: ""
    })

    useEffect(() => {
        setChargeState({
            id: charge?._links.self.href.split("/charges/")[1] || "",
            caseInstance: caseInstance || "",
            status: charge?.status || "",
            description: charge?.description || "",
            statute: charge?.statute || "",
        })
    }, [charge])

    const submitAndReset = () => {
        updateCharge(chargeState)
        resetAndClose()
    }

    const resetAndClose = () => {
        closeHandler("update")
    }

    const changeHandler = ({ target }) => {
        const { checked, name, type, value } = target
        setChargeState({
            ...chargeState,
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
                            <label htmlFor="type">Charge Status</label>
                            <select id="status" name="status" onChange={changeHandler} value={chargeState.status}>
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
                    <button type="button" onClick={submitAndReset} >Update Event</button>
                    <button type="button" onClick={() => closeHandler("update")} >Cancel</button>
                </div>
            </>
        )
    } else if (isLoadError) {
        content = <div>There was an error retrieving charge data.</div>
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