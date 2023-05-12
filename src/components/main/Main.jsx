import { Sidebar } from '../sidebar'
import { Section } from '../section'

import styles from './main.module.css'

export const Main = ({ page, styles }) => {
    switch (page) {
        case "":
        case "login":
        case "signup":
            return <main className={styles.main} ><Section page={page} styles={styles} /></main>
        default:
            return (
                <main className={styles.main}>
                    <Sidebar page={page} styles={styles} />
                    <Section page={page} styles={styles} />
                </main>
            )
    }
}