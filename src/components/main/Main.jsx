import styles from './Main.module.css'

export const Main = ({ children }) => {
    return (
        <main className={styles.main}>
            <div className={styles.container}>{children}</div>
        </main>
    )
}