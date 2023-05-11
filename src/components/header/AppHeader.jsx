import { Logo } from "../logo"
import { Logout } from "../logout"
import { Navbar } from "../navbar"

import styles from './header.module.css'

export const AppHeader = ({ page, navigateTo}) => {
    return <>
        <header className={styles.header} >
            <Logo navigateTo={navigateTo} />
            <Logout navigateTo={navigateTo}/>
        </header>
        <Navbar page={page} navigateTo={navigateTo} />
    </>
}