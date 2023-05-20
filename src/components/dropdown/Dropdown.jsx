import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

import { Link } from "../link";

import styles from "./Dropdown.module.css"

export const Dropdown = ({ title }) => {
    const navigate = useNavigate()

    const [show, setShow] = useState(false)

    const keydownHandler = ({ target, keyCode }) => {
        if (keyCode === 13) {
            if (target.id === "account") {
                setShow(!show)
            }
            else {
                navigate(`/${target.dataset['href']}`)
            }
        }
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
            {show && (
                <nav>
                    <ul>
                    {links.map(link => (
                        <li key={link} tabIndex={0} data-href={link} onKeyDown={keydownHandler}>
                            <Link path={link} color={'#41342e'}/>
                        </li>
                    ))}
                    </ul>
                </nav>
            )}
        </div>
    )
}