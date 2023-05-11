import styles from './logout.module.css'

export const Logout = ({ navigateTo }) => {
    return <div className={styles.logout} onClick={() => navigateTo(["", ""])} >Logout</div>
}