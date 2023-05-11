import styles from '../../components/sidebar/sidebar.module.css'
import docketStyles from "./docket.module.css"
Object.assign(styles, docketStyles)

export const DocketSidebar = () => {
    return <aside className={styles.aside}>Docket Sidebar</aside>
}