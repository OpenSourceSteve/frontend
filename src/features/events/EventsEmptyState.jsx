import { forwardRef } from 'react'

import resourceStyles from '../../features/resourceStyles.module.css'

export const EventsEmptyState = ({ openDialog }) => (
    <div className={resourceStyles.secondary}>
        <h2>You have don't have any events yet.</h2>
        <p>Would you like to add a new one?</p>
        <button onClick={openDialog}>Add New Event</button>
    </div>
)