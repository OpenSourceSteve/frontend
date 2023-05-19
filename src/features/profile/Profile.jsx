import { Header, Main, Sidebar, Section, Footer } from '../../components'
import { pages } from '../../app/pages'

import styles from './Profile.module.css'

export const Profile = () => {
    return (
        <>
            <Header pages={pages} />
            <Main>
                <Sidebar>

                </Sidebar>
                <Section>
                    <div className={styles.docketHeader}>
                        <h1>Profile</h1>
                    </div>
                    <div>Profile content here</div>
                </Section>
            </Main>
            <Footer />
        </>
    )
}