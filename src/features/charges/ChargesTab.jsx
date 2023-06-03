import { useNavigate } from "react-router-dom"

import { useGetChargesQuery } from "./chargesSlice"

export const ChargesTab = () => {
    const navigate = useNavigate()

    const {
        data: charges,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetChargesQuery()

    if (isSuccess) {
        // const { _embedded } = data
        // const { charges } = _embedded
        return (
            <>
                {charges.length === 0 && <div>No charges to show.</div>}
                {charges?.map(charge => <div>{JSON.stringify(charge)}</div>)}
            </>
        )
    }
    if (isError) {
        if (error.status === 403) {
            navigate("/login")
        }
        const { timestamp, status, error: errorError, message, path } = error.data
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
                <div>This was an error retrieving charges.</div>
                {errorInfo}
            </>
        )
    }
}