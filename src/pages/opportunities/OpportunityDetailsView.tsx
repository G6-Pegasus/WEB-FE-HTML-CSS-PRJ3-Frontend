import Main from '../../layout/Main'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

import { Opportunity } from '../../utils/types'

import OpportunityDetails from '../../components/opportunities/OpportunityDetails'
import OpportunityFollowUpTable from '../../components/opportunities/OpportunityFollowUpTable'

const OpportunityDetailsView = () => {
    const { opportunityId =  "0"} = useParams<{ opportunityId: string }>();
    const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

    return <Main>
        <section className="flex flex-col w-full justify-content-center items-center gap-5">
            <OpportunityDetails opportunityId={Number(opportunityId)} onSelectOpportunity={setSelectedOpportunity}/>
            {selectedOpportunity && <OpportunityFollowUpTable opportunity={selectedOpportunity} />}
        </section>
    </Main>
}

export default OpportunityDetailsView