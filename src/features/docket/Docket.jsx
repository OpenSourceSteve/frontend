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
        'court appearances': true,
        'deadlines': true,
        'client appointments': true,
        'other appointments': true,
        'other hours billable': true
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

        const { name, checked } = event.target
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
                                {Object.keys(eventTypes).map(type => {
                                    return (
                                        <li key={type}>
                                            <input type='checkbox' id={type} onChange={eventsChangeHandler} name={type} checked={eventTypes[type]} />
                                            <label htmlFor={type}>{type}</label>
                                        </li>
                                    )
                                })}
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