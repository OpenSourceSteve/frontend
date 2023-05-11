import { HomepageHeader } from './HomepageHeader'
import { LoginHeader } from './LoginHeader'
import { SignupHeader } from './SignupHeader'
import { AppHeader } from './AppHeader'

export const Header = ({ pages, navigateTo }) => {
    if (pages[1] === "") {
        return <HomepageHeader navigateTo={navigateTo} />
    }

    if (pages[1] === "login") {
        return <LoginHeader navigateTo={navigateTo} />
    }

    if (pages[1] === "signup") {
        return <SignupHeader navigateTo={navigateTo} />
    }

    return <AppHeader pages={pages} navigateTo={navigateTo} />
}