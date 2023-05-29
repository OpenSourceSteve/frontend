import { useGetEventsQuery } from "./eventsSlice"

export const EventsTab = () => {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetEventsQuery()

    if (isSuccess) {
        const { _embedded } = data
        const { events } = _embedded
        return (
            <>
                {events?.map(event => <div>{JSON.stringify(event)}</div>)}
            </>
        )

    }
}