import styles from '../../components/sidebar/sidebar.module.css'
import clientsStyles from "./clients.module.css"
Object.assign(styles, clientsStyles)

export const ClientsSidebar = () => {
    return <aside className={styles.aside}>Clients Sidebar</aside>
}