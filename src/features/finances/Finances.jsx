import { Header, Footer } from '../../components'
import styles from './Finances.module.css'

export const Finances = () => {
    const pages = ["docket", "clients", "cases", "finances"]

    return (
        <>
            <Header pages={pages} />
            <main className={styles.main}>
                <aside className={styles.aside}>Finances Sidebar</aside>
                <section className={styles.section}>
                    <h1>This is the Finances overview page</h1>
                    <div>This is finances overview content.</div>
                </section>
            </main>
            <Footer />
        </>
    )
}