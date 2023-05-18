import { Header, Main, Sidebar, Section, Footer } from '../../components'
import { pages } from '../../app/pages'

import styles from './Clients.module.css'

export const ClientsList = () => {
    return (
        <>
            <Header currentPage="clients" pages={pages} />
            <Main>
                <Sidebar>
                    <ul>
                        <li>
                            <button>Add New Client</button>
                        </li>
                        <li>
                            <div>Filter by client name:</div>
                            <input type="text" />
                        </li>
                    </ul>
                </Sidebar>
                <Section>
                    <div className={styles.docketHeader}>
                        <h1>Clients</h1>
                    </div>
                    <div>Clients content here</div>
                </Section>
            </Main>
            <Footer />
        </>
    )
}