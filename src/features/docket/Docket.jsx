import { useState } from 'react'

import { Header, Main, Sidebar, Section, Footer, Calendar } from '../../components'
import { pages } from '../../app/pages'

export const Docket = () => {
    const [view, setView] = useState("daily")

    const views = [
        'daily',
        'weekly',
        'monthly'
    ]

    const [eventTypes, setEventTypes] = useState({
        'courtAppearances': true,
        'deadlines': true,
        'clientAppointments': true,
        'otherAppointments': true,
        'otherHoursBillable': true
    })

    const keydownHandler = event => {
        if (event.keyCode !== 13) {
            return false;
        }

        const view = event.target.value

        setView(view)
    }

    const viewChangeHandler = event => {
        const view = event.target.value
        setView(view)
    }

    const eventsChangeHandler = event => {

        const {name, checked} = event.target
        setEventTypes({
            ...eventTypes,
            [name]: checked
        })
    }

    return (
        <>
            <Header currentPage="docket" pages={pages} />
            <Main>
                <Sidebar>
                    <ul>
                        <li>
                            <button>Schedule New Event</button>
                        </li>
                        <li>
                            <div>View:</div>
                            <div>{views.map(v => (
                                <div key={v}>
                                    <input type="radio"
                                        id={v}
                                        onKeyDown={keydownHandler}
                                        onChange={viewChangeHandler}
                                        value={v}
                                        checked={view === v}
                                    /><label htmlFor={v}>{v}</label>
                                </div>
                            )
                            )}</div>
                        </li>
                        <li>
                            <div>Event Types:</div>
                            <ul>
                                <li><input type='checkbox' onChange={eventsChangeHandler} name={'courtAppearances'} checked={eventTypes['courtAppearances']}/>Court Appearance</li>
                                <li><input type='checkbox' onChange={eventsChangeHandler} name={'deadlines'} checked={eventTypes['deadlines']}/>Deadline</li>
                                <li><input type='checkbox' onChange={eventsChangeHandler} name={'clientAppointments'} checked={eventTypes['clientAppointments']}/>Client Appointment</li>
                                <li><input type='checkbox' onChange={eventsChangeHandler} name={'otherAppointments'} checked={eventTypes['otherAppointments']}/>Other Appointment</li>
                                <li><input type='checkbox' onChange={eventsChangeHandler} name={'otherHoursBillable'} checked={eventTypes['otherHoursBillable']}/>Other Hours Billable</li>
                            </ul>
                        </li>
                        <li>
                            <div>Filter by client name:</div>
                            <input type="text" />
                        </li>
                    </ul>
                </Sidebar>
                <Section>
                    <Calendar view={view} />
                </Section>
            </Main>
            <Footer />
        </>
    )
}