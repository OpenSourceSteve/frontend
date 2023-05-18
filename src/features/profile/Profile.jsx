import { Header, Footer } from '../../components'
import { pages } from '../../app/pages'

import styles from './Profile.module.css'

export const Profile = () => {
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