import { useEffect, useRef, useState } from "react"

import { useNavigate } from "react-router-dom"

import { useGetChargesQuery } from "./chargesSlice"

import { CreateChargeInputModal } from './CreateChargeInputModal'
import { UpdateChargeInputModal } from './UpdateChargeInputModal'

import { ChargesEmptyState } from './ChargesEmptyState'

import resourceStyles from '../resourceStyles.module.css'
import styles from './Charges.module.css'

export const ChargesTab = ({ caseInstance }) => {
    const navigate = useNavigate()

    const [chargeId, setChargeId] = useState(false)

    const createChargeDialogRef = useRef(1)
    const updateChargeDialogRef = useRef(2)

    const clientId = caseInstance._links.client.href.split("/users/")[1]
    const caseId = caseInstance._links.self.href.split("/cases/")[1]

    const {
        data: charges,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetChargesQuery(caseId)

    const chargeStatusOptions = [
        "Pending",
        "Dismissed",
        "Reduced",
        "Convicted - Appealing",
        "Convicted"
    ]

    const keyDownHandler = ({ keyCode, target }, chargeId) => {
        if (keyCode === 13) {
            // const eventId = target.dataset['eventId']
            // navigate(`/cases/${caseId}?view=/events/${target.dataset['eventId']}`)
            openDialog("charges", chargeId)
        }
    }

    const clickHandler = event => {
        event.preventDefault()
        setChargeId(event.target.parentElement.dataset['chargeId'])
    }

    useEffect(() => {
        if (chargeId) {
            openDialog()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chargeId])

    const openDialog = () => {
        if (chargeId) {
            if (!updateChargeDialogRef.current.open) {
                updateChargeDialogRef.current.showModal()
            }
        }
        else {
            if (!createChargeDialogRef.current.open) {
                createChargeDialogRef.current.showModal()
            }
        }

    }

    const closeDialog = mode => {
        if (mode === "create") {
            if (createChargeDialogRef.current.open) {
                createChargeDialogRef.current.close()
            }
        }
        if (mode === "update") {
            if (updateChargeDialogRef.current.open) {
                updateChargeDialogRef.current.close()
            }
        }
        setChargeId(false)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }
    else if (isSuccess) {
        if (charges.length === 0) {
            return (
                <>
                    <ChargesEmptyState openDialog={openDialog} />
                    <CreateChargeInputModal ref={createChargeDialogRef}
                        caseInstance={caseId}
                        closeHandler={closeDialog}
                        clientId={clientId}
                        chargeStatusOptions={chargeStatusOptions}
                    />
                </>
            )
        }
        return (
            <>
                <div className={resourceStyles.fullpage}>
                    <button onClick={openDialog}>Create New Charge</button>
                    <div className={resourceStyles.resourceList}>
                        <div className={styles.resourceListHeader}>
                            <div>Statute</div>
                            <div>Description</div>
                            <div>Status</div>
                        </div>
                        <div className={resourceStyles.resourceListBody}>
                            {charges.map(charge => {
                                return (
                                    <div key={charge.id}
                                        tabIndex={0}
                                        className={resourceStyles.resourceListRow}
                                        data-charge-id={charge.id}
                                        onKeyDown={e => keyDownHandler(e, charge.id)}
                                    >
                                        <a className={styles.resourceListRow}
                                            // onKeyDown={e => keyDownHandler(e, event)}
                                            data-charge-id={charge.id}
                                            onClick={clickHandler}
                                            href={`/cases/${caseId}?view=/charges/${charge.id}`}
                                        >
                                            <div>{charge.statute}</div>
                                            <div>{charge.description}</div>
                                            <div>{chargeStatusOptions[charge.status - 1]}</div>
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <CreateChargeInputModal ref={createChargeDialogRef}
                    caseInstance={caseId}
                    closeHandler={closeDialog}
                    clientId={clientId}
                    chargeStatusOptions={chargeStatusOptions}
                />
                {chargeId && <UpdateChargeInputModal ref={updateChargeDialogRef}
                    caseInstance={caseId}
                    closeHandler={closeDialog}
                    clientId={clientId}
                    chargeId={chargeId}
                    chargeStatusOptions={chargeStatusOptions}
                />}
            </>
        )
    }
    else if (isError) {
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