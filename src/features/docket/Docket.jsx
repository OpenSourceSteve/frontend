import { useState } from 'react'

import { Header, Main, Sidebar, Section, Footer, Calendar } from '../../components'
import { pages } from '../../app/pages'

import styles from './Docket.module.css'

export const Docket = () => {
    const [view, setView] = useState("daily")

    const views = [
        'daily',
        'weekly',
        'monthly'
    ]

    const keydownHandler = event => {
        if (event.keyCode !== 13) {
            return false;
        }

        const view = event.target.value

        setView(view)
    }

    const changeHandler = event => {
        const view = event.target.value

        setView(view)
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
                                <div>
                                    <input type="radio"
                                        id={v}
                                        onKeyDown={keydownHandler}
                                        onChange={changeHandler}
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
                                <li><input type='checkbox' />Court Appearance</li>
                                <li><input type='checkbox' />Deadline</li>
                                <li><input type='checkbox' />Client Appointment</li>
                                <li><input type='checkbox' />Other Appointment</li>
                                <li><input type='checkbox' />Other Hour Billable</li>
                            </ul>
                        </li>
                        <li>
                            <div>Filter by client name:</div>
                            <input type="text" />
                        </li>
                    </ul>
                </Sidebar>
                <Section>
                    <div className={styles.docketHeader}>
                        <h1>Docket for [DATE_HERE]</h1>
                    </div>
                    <Calendar view={view} />
                </Section>
            </Main>
            <Footer />
        </>
    )
}