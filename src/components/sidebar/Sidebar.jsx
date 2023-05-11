import { CasesSidebar } from '../../features/cases'
import { ClientsSidebar } from '../../features/clients'
import { DocketSidebar } from '../../features/docket'
import { FinancesSidebar } from '../../features/finances'

export const Sidebar = ({ pages }) => {

    switch (pages[1]) {
        case "docket":
            return <DocketSidebar pages={pages} />
        case "clients":
            return <ClientsSidebar pages={pages} />
        case "cases":
            return <CasesSidebar pages={pages} />
        case "finances":
            return <FinancesSidebar pages={pages} />
        default:
            console.log("pages[1]:", pages[1])
            throw new Error("Page not found")
    }
}