import { ClientName } from './ClientName'
import { PotentialClients } from './PotentialClients'

import resourceStyles from '../resourceStyles.module.css'
import styles from './Clients.module.css'

export const ClientSelector = ({ clientId, clientName, changeHandler, clientHandler, debounced }) => {
    return (
        <div className={styles.dropdownContainer}>
            <div className={resourceStyles.labelledTextInput}>
                <label htmlFor='clientName' className="">Client</label>
                {clientId === "" && (
                    <>
                        <input type="text"
                            id="clientName"
                            name="clientName"
                            value={clientName}
                            onChange={changeHandler}
                        />
                        {clientName !== "" && debounced && <PotentialClients partialName={clientName} clientHandler={clientHandler} />}
                    </>
                )}
                {clientId > 0 && <ClientName clientId={clientId} />}
            </div>
        </div>
    )
}