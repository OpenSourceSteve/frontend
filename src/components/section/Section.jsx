import styles from './section.module.css'

export const Section = ({ children }) => {
    return <section className={styles.section}>{children}</section>
}