import { Header, Footer } from '../../components'
import { pages } from '../../app/pages'

import styles from './Settings.module.css'

export const Settings = () => {
    return (
        <>
            <Header pages={pages} />
            <main className={styles.main}>
                <aside className={styles.aside}>Settings Sidebar</aside>
                <section className={styles.section}>
                    <h1>This is the Settings page</h1>
                    <div>This is settings content.</div>
                </section>
            </main>
            <Footer />
        </>
    )
}