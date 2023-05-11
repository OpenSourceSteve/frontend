import styles from './signup.module.css'

export const Signup = ({ navigateTo }) => {
    return <div className={styles.signup} onClick={() => navigateTo("/signup")}>Signup</div>
}