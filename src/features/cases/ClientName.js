import { useGetClientQuery } from '../clients/clientsSlice'

export const ClientName = ({ clientId }) => {

    const {
        data: client,
        // isLoading,
        // isFetching,
        isSuccess,
        isError,
        // error
    } = useGetClientQuery(clientId)

    let content

    if (isSuccess) {
        content = <div id="clientName">{client.firstName + " " + client.lastName}</div>
    } else if (isError) {
        content = "There was an error:\n" + clientId
    }
    return content
}