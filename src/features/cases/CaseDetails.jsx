import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetCaseQuery } from './casesSlice'

import { Header, Link, Main, Sidebar, Section, Footer } from '../../components'
import { pages } from '../../app/pages'

import resourceStyles from '../resourceStyles.module.css'

export const CaseDetails = () => {
    const navigate = useNavigate()

    const params = useParams();

    const { caseId } = params;

    const {
        data: caseInstance,
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error
    } = useGetCaseQuery(caseId)

    useEffect(() => {
        if (isError) {
            if (error.status === 403) {
                navigate("/login")
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, isError])



    let content
    if (isLoading) {
        <h2 className={resourceStyles.resourceLoading}>Loading...</h2>
    } else if (isSuccess) {
        if (caseInstance) {
            content = (
                <div className={resourceStyles.resourceDetailsView}>
                    <div className={resourceStyles.resourceDetailsHeader}>
                        <h2>Case: {caseInstance.caseNumber}</h2>
                        <button type="button">Update Case Info</button>
                    </div>
                    <div>
                        <div>Court: {caseInstance.court}</div>
                        <div>Judge: {caseInstance.judge}</div>
                        <div>Jurisdiction: {caseInstance.jurisdiction}</div>
                        <div>Prosecutor: {caseInstance.prosecutor}</div>
                        <div>Client: {caseInstance._links.client.href}</div>
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
            <Header currentPage="cases" pages={pages} />
            <Main>
                <Sidebar>
                    <ul>
                        <li>
                            <Link path="cases" text="Back to Cases List" />
                        </li>
                    </ul>
                </Sidebar>
                <Section className={resourceStyles.section}>
                    {content}
                </Section>
            </Main>
            <Footer />
        </>
    )
}