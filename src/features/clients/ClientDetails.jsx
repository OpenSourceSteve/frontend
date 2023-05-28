import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetClientQuery } from './clientsSlice'

import { Header, Link, Main, Sidebar, Section, Footer } from '../../components'
import { pages } from '../../app/pages'

import resourceStyles from '../resourceStyles.module.css'

export const ClientDetails = () => {
    const navigate = useNavigate()

    const params = useParams();

    const { clientId } = params;

    const {
        data: client,
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error
    } = useGetClientQuery(clientId)

    useEffect(() => {
        if (isError) {
            if (error.status === 403) {
                navigate("/login")
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, isError])

    const keyDownHandler = event => {
        if (event.keyCode === 13) {
            navigate('/clients')
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
                        <button type="button">Update Client Info</button>
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
                            <p><Link path={`cases`} text="Client Cases" /></p>
                            <p><Link path={`finances`} text="Client Finances" /></p>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            content = <h2>Client Not Found</h2>
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
        </>
    )
}