import { useNavigate } from 'react-router-dom'
import styles from './logout.module.css'

export const Logout = () => {
    const navigate = useNavigate()

    return <div className={styles.logout} onClick={() => navigate("/")} >Logout</div>
}