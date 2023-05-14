import { useNavigate } from "react-router-dom"

import styles from "./Link.module.css"

export const Link = ({ path }) => {
    const navigate = useNavigate()

    const keydownHandler = event => {
        if (event.keyCode !== 13) {
            return false;
        }

        const href = event.target.dataset['href']

        if (href === "/logout") {
            // TODO: POST to /logout
            navigate("/")
        } else {
            console.log(href)
            navigate(href)
        }
    }

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
        <div tabIndex={0}
            className={styles.login}
            onKeyDown={keydownHandler}
            data-href={`/${path}`}>

            <a href={`/${path}`}
                onClick={clickHandler}
                data-href={`/${path}`}
            >{path}</a>

        </div>
    )
}