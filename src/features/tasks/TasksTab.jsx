import { useGetTasksQuery } from "./tasksSlice"

export const TasksTab = () => {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTasksQuery()

    if (isSuccess) {
        const { _embedded } = data
        const { tasks } = _embedded
        return (
            <>
                {tasks?.map(charge => <div>{JSON.stringify(charge)}</div>)}
            </>
        )

    }
}