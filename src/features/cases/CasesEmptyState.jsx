import resourceStyles from '../../features/resourceStyles.module.css'

export const CasesEmptyState = () => (
    <div className={resourceStyles.secondary}>
        <h2>You have don't have any cases yet.</h2>
        <p>Would you like to add a new one?</p>
        <button>Add New Case</button>
    </div>
)