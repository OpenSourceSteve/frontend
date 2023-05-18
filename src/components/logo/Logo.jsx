import { useNavigate } from "react-router-dom";

import styles from './logo.module.css'

export const Logo = () => {
    const navigate = useNavigate()

    const keydownHandler = event => {
        return event.keyCode !== 13 || navigate(event.target.dataset['href']);
    }

    const clickHandler = event => {
        navigate(event.target.dataset['href'])
    }

    return <div tabIndex={0}
                className={styles.logo}
                onKeyDown={keydownHandler}
                onClick={clickHandler}
                data-href="/"
            >[LOGO_HERE]</div>
}