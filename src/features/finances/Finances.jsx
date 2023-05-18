import { Header, Main, Sidebar, Section, Footer } from '../../components'
import { pages } from '../../app/pages'

import styles from './Finances.module.css'

export const Finances = () => {
    return (
        <>
            <Header currentPage="finances" pages={pages} />
            <Main>
                <Sidebar>

                </Sidebar>
                <Section>
                    <div className={styles.docketHeader}>
                        <h1>Finances</h1>
                    </div>
                    <div>Finances content here</div>
                </Section>
            </Main>
            <Footer />
        </>
    )
}