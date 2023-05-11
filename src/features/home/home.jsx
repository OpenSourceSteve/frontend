import { Header } from '../../components'

import styles from './home.module.css'

export const Home = ({ navigateTo }) => {
    return (
        <>
            <Header page="" navigateTo={navigateTo}/>
            <section>
                "This is the home page"
            </section>
        </>
    )
}