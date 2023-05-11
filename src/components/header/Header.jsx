import { HomepageHeader } from './HomepageHeader'
import { LoginHeader } from './LoginHeader'
import { SignupHeader } from './SignupHeader'
import { AppHeader } from './AppHeader'

export const Header = ({ page, navigateTo }) => {

    if (page === "") {
        return <HomepageHeader navigateTo={navigateTo} />
    }

    if (page === "login") {
        return <LoginHeader navigateTo={navigateTo} />
    }

    if (page === "signup") {
        return <SignupHeader navigateTo={navigateTo} />
    }

    return <AppHeader page={page} navigateTo={navigateTo} />
}