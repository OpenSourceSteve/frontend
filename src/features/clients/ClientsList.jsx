import { AppHeader, Footer } from '../../components'
import styles from './Clients.module.css'

export const ClientsList = () => {
    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <aside className={styles.aside}>Clients Sidebar</aside>
                <section className={styles.section}>
                    <h1>This is the Clients List page</h1>
                    <div>This is clients list content.</div>
                </section>
            </main>
            <Footer />
        </>
    )
}