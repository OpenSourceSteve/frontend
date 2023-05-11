import styles from '../../components/sidebar/sidebar.module.css'
import casesStyles from "./cases.module.css"
Object.assign(styles, casesStyles)

export const CasesSidebar = () => {
    return <aside className={styles.aside}>Cases Sidebar</aside>
}