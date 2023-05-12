import { HomepageHeader } from './HomepageHeader'
import { LoginHeader } from './LoginHeader'
import { SignupHeader } from './SignupHeader'
import { AppHeader } from './AppHeader'

export const Header = ({ page }) => {
    if (page === "") {
        return <HomepageHeader  />
    }

    if (page === "login") {
        return <LoginHeader  />
    }

    if (page === "signup") {
        return <SignupHeader  />
    }

    return <AppHeader page={page} />
}