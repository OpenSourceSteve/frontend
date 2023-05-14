import { Link } from "../link"

import styles from "./navbar.module.css"


export const Navbar = ({ pages }) => {
    return (
        <nav className={styles.nav}>
            <ul>
                {pages.map(page => {
                    return <Link key={page} path={page} />
                })}
            </ul>
        </nav>
    )
}