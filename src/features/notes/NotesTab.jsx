import { useGetNotesQuery } from "./notesSlice"

export const NotesTab = () => {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery()

    if (isSuccess) {
        const { _embedded } = data
        const { notes } = _embedded
        return (
            <>
                {notes?.map(charge => <div>{JSON.stringify(charge)}</div>)}
            </>
        )

    }
}