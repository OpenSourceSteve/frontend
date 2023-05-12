import { useNavigate } from "react-router-dom";

import styles from './login.module.css'

export const Login = ({ navigateTo }) => {
    const navigate = useNavigate()

    return <div className={styles.login} onClick={() => navigate("/login")}>Login</div>
}