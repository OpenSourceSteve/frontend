import { CasesSidebar } from '../../features/cases'
import { ClientsSidebar } from '../../features/clients'
import { DocketSidebar } from '../../features/docket'
import { FinancesSidebar } from '../../features/finances'

export const Sidebar = ({ page }) => {

    switch (page) {
        case "docket":
            return <DocketSidebar />
        case "clients":
            return <ClientsSidebar />
        case "cases":
            return <CasesSidebar />
        case "finances":
            return <FinancesSidebar />
        default:
            throw new Error("Page not found")
    }
}