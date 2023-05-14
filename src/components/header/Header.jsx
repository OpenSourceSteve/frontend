import { Logo } from "../logo"
import { Link } from "../link"
import { Account } from "../account"
import { Navbar } from "../navbar"

import styles from './Header.module.css'

export const Header = ({ links, pages }) => {
    if (pages) {
        return (
            <>
                <header className={styles.header} >
                    <Logo />
                    <Account />
                </header>
                <Navbar pages={pages} />
            </>
        )
    }

    if (links.length) {
        return (
            <header className={styles.header}>
                <Logo />
                <div>
                    {links.map(link => <Link key={link} path={link} />)}
                </div>
            </header>
        )
    }
}