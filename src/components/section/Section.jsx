import styles from './section.module.css'

export const Section = ({ page }) => {
    return <section className={styles.section}>{page} Section</section>
}