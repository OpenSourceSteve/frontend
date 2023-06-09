import { useGetNotesQuery } from "./notesSlice"

export const NotesTab = () => {
    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery()

    if (isSuccess) {
        // const { _embedded } = data
        // const { notes } = _embedded
        return (
            <>
                {notes.length === 0 && <div>No notes to show.</div>}
                {notes?.map(charge => <div>{JSON.stringify(charge)}</div>)}
            </>
        )

    }

    if (isError) {
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
                <div>This was an error retrieving notes.</div>
                {errorInfo}
            </>
        )
    }
}