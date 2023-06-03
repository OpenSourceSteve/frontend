import { useGetFinancesQuery } from "./financesSlice"

export const FinancesTab = () => {
    const {
        data: finances,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetFinancesQuery()

    if (isSuccess) {
        // console.log("data", data)
        // const { _embedded } = data
        // const { finances } = _embedded
        return (
            <>
                {finances.length === 0 && <div>No finances to show.</div>}
                {finances?.map(event => <div>{JSON.stringify(event)}</div>)}
            </>
        )
    }

    if (isError) {
        console.log(error)
        const { timestamp, status, error: errorError, message, path} = error.data
        const errorInfo = (
            <>
                <div>Timestamp: {timestamp}</div>
                <div>Status: {status}</div>
                <div>Error: {errorError}</div>
                <div>Message: {message}</div>
                <div>Path: {path}</div>
            </>
        )
        return (
            <>
                <div>This was an error retrieving finances.</div>
                {errorInfo}
            </>
        )
    }
}