import {
    CasesList,
    ClientsList,
    Docket,
    Finances,
    Home,
    Login,
    Signup,
    NotFound
} from '../../features'

import styles from './section.module.css'

export const Section = ({ pages }) => {
    const pageSectionMap = {
        "": <Home />,
        "cases": <CasesList pages={pages} />,
        "clients":<ClientsList pages={pages} />,
        "docket": <Docket />,
        "finances": <Finances />,
        "login": <Login />,
        "signup": <Signup />
    }

    return (
        <section className={styles.section}>
            <h1>This is the {pages[1] === "" ? "Home" : pages[1]} page</h1>
            {pageSectionMap[pages[1]] || <NotFound />}
        </section>
    )
}