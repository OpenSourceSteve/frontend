import { useNavigate } from "react-router-dom";

import styles from './signup.module.css'

export const Signup = ({ navigateTo }) => {
    const navigate = useNavigate()

    return <div className={styles.signup} onClick={() => navigate("/signup")}>Signup</div>
}