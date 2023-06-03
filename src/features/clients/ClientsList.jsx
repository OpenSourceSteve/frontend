import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// import API calls
import {
    useCreateClientMutation,
    useGetClientsQuery
} from './clientsSlice';

// import components
import { Header, Main, Sidebar, Section, Footer } from '../../components'
import { ClientInputModal } from './ClientInputModal'
import { ClientsEmptyState } from './ClientsEmptyState';

import { pages } from '../../app/pages'

// import styles
import resourceStyles from '../resourceStyles.module.css'
import styles from './Clients.module.css'

export const ClientsList = () => {
    const navigate = useNavigate()

    const [createClient, { isError: isCreateError }] = useCreateClientMutation()

    const dialogRef = useRef(null)

    const {
        data: clients,
        isLoading,
        isSuccess,
        isError: isLoadError,
        error
    } = useGetClientsQuery()

    const keyDownHandler = event => {
        if (event.keyCode === 13) {
            navigate(`/clients/${event.target.dataset['clientId']}`)
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
            delete client.id
            const { _links } = await createClient(client).unwrap()
            const { self } = _links
            const { href } = self
            if (client.createCase) {
                if (!isCreateError) {
                    const clientId = href.split("/users/")[1]
                    navigate(`/cases?createFor=${clientId}`)
                }
            }
        }
    }

    const clickHandler = event => {
        event.preventDefault()
        navigate(`/clients/${event.target.parentElement.dataset['clientId']}`)
    }

    let content

    if (isLoading) {
        content = <h2 className={resourceStyles.resourceLoading}>Loading...</h2>
    }
    else if (isSuccess) {
        // A11Y NOTE: Firefox needs onKeyDown handler on anchor, Chrome needs on div & anchor
        if (clients.length === 0) {
            content = <ClientsEmptyState />
        } else {
            content = (
                <div className={resourceStyles.resourceList}>
                    <div className={styles.resourceListHeader}>
                        <div>Last Name</div>
                        <div>First Name</div>
                        <div>Phone Number</div>
                        <div>Email</div>
                    </div>
                    <div className={resourceStyles.resourceListBody}>
                        {clients.map(client => (
                            <div key={client.id}
                                tabIndex={0}
                                className={resourceStyles.resourceListRow}
                                data-client-id={client.id}
                                onKeyDown={keyDownHandler}
                                onClick={clickHandler}>
                                <a
                                    className={styles.resourceListRow}
                                    onKeyDown={keyDownHandler}
                                    data-client-id={client.id}
                                    onClick={clickHandler}
                                    href={`clients/${client.id}`}
                                >
                                    <div>{client.lastName}</div>
                                    <div>{client.firstName}</div>
                                    <div>{client.phone}</div>
                                    <div>{client.email}</div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )
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
                    {clients?.length > 0 && (
                        <ul>
                            <li>
                                <button onClick={toggleClientForm}>Add New Client</button>
                            </li>
                            <li>
                                <div>Filter by client name:</div>
                                <input type="text" />
                            </li>
                        </ul>
                    )}
                </Sidebar>
                <Section>
                    <h1>Clients</h1>
                    {content}
                </Section>
            </Main>
            <Footer />
            <ClientInputModal closeHandler={toggleClientForm}
                submitHandler={submitHandler}
                ref={dialogRef}
            />
        </>
    )
}