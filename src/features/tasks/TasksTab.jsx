import { useGetTasksQuery } from "./tasksSlice"

export const TasksTab = () => {
    const {
        data: tasks,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTasksQuery()

    if (isSuccess) {
        // const { _embedded } = data
        // const { tasks } = _embedded
        return (
            <>
                {tasks.length === 0 && <div>No tasks to show.</div>}
                {tasks?.map(charge => <div>{JSON.stringify(charge)}</div>)}
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
                <div>This was an error retrieving tasks.</div>
                {errorInfo}
            </>
        )
    }
}