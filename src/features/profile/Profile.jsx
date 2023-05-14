import { Header, Footer } from '../../components'
import styles from './Profile.module.css'

export const Profile = () => {
    const pages = ["docket", "clients", "cases", "finances"]

    return (
        <>
            <Header pages={pages} />
            <main className={styles.main}>
                <aside className={styles.aside}>Profile Sidebar</aside>
                <section className={styles.section}>
                    <h1>This is the Profile page</h1>
                    <div>This is profile content.</div>
                </section>
            </main>
            <Footer />
        </>
    )
}