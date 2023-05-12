import { Logo } from "../logo"
import { Login } from "../login"
import { Signup } from "../signup"

import styles from './Header.module.css'

export const HomepageHeader = () => {
    return <header className={styles.header}>
        <Logo />
        <div>
            <Login />
            <Signup />
        </div>
    </header>
}