import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

import { Dropdown } from "../dropdown"

import styles from "./Account.module.css"

export const Account = () => {
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
        <>
            <div tabIndex={0} onKeyDown={keydownHandler} id="account" className={styles.account} onClick={toggleShow} >Account</div>
            <Dropdown show={show} links={links} />
        </>
    )
}