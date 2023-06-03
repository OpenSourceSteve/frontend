import resourceStyles from '../../features/resourceStyles.module.css'

export const CalendarEmptyState = () => (
    <div className={resourceStyles.secondary}>
        <h2>You don't have any events scheduled at this time.</h2>
        <p>Would you like to create one?</p>
        <button>Create Event</button>
    </div>
)