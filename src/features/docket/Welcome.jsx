import styles from './Welcome.module.css'

export const Welcome = () => {
    return (
        <div className={styles.welcome}>
            <h1>Welcome to EasyLegal.app</h1>
            <p>This is the page where you'll usually see the events you've got scheduled, but right now you don't have any 😭</p>
            <p>Follow these steps to get started:</p>
            <ol styles={{margin:0}}>
                <li>Create a client</li>
                <li>Create a case for that client</li>
                <li>Schedule some events for that case</li>
                <li>Come back to this page and checkout your Docket!</li>
            </ol>
        </div>
    )
}