import resourceStyles from '../../features/resourceStyles.module.css'

export const CasesEmptyState = ({ hasClients }) => (
    <div className={resourceStyles.secondary}>
        <h2>You have don't have any cases yet.</h2>
        {hasClients && (
            <>
                <p>Would you like to add a new one?</p>
                <button>Add New Case</button>
            </>
        )}
        {!hasClients && (
            <>
                <h2>And you also don't have any clients.</h2>
                <p>You can create a case as soon as you add a new client.</p>
                <p>Use the <strong>Clients</strong> link above to navigate to the clients page.</p>
            </>
        )}

    </div>
)