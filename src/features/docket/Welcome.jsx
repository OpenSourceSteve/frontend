import styles from './Welcome.module.css'

export const Welcome = ({ hasClients, hasCases}) => {
    return (
        <div className={styles.welcome}>
            <h1>Welcome to EasyLegal.app</h1>
            <p>This is the page where you'll usually see the events you've got scheduled, but right now you don't have any future events scheduled.</p>
            <p>Follow these steps to get started:</p>
            <ol>
                <li>Create a client {hasClients && <span>✅</span>}</li>
                <li>Create a case for that client {hasCases && <span>✅</span>}</li>
                <li>Schedule some events for that case</li>
                <li>Come back to this page and checkout your Docket!</li>
            </ol>
        </div>
    )
}