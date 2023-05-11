import { Sidebar } from '../sidebar'
import { Section } from '../section'

import styles from './main.module.css'

export const Main = ({ pages }) => {
    switch (pages[1]) {
        case "":
        case "login":
        case "signup":
            return <main className={styles.main} ><Section pages={pages} /></main>
        default:
            return (
                <main className={styles.main}>
                    <Sidebar pages={pages} />
                    <Section pages={pages} />
                </main>
            )
    }
}