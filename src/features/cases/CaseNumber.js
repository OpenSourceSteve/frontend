import { useGetCaseQuery } from './casesSlice'

export const CaseNumber = ({ caseId }) => {

    const {
        data: caseInstance,
        // isLoading,
        // isFetching,
        isSuccess,
        isError,
        // error
    } = useGetCaseQuery(caseId)

    let content

    if (isSuccess) {
        content = <div id="caseNumber">{caseInstance.caseNumber}</div>
    } else if (isError) {
        content = "There was an error:\n" + caseId
    }
    return content
}