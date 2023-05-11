import styles from "./navbar.module.css"


export const Navbar = ({ navigateTo }) => {
    const pages = [
        "docket",
        "clients",
        "cases",
        "finances"
    ]

    return <nav className={styles.nav}>{pages.map(page => {
        return <div key={page} onClick={() => navigateTo(["", page])}>{page}</div>
    })}</nav>
}