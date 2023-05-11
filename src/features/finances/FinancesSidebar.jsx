import styles from '../../components/sidebar/sidebar.module.css'
import financesStyles from "./finances.module.css"
Object.assign(styles, financesStyles)

export const FinancesSidebar = () => {
    return <aside className={styles.aside}>Finances Sidebar</aside>
}