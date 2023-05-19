import { Logo } from "../logo"
import { Link } from "../link"
import { Dropdown } from "../dropdown"
import { Navbar } from "../navbar"

import styles from './Header.module.css'

export const Header = ({ currentPage, links, pages }) => {
    if (pages) {
        return (
            <>
                <header className={styles.header} >
                    <div className={styles.container}>
                        <Logo />
                        <Dropdown title={"account"} />
                    </div>
                </header>
                <div className={styles.nav_outer_container}>
                    <div className={styles.nav_inner_container}>
                        <Navbar currentPage={currentPage} pages={pages} />
                    </div>
                </div>
            </>
        )
    }

    if (links.length) {
        return (
            <header className={styles.header}>
                <div className={styles.container}>
                    <Logo />
                    <div className={styles.authentication}>
                        {links.map(link => <Link key={link} path={link} color={"white"}/>)}
                    </div>
                </div>
            </header>
        )
    }
}