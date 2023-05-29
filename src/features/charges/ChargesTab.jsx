import { useGetChargesQuery } from "./chargesSlice"

export const ChargesTab = () => {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetChargesQuery()

    if (isSuccess) {
        const { _embedded } = data
        const { charges } = _embedded
        return (
            <>
                {charges?.map(charge => <div>{JSON.stringify(charge)}</div>)}
            </>
        )

    }
}