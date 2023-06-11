import { useEffect, useRef, useState } from "react"

import { useNavigate } from "react-router-dom"

import {
    useCreateCaseMutation,
    useGetCasesByClientIdQuery
} from "./casesSlice"

import { CaseInputModal } from './CaseInputModal'

import { CasesEmptyState } from "./CasesEmptyState"

import resourceStyles from '../resourceStyles.module.css'
import styles from './Cases.module.css'

export const CasesTab = ({ clientId }) => {
    const navigate = useNavigate()

    const caseDialogRef = useRef(1)

    const {
        data: cases,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCasesByClientIdQuery(clientId)

    const [createCase, { isEror: isCreateError }] = useCreateCaseMutation()

    const keyDownHandler = ({ keyCode, target }, caseId) => {
        if (keyCode === 13) {
            const caseId = target.dataset['caseId']
            navigate(`/cases/${caseId}`)
        }
    }

    const clickHandler = caseInstance => {
        // caseInstance.preventDefault()
        // setCaseId(caseInstance.target.parentElement.dataset['caseId'])
    }

    const openDialog = () => {
        if (!caseDialogRef.current.open) {
            caseDialogRef.current.showModal()
        }
    }

    const closeDialog = () => {
        if (caseDialogRef.current.open) {
            caseDialogRef.current.close()
        }
    }

    const submitHandler = async caseInstance => {
        delete caseInstance.id
        await createCase(caseInstance).unwrap()
    }

    let content

    if (isLoading) {
        content = <h2>Loading...</h2>
    }
    else if (isSuccess) {
        if (cases.length === 0) {
            content = (
                <>
                    <CasesEmptyState hasClients={cases?.length > 0} />
                    <CaseInputModal ref={caseDialogRef}
                        clientId={clientId}
                        closeHandler={closeDialog}
                        submitHandler={submitHandler}
                    />
                </>
            )
        }
        else {
            content = (
                <>
                    <div className={resourceStyles.fullpage}>
                        <div className={resourceStyles.resourceList}>
                            <div className={styles.resourceListHeader}>
                                <div>Client</div>
                                <div>Court</div>
                                <div>Prosecutor</div>
                            </div>
                            <div className={resourceStyles.resourceListBody}>
                                {cases.map(caseInstance => (
                                    <div key={caseInstance.id}
                                        tabIndex={0}
                                        className={resourceStyles.resourceListRow}
                                        data-case-id={caseInstance.id}
                                        onKeyDown={keyDownHandler}
                                    >
                                        <a className={styles.resourceListRow}
                                            onKeyDown={keyDownHandler}
                                            data-case-id={caseInstance.id}
                                            href={`/cases/${caseInstance.id}`}
                                        >
                                            <div>{caseInstance.caseNumber}</div>
                                            <div>{caseInstance.court}</div>
                                            <div>{caseInstance.prosecutor}</div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <CaseInputModal ref={caseDialogRef}
                        clientId={clientId}
                        closeHandler={closeDialog}
                        submitHandler={submitHandler}
                    />
                </>
            )
        }
    }
    else if (isError) {
        if (error.status === 403) {
            navigate("/login")
        }
    }

    return content
}