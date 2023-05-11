import { Sidebar } from '../sidebar'
import { Section } from '../section'

import styles from './main.module.css'

export const Main = ({ page }) => {
    if (page === "") {
        return (
            <main className={styles.main} >Welcome to EasyLegal.app</main>
        )
    }

    if (page === "login") {
        return <main className={styles.main}>Login Page</main>
    }

    if (page === "signup") {
        return <main className={styles.main}>Signup Page</main>
    }

    return (
        <main className={styles.main}>
            <Sidebar page={page} />
            <Section page={page} />
        </main>
    )
}