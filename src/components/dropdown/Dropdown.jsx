import { Link } from "../link";

import styles from "./Dropdown.module.css"

export const Dropdown = ({ show, links }) => {

    if (show) {
        return (
            <ul className={styles.dropdown} >
                {links.map(link => <Link key={link} path={link} />)}
            </ul>
        )
    }
    return null
}