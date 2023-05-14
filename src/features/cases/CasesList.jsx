import { Header, Footer } from '../../components'
import styles from './Cases.module.css'

export const CasesList = () => {
    const pages = ["docket", "clients", "cases", "finances"]

    return (
        <>
            <Header pages={pages} />
            <main className={styles.main}>
                <aside className={styles.aside}>Cases Sidebar</aside>
                <section className={styles.section}>
                    <h1>This is the Cases List page</h1>
                    <div>This is cases list content.</div>
                </section>
            </main>
            <Footer />
        </>
    )
}