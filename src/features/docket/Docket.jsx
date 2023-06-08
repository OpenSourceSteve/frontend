import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

// import API calls
import { useGetEventsQuery } from '../events/eventsSlice'

// import UI and static data
import { DocketSidebar } from './DocketSidebar'
import { Welcome } from './Welcome'
import { Header, Main, Sidebar, Section, Footer, Calendar } from '../../components'
import { pages } from '../../app/pages'

export const Docket = () => {
    const navigate = useNavigate()

    const views = [
        'daily',
        'weekly',
        'monthly'
    ]

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
                const endDateStr = endDate.toISOString().slice(0,10)
                content = (
                    <>
                        <div>You don't have any events scheduled today.</div>
                        <div>Your next event is scheduled on <a href={`/docket?date=${startDateStr}`}>{startDateStr}</a></div>
                    </>
                )
            } else {
                content = <Welcome />
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
                    {events?.length > 0 && (
                        <DocketSidebar view={view}
                            views={views}
                            setView={setView}
                        />
                    )}
                </Sidebar>
                <Section>
                    {content}
                </Section>
            </Main>
            <Footer />
        </>
    )
}