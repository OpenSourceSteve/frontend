import styles from './cases.module.css'

export const CasesList = ({ pages }) => {
    if (pages.length === 2) {
        return <div className={styles.cases}>Cases list contents</div>
    }
    return <div className={styles.cases}>Cases {pages[2]} details content.</div>
}