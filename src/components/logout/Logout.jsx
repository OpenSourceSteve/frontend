import styles from './logout.module.css'

export const Logout = ({ navigateTo }) => {
    const logout = () => {
        console.log("logging out...")
        navigateTo("/")
    }
    return <div className={styles.logout} onClick={logout} >Logout</div>
}