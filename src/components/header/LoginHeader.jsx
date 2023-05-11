import { Logo } from "../logo"
import { Signup } from "../signup"

import styles from './header.module.css'

export const LoginHeader = ({ navigateTo }) => {
    return <header className={styles.header}>
        <Logo navigateTo={navigateTo} />
        <Signup navigateTo={navigateTo} />
    </header>
}