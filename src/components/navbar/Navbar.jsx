import { useNavigate } from "react-router-dom"

import { Link } from "../link"

import styles from "./navbar.module.css"


export const Navbar = ({ currentPage, pages }) => {
    const navigate = useNavigate()

    const keydownHandler = ({ target, keyCode }) => {
        if (keyCode === 13) {
            navigate(`/${target.dataset['href']}`)
        }
    }

    return (
        <nav className={styles.nav}>
            <ul>
                {pages.map(page => {
                    return (
                        <li key={page} tabIndex={page === currentPage ? -1 : 0} data-href={page} onKeyDown={keydownHandler}>
                            <Link currentPage={currentPage} path={page} color="white"/>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}