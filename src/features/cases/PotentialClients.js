import { useGetClientsWithNameQuery } from "../clients/clientsSlice"

import styles from './Cases.module.css'

export const PotentialClients = ({ partialName, clientHandler }) => {

    const { data: potentialClients } = useGetClientsWithNameQuery(partialName)

    if (potentialClients && potentialClients.length > 0) {
        return (
            <ul className={styles.dropdown}>
                {potentialClients.map(potentialClient => (
                    <li key={potentialClient.id}>
                        <div
                            className=""
                            onClick={() => clientHandler(potentialClient)}
                            data-client-id={potentialClient.id}
                        >{potentialClient.firstName} {potentialClient.lastName}</div>
                    </li>
                ))}
            </ul>
        )
    }
}