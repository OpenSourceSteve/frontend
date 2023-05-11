import styles from './logo.module.css'

export const Logo = ({ navigateTo }) => {
    return <div className={styles.logo} onClick={() => navigateTo(["", ""])}>EasyLegal.app</div>
}