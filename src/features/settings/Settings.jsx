import { Header, Main, Sidebar, Section, Footer } from '../../components'
import { pages } from '../../app/pages'

import styles from './Settings.module.css'

export const Settings = () => {
    return (
        <>
            <Header pages={pages} />
            <Main>
                <Sidebar>

                </Sidebar>
                <Section>
                    <div className={styles.docketHeader}>
                        <h1>Settings</h1>
                    </div>
                    <div>Settings content here</div>
                </Section>
            </Main>
            <Footer />
        </>
    )
}