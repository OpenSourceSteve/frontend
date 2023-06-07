import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

    const [view, setView] = useState(views[0])

    const today = new Date()
    const todayStr = today.toISOString().slice(0,10)
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    const tomorrowStr = tomorrow.toISOString().slice(0,10)
    // const sunday = new Date()
    // const saturday = new Date()

    const {
        data: events,
        isLoading,
        isSuccess,
        isError: isLoadError,
        error
    } = useGetEventsQuery({dateRange: `${todayStr}to${tomorrowStr}`})

    let content

    if (isLoading) {
        content = <div>Loading...</div>
    }
    else if (isSuccess) {
        if (events.length === 0) {
            content = <Welcome />
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