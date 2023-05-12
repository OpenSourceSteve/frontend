import { useNavigate } from "react-router-dom";

import styles from './logo.module.css'

export const Logo = ({ navigateTo }) => {
    const navigate = useNavigate()

    return <div className={styles.logo} onClick={() => navigate("/")}>LOGO_HERE</div>
}