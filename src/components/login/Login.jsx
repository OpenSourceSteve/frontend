import styles from './login.module.css'

export const Login = ({ navigateTo }) => {
    return <div className={styles.login} onClick={() => navigateTo("login")}>Login</div>
}