import Main from '../../layout/Main'
import { useParams } from 'react-router-dom'
import TableSkeleton from '../../components/common/TableSkeleton';
import Loader from '../../components/common/Loader';
import ErrorComponent from '../../components/common/ErrorComponent';
import { useGetOpportunityDetails } from '../../hooks/useGetOpportunityDetails';
import OpportunityDetails from '../../components/opportunities/OpportunityDetails'
import OpportunityFollowUpTable from '../../components/opportunities/OpportunityFollowUpTable'

const OpportunityDetailsView = () => {
    const { opportunityId } = useParams<{ opportunityId: string }>();
    const { data: opportunity, error, isLoading } = useGetOpportunityDetails(opportunityId as string)

    return <Main>
        <section className="flex flex-col w-full justify-content-center items-center">
            {isLoading && <div className='w-full h-auto p-6'>
                <Loader />
                <TableSkeleton rows={3} columns={3} />
            </div>}
            {error && <ErrorComponent message={`An error occurred while fetching the information. Contact technical support and show them this code: ${error.message}.`} />}

            {opportunity ? (
                <>
                    <OpportunityDetails opportunity={opportunity}/>
                    <OpportunityFollowUpTable opportunity={opportunity} />
                </>
            ) : (
                <ErrorComponent message={`An error occurred while fetching the information. Contact technical support and show them this code: Opportunity with ID ${opportunityId} not found.`} />
            )}
        </section>
    </Main>
}

export default OpportunityDetailsView