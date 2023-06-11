import { useGetCasesWithNumberQuery } from "./casesSlice"

import styles from '../clients/Clients.module.css'

export const PotentialCases = ({ partialNumber, caseHandler }) => {

    const { data: potentialCases } = useGetCasesWithNumberQuery(partialNumber)

    if (potentialCases && potentialCases.length > 0) {
        return (
            <ul className={styles.dropdown}>
                {potentialCases.map(potentialCase => (
                    <li key={potentialCase.id}>
                        <div
                            onClick={() => caseHandler(potentialCase)}
                            data-client-id={potentialCase.id}
                        >{potentialCase.caseNumber}</div>
                    </li>
                ))}
            </ul>
        )
    }
}