import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// import API calls
import {
    useCreateCaseMutation,
    useGetCasesQuery
} from './casesSlice'

// import components
import { Header, Main, Sidebar, Section, Footer } from '../../components'
import { CaseInputModal } from './CaseInputModal'

import { pages } from '../../app/pages'

// import styles
import resourceStyles from '../resourceStyles.module.css'
import styles from './Cases.module.css'

export const CasesList = () => {
    const navigate = useNavigate()

    const [createCase, { isEror: isCreateError }] = useCreateCaseMutation()

    const dialogRef = useRef(null)

    const {
        data: cases,
        isLoading,
        isSuccess,
        isError: isLoadError,
        error
    } = useGetCasesQuery()

    useEffect(() => {
        if (isLoadError) {
            if (error.status === 403) {
                navigate("/login")
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, isLoadError])

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

    const clickHandler = event => {
        event.preventDefault()
        navigate(event.target.parentElement.dataset['caseId'])
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
        content = cases && cases.map(caseInstance => (
            <a key={caseInstance.id}
                tabIndex={0}
                className={styles.resourceListRow}
                onKeyDown={keyDownHandler}
                onClick={clickHandler}
                data-case-id={caseInstance.id}
                href={`cases/${caseInstance.id}`}
            >
                <div>{caseInstance.client.lastName}, {caseInstance.client.firstName}</div>
                <div>{caseInstance.court}</div>
                <div>{caseInstance.prosecutor}</div>
            </a>
        ))
    }

    return (
        <>
            <Header currentPage="cases" pages={pages} />
            <Main>
                <Sidebar>
                    <ul>
                        <li>
                            <button onClick={toggleCaseForm} >Create New Case</button>
                        </li>
                        <li>
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
                        </li>
                    </ul>
                </Sidebar>
                <Section>
                    <h1>Cases</h1>
                    <div className={resourceStyles.resourceList}>
                        <div className={styles.resourceListHeader}>
                            <div>Client</div>
                            <div>Court</div>
                            <div>Prosecutor</div>
                        </div>
                        <div className={resourceStyles.resourceListBody}>
                            {content}
                        </div>
                    </div>
                </Section>
            </Main>
            <Footer />
            <CaseInputModal ref={dialogRef} closeHandler={toggleCaseForm} submitHandler={submitHandler} />
        </>
    )
}