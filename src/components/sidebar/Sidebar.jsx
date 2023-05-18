import styles from './sidebar.module.css'

export const Sidebar = ({ children }) => {
    return <aside className={styles.aside}>{ children }</aside>
}