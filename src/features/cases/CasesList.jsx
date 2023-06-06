import { useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

// import API calls
import {
    useCreateCaseMutation,
    useGetCasesQuery
} from './casesSlice'
import {
    useGetClientsQuery
} from '../clients/clientsSlice'

// import components
import { Header, Main, Sidebar, Section, Footer } from '../../components'
import { CaseInputModal } from './CaseInputModal'

import { pages } from '../../app/pages'

// import styles
import resourceStyles from '../resourceStyles.module.css'
import styles from './Cases.module.css'
import { CasesEmptyState } from './CasesEmptyState'

export const CasesList = () => {
    const navigate = useNavigate()

    const [createCase, { isEror: isCreateError }] = useCreateCaseMutation()

    const dialogRef = useRef(null)

    const [searchParams] = useSearchParams()
    const createFor = searchParams.get("createFor")

    const {
        data: cases,
        isLoading: isCasesLoading,
        isSuccess: isCasesSuccess,
        isError: isLoadCasesError,
        error: casesError
    } = useGetCasesQuery()

    const {
        data: clients,
        isLoading: isClientsLoading,
        isSuccess: isClientsSuccess,
        isError: isLoadClientsError,
        error: clientsError
    } = useGetClientsQuery()

    const keyDownHandler = event => {
        if (event.keyCode === 13) {
            navigate(event.target.dataset['caseId'])
        }
    }

    const toggleCaseForm = () => {
        if (dialogRef.current.open) {
            dialogRef.current.close()
        } else {
            dialogRef.current.showModal()
        }
    }

    useEffect(() => {
        if (createFor !== null && !dialogRef.current.open) {
            dialogRef.current.showModal()
        }
    }, [createFor, dialogRef])

    const clickHandler = event => {
        event.preventDefault()
        navigate(event.target.parentElement.dataset['caseId'])
    }

    const submitHandler = async caseInstance => {
        delete caseInstance.id
        await createCase(caseInstance).unwrap()
    }

    let content

    if (isCasesLoading) {
        content = <h2>Loading...</h2>
    }
    else if (isCasesSuccess) {
        if (cases.length === 0) {
            content = <CasesEmptyState hasClients={clients?.length > 0}/>
        }
        else {
            content = (
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
                                   onClick={clickHandler}
                                   href={`cases/${caseInstance.id}`}
                                >
                                    <div>{caseInstance.client.lastName}, {caseInstance.client.firstName}</div>
                                    <div>{caseInstance.court}</div>
                                    <div>{caseInstance.prosecutor}</div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    }
    else if (isLoadCasesError) {
        if (casesError.status === 403) {
            navigate("/login")
        }
    }

    return (
        <>
            <Header currentPage="cases" pages={pages} />
            <Main>
                <Sidebar>
                    {cases?.length > 0 && (
                        <ul>
                            <li>
                                <button onClick={toggleCaseForm} >Create New Case</button>
                            </li>
                            {/* <li>
                                <div>Case Types:</div>
                                <ul>
                                    <li><input type='checkbox' />Open</li>
                                    <li><input type='checkbox' />Closed</li>
                                    <li><input type='checkbox' />Civil</li>
                                    <li><input type='checkbox' />Criminal</li>
                                </ul>
                            </li>
                            <li>
                                <div>Search:</div>
                                <input type="text" />
                            </li> */}
                        </ul>
                    )}
                </Sidebar>
                <Section>
                    <h1>Cases</h1>
                    {content}
                </Section>
            </Main>
            <Footer />
            <CaseInputModal ref={dialogRef}
                            clientId={createFor}
                            closeHandler={toggleCaseForm}
                            submitHandler={submitHandler}
            />
        </>
    )
}