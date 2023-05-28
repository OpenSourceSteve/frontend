import { useNavigate } from "react-router-dom"

import styles from "./Link.module.css"

export const Link = ({ currentPage, path, text, color }) => {
    const navigate = useNavigate()

    const clickHandler = event => {
        event.preventDefault();
        const href = event.target.dataset['href']

        navigate(`/${href}`)
    }

    const keydownHandler = ({ target, keyCode }) => {
        console.log("keydownHandler()")
        if (keyCode === 13) {
            navigate(`/${target.dataset['href']}`)
        }
    }

    if (currentPage !== path) {
        return (
            <div tabIndex={0} onKeyDown={keydownHandler} data-href={`${path}`}>
                <a href={`/${path}`}
                    className={styles.link}
                    onKeyDown={keydownHandler}
                    onClick={clickHandler}
                    data-href={`${path}`}
                    style={{ color }}
                >{text || path}</a>
            </div>
        )
    }

    return <div className={styles.activeLink} style={{ color }}>{path}</div>
}