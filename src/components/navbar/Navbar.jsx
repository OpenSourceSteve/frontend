import { useNavigate } from "react-router-dom"

import styles from "./navbar.module.css"


export const Navbar = ({ navigateTo }) => {
    const navigate = useNavigate()

    const pages = [
        "docket",
        "clients",
        "cases",
        "finances"
    ]

    return <nav className={styles.nav}>{pages.map(page => {
        return <div key={page} onClick={() => navigate(`/${page}`)}>{page}</div>
    })}</nav>
}