import { useNavigate } from "react-router-dom"

import styles from "./Link.module.css"

export const Link = ({ currentPage, path, color }) => {
    const navigate = useNavigate()

    // const clickHandler = event => {
    //     event.preventDefault();
    //     const href = event.target.dataset['href']

    //     navigate(`/${href}`)
    // }

    const keydownHandler = ({ target, keyCode }) => {
        if (keyCode === 13) {
            navigate(`/${target.dataset['href']}`)
        }
    }

    if (currentPage !== path) {
        return (
            <a href={`/${path}`}
               className={styles.link}
               onKeyDown={keydownHandler}
            //    onClick={clickHandler}
               data-href={`${path}`}
               style={{color}}
            >{path}</a>
        )
    }

    return <div className={styles.activeLink} style={{color}}>{path}</div>
}