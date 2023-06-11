import { useState } from 'react'

import { CaseNumber } from './CaseNumber'
import { PotentialCases } from './PotentialCases'

import resourceStyles from '../resourceStyles.module.css'
import styles from '../clients/Clients.module.css'

export const CaseSelector = ({ clientId, caseInstance, caseHandler }) => {
    const [caseNumber, setCaseNumber] = useState("")

    const changeHandler = ({ target }) => {
        setCaseNumber(target.value)
    }

    return (
        <div className={styles.dropdownContainer}>
            <div className={resourceStyles.labelledTextInput}>
                <label htmlFor='clientName' className="">Case</label>
                {caseInstance === "" && (
                    <>
                        <input type="text"
                            id="caseNumber"
                            name="caseNumber"
                            value={caseNumber}
                            onChange={changeHandler}
                        />
                        {caseNumber !== "" && (
                            <PotentialCases clientId={clientId} partialNumber={caseNumber}
                                caseHandler={caseHandler}
                            />
                        )}
                    </>
                )}
                {caseInstance > 0 && <CaseNumber caseId={caseInstance} />}
            </div>
        </div>
    )
}