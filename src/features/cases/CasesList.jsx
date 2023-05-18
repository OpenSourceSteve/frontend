import { Header, Main, Sidebar, Section, Footer } from '../../components'
import { pages } from '../../app/pages'

import styles from './Cases.module.css'

export const CasesList = () => {
    return (
        <>
            <Header currentPage="cases" pages={pages} />
            <Main>
                <Sidebar>
                    <ul>
                        <li>
                            <button>Create New Case</button>
                        </li>
                        <li>
                            <div>Case Types:</div>
                            <ul>
                                <li><input type='checkbox' />Open</li>
                                <li><input type='checkbox' />Closed</li>
                                <li><input type='checkbox' />Civil</li>
                                <li><input type='checkbox' />Criminal</li>
                            </ul>
                        </li>
                        <li>
                            <div>Search:</div>
                            <input type="text" />
                        </li>
                    </ul>
                </Sidebar>
                <Section>
                    <div className={styles.docketHeader}>
                        <h1>Cases</h1>
                    </div>
                    <div>Cases content here</div>
                </Section>
            </Main>
            <Footer />
        </>
    )
}