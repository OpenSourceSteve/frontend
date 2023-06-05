import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// import API calls
import {
    useGetClientQuery,
    useUpdateClientMutation
} from './clientsSlice'

// import components
import { Header, Link, Main, Sidebar, Section, Footer } from '../../components'
import { ClientInputModal } from './ClientInputModal'

import { pages } from '../../app/pages'

// import styles
import resourceStyles from '../resourceStyles.module.css'
import styles from './Clients.module.css'

export const ClientDetails = () => {
    const navigate = useNavigate()

    const [updateClient, { isError: isUpdateError }] = useUpdateClientMutation()

    const dialogRef = useRef(null)

    const params = useParams();

    const { clientId } = params;

    const {
        data: client,
        isLoading,
        isSuccess,
        isError: isLoadError,
        error
    } = useGetClientQuery(clientId)

    const keyDownHandler = event => {
        if (event.keyCode === 13) {
            navigate('/clients')
        }
    }

    const toggleClientForm = () => {
        if (dialogRef.current.open) {
            dialogRef.current.close()
        } else {
            dialogRef.current.showModal()
        }
    }

    const submitHandler = async client => {
        if (client.firstName && client.lastName && (client.phone || client.email)) {
            delete client.createCase
            await updateClient(client).unwrap()
        }
    }

    let content

    if (isLoading) {
        <h2 className={resourceStyles.resourceLoading}>Loading...</h2>
    } else if (isSuccess) {
        if (client) {
            content = (
                <div className={resourceStyles.resourceDetailsView}>
                    <div className={resourceStyles.resourceDetailsHeader}>
                        <h2>Client: {client.firstName} {client.lastName}</h2>
                        <button onClick={toggleClientForm}
                            tabIndex={0}
                            type="button">Update Client Info</button>
                    </div>
                    <div>
                        <p>DOB: {client.dob}</p>
                        <div>
                            <h2>Contact Info</h2>
                            <p>Phone: {client.phone}</p>
                            <p>Email: {client.email}</p>
                        </div>
                        <p>Referral Source: {client.referralSource}</p>
                        <div>
                            <h2>Address</h2>
                            <p>Address 1: {client.address1}</p>
                            <p>Address 2: {client.address2}</p>
                            <p>City: {client.city}</p>
                            <p>State: {client.state}</p>
                            <p>Zip: {client.zip}</p>
                        </div>
                        <div>
                            <h2>Links to:</h2>
                            <Link path={`cases`} text="Client Cases" />
                            <Link path={`finances`} text="Client Finances" />
                        </div>
                    </div>
                </div>
            )
        }
        else {
            content = <h2>Client Not Found</h2>
        }
    }
    else if (isLoadError) {
        if (error.status === 403) {
            navigate("/login")
        }
    }

    return (
        <>
            <Header currentPage="clients" pages={pages} />
            <Main>
                <Sidebar>
                    <ul>
                        <li tabIndex={0} onKeyDown={keyDownHandler}>
                            <Link path="clients" text="Back to Clients List" />
                        </li>
                    </ul>
                </Sidebar>
                <Section>
                    {content}
                </Section>
            </Main>
            <Footer />
            {client && <ClientInputModal closeHandler={toggleClientForm}
                submitHandler={submitHandler}
                ref={dialogRef}
                client={client}
            />}
        </>
    )
}