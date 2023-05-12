import { AppHeader, Footer } from '../../components'
import styles from './Docket.module.css'

export const Docket = () => {
    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <aside className={styles.aside}>Docket Sidebar</aside>
                <section className={styles.section}>
                    <h1>This is the Docket page</h1>
                    <div>This is docket content.</div>
                </section>
            </main>
            <Footer />
        </>
    )
}