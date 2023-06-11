import { useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

// import API calls
import { useGetEventsQuery } from '../events/eventsSlice'
import { useGetClientsQuery } from '../clients/clientsSlice'
import { useGetCasesQuery } from '../cases/casesSlice'

import { SelectClientCreateEventInputModal } from '../events/SelectClientCreateEventInputModal'

// import UI and static data
import { DocketSidebar } from './DocketSidebar'
import { Welcome } from './Welcome'
import { Header, Main, Sidebar, Section, Footer, Calendar } from '../../components'
import { pages } from '../../app/pages'
import { eventTypeOptions } from '../../app/eventTypeOptions'

export const Docket = () => {
    const navigate = useNavigate()

    const views = [
        'daily',
        'weekly',
        'monthly'
    ]

    const selectClientCreateEventDialogRef = useRef(1)

    const [searchParams] = useSearchParams()
    const date = searchParams.get("date")

    const [view, setView] = useState(views[0])

    const today = (date && new Date(date)) || new Date()
    const todayStr = today.toISOString().slice(0, 10)
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    const tomorrowStr = tomorrow.toISOString().slice(0, 10)
    // const sunday = new Date()
    // const saturday = new Date()

    const {
        data: events,
        isLoading,
        isSuccess,
        isError: isLoadError,
        error
    } = useGetEventsQuery({ dateRange: `${todayStr}to${tomorrowStr}` })

    const {
        data: nextEvent,
        isLoading: isNextLoading,
        isSuccess: isNextSuccess,
        isError: isNextError,
        error: nextError
    } = useGetEventsQuery({ next: true })

    const {
        data: hasClients,
        isLoading: isClientsLoading,
        isSuccess: isClientsSuccess,
        isError: isClientsError,
        error: clientsError
    } = useGetClientsQuery()

    const {
        data: hasCases,
        isLoading: isCasesLoading,
        isSuccess: isCasesSuccess,
        isError: isCasesError,
        error: casesError
    } = useGetCasesQuery()

    const openDialog = () => {
        if (!selectClientCreateEventDialogRef.current.open) {
            selectClientCreateEventDialogRef.current.showModal()
        }
    }

    const closeDialog = mode => {
        if (selectClientCreateEventDialogRef.current.open) {
            selectClientCreateEventDialogRef.current.close()
        }
    }

    let content

    if (isLoading) {
        content = <div>Loading...</div>
    }
    else if (isSuccess) {
        if (events.length === 0) {
            if (isNextLoading) {
                content = <div>Loading...</div>
            } else if (isNextSuccess && nextEvent.length > 0) {
                const startDateStr = nextEvent[0].startDatetime.slice(0, 10);
                const endDate = new Date(startDateStr)
                endDate.setDate(endDate.getDate() + 1)
                const endDateStr = endDate.toISOString().slice(0, 10)
                content = (
                    <>
                        <div>You don't have any events scheduled today.</div>
                        <div>Your next event is scheduled on <a href={`/docket?date=${startDateStr}`}>{startDateStr}</a></div>
                    </>
                )
            } else {
                content = <Welcome hasClients={hasClients || false} hasCases={hasCases || false} />
            }

        }
        else {
            content = <Calendar view={view} events={events} />
        }
    }
    else if (isLoadError) {
        if (error.status === 403) {
            navigate("/login")
        }
        console.log(error)
        content = (
            <>
                <div>There was an error loading Docket data.</div>
                <div>{JSON.stringify(error)}</div>
            </>
        )
    }

    return (
        <>
            <Header currentPage="docket" pages={pages} />
            <Main>
                <Sidebar>
                    <DocketSidebar view={view}
                        views={views}
                        setView={setView}
                        hasEvents={events?.length > 0}
                        openDialog={openDialog}
                    />
                </Sidebar>
                <Section>
                    {content}
                    <SelectClientCreateEventInputModal ref={selectClientCreateEventDialogRef}
                        closeHandler={closeDialog}
                        eventTypeOptions={eventTypeOptions}
                    />
                </Section>
            </Main>
            <Footer />
        </>
    )
}