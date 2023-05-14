import { Header, Footer } from '../../components'

import styles from './Home.module.css'

export const Home = () => {
    const links = ["login", "signup"]
    return (
        <>
            <Header links={links} />
            <main className={styles.main} >
                <section className={styles.section}>
                    <h1>This is the homepage.</h1>
                    <div>This is homepage content.</div>
                </section>
            </main>
            <Footer />
        </>
    )
}