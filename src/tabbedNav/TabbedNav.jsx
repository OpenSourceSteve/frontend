import styles from './TabbedNav.module.css'

export const TabbedNav = ({ activeTab, tabs, navTabHandler, children }) => {
        return (
        <>
            <ul className={styles.tabbedNav}>
                {tabs.map(tab => {
                    return (
                        <li key={tab} className={tab === activeTab ? styles.activeTabbedNav : ""} onClick={navTabHandler} data-tab={tab}>{tab}</li>
                    )
                })}
            </ul>
            <div className={styles.activeTab}>
                {children}
            </div>
        </>
    )
}