import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

import { Link } from "../link";

import styles from "./Dropdown.module.css"

export const Dropdown = ({ title }) => {
    const navigate = useNavigate()

    const [show, setShow] = useState(false)

    const keydownHandler = event => {
        return event.keyCode !== 13 || setShow(!show);
    }

    const offclick = ({ target }) => {
        if (target.id !== "account") {
            setShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener("click", offclick)
    })



    const toggleShow = () => {
        setShow(!show)
    }

    const links = ["profile", "settings", "logout"]

    return (
        <div className={styles.dropdown}>
            <div tabIndex={0}
                 onKeyDown={keydownHandler}
                 id="account"
                 className={styles.title}
                 onClick={toggleShow}
            >{title}</div>
            {show && <div><ul className={styles.ul} >
                {links.map(link => <li><Link key={link} path={link} color={'#41342e'}/></li>)}
            </ul></div>}
        </div>
    )
}