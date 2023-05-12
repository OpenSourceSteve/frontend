import {
    CaseDetails,
    CasesList,
    ClientDetails,
    ClientsList,
    Docket,
    Finances,
    Home,
    Login,
    Signup,
    NotFound
} from '../../features'

import styles from './section.module.css'

export const Section = ({ page }) => {
    const pageSectionMap = {
        "home": <Home />,
        "cases": <CasesList />,
        "clients":<ClientsList />,
        "docket": <Docket />,
        "finances": <Finances />,
        "login": <Login />,
        "signup": <Signup />
    }

    return (
        <section className={styles.section}>
            <h1>This is the {page === "" ? "Home" : page} page</h1>
            {pageSectionMap[page] || <NotFound />}
        </section>
    )
}