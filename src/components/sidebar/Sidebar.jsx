import { CasesSidebar } from '../../features/cases'
import { ClientsSidebar } from '../../features/clients'
import { DocketSidebar } from '../../features/docket'
import { FinancesSidebar } from '../../features/finances'

export const Sidebar = ({ page }) => {

    switch (page) {
        case "docket":
            return <DocketSidebar page={page} />
        case "clients":
            return <ClientsSidebar page={page} />
        case "cases":
            return <CasesSidebar page={page} />
        case "finances":
            return <FinancesSidebar page={page} />
        default:
            throw new Error(`Page ${page} not found`)
    }
}