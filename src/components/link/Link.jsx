import { useNavigate } from "react-router-dom"

import styles from "./Link.module.css"

export const Link = ({ currentPage, path, color }) => {
    const navigate = useNavigate()

    const clickHandler = event => {
        event.preventDefault();
        const href = event.target.dataset['href']

        if (href === "/logout") {
            // TODO: POST to /logout
            navigate("/")
        } else {
            navigate(href)
        }
    }

    return (
        <a href={`/${path}`}
               className={path === currentPage ? styles.activeLink : styles.link}
               onClick={clickHandler}
               data-href={`/${path}`}
               style={{color}}
            >{path}</a>
    )
}