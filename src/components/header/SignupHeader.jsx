import { Logo } from "../logo"
import { Login } from "../login"

import styles from './Header.module.css'

export const SignupHeader = ({ navigateTo }) => {
    return <header className={styles.header} >
        <Logo navigateTo={navigateTo} />
        <Login navigateTo={navigateTo} />
    </header>
}