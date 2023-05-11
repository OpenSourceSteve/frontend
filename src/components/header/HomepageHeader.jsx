import { Logo } from "../logo"
import { Login } from "../login"
import { Signup } from "../signup"

import styles from './header.module.css'

export const HomepageHeader = ({ navigateTo }) => {
    return <header className={styles.header}>
        <Logo navigateTo={navigateTo} />
        <div>
            <Login navigateTo={navigateTo} />
            <Signup navigateTo={navigateTo} />
        </div>
    </header>
}