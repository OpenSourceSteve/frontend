import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// import API calls
import {
    useGetCaseQuery,
    useUpdateCaseMutation
} from './casesSlice'

// import resource tabs
import {
    EventsTab,
    ChargesTab,
    NotesTab,
    TasksTab,
    FinancesTab
} from '../index'

// import components
import { Header, Link, Main, Sidebar, Section, TabbedNav, Footer } from '../../components'
import { CaseInputModal } from './CaseInputModal'

import { pages } from '../../app/pages'

import resourceStyles from '../resourceStyles.module.css'

export const CaseDetails = () => {
    const navigate = useNavigate()

    const navTabs = [
        "events",
        "charges",
        "notes",
        "tasks",
        "finances"
    ]

    const [activeTab, setActiveTab] = useState(navTabs[0])

    const dialogRef = useRef(null)

    const params = useParams();

    const { caseId } = params;

    const {
        data: caseInstance,
        isLoading,
        isFetching,
        isSuccess,
        isError: isLoadError,
        error
    } = useGetCaseQuery(caseId)

    const [updateCase, { isEror: isUpdateError }] = useUpdateCaseMutation(caseId)

    const openDialog = (dialog, eventId) => {
        if (!dialogRef.current.open) {
            dialogRef.current.showModal()
        }
    }

    const closeDialog = dialog => {
        if (dialogRef.current.open) {
            dialogRef.current.close()
        }
    }

    const submitHandler = async caseInstance => {
        await updateCase(caseInstance).unwrap()
    }

    const navTabHandler = ({ target }) => {
        setActiveTab(target.dataset['tab'])
    }

    let content

    if (isLoading) {
        <h2 className={resourceStyles.resourceLoading}>Loading...</h2>
    } else if (isSuccess) {
        if (caseInstance) {
            content = (
                <>
                    <div className={resourceStyles.resourceDetailsView}>
                        <div className={resourceStyles.resourceDetailsHeader}>
                            <h2>Case: {caseInstance.caseNumber}</h2>
                            <button type="button" onClick={() => openDialog("cases")} data-form="case">Update Case Info</button>
                        </div>
                        <div>
                            <div>Court: {caseInstance.court}</div>
                            <div>Judge: {caseInstance.judge}</div>
                            <div>Jurisdiction: {caseInstance.jurisdiction}</div>
                            <div>Prosecutor: {caseInstance.prosecutor}</div>
                            <div>Client: {caseInstance._links.client.href}</div>
                        </div>
                    </div>
                    <TabbedNav activeTab={activeTab} tabs={navTabs} navTabHandler={navTabHandler}>
                        {activeTab === "events" && <EventsTab caseInstance={caseInstance} />}
                        {activeTab === "charges" && <ChargesTab />}
                        {activeTab === "notes" && <NotesTab />}
                        {activeTab === "tasks" && <TasksTab />}
                        {activeTab === "finances" && <FinancesTab />}
                    </TabbedNav>
                </>
            )
        }
        else {
            content = <h2>Client Not Found</h2>
        }
    }
    else if (isLoadError) {
        if (error.status === 403) {
            navigate("/login")
        }
    }

    return (
        <>
            <Header currentPage="cases" pages={pages} />
            <Main>
                <Sidebar>
                    <ul>
                        <li>
                            <Link path="cases" text="Back to Cases List" />
                        </li>
                        <li>
                            {activeTab === "events" && (
                                <button onClick={() => openDialog("events")}
                                    data-form="event">Create New Event</button>
                            )}
                        </li>
                    </ul>
                </Sidebar>
                <Section className={resourceStyles.section}>
                    {content}
                </Section>
            </Main>
            <Footer />
            {caseInstance && (
                <CaseInputModal ref={dialogRef}
                    caseInstance={caseInstance}
                    submitHandler={submitHandler}
                    closeHandler={closeDialog}
                />
            )}
        </>
    )
}