import { Link } from "../link"

import styles from "./navbar.module.css"


export const Navbar = ({ currentPage, pages }) => {
    return (
        <nav className={styles.nav}>
            <ul>
                {pages.map(page => {
                    return (
                        <Link key={page}
                              currentPage={currentPage}
                              path={page}
                        />
                    )
                })}
            </ul>
        </nav>
    )
}