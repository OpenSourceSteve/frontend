import resourceStyles from '../../features/resourceStyles.module.css'

export const ClientsEmptyState = () => (
    <div className={resourceStyles.secondary}>
        <h2>You have don't have any clients yet.</h2>
        <p>Would you like to add a new one?</p>
        <button>Add New Client</button>
    </div>
)
