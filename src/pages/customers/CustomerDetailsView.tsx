import { useParams } from "react-router-dom";
import { useState } from "react";
import CustomerOpportunitiesTable from "../../components/customers/CustomerOpportunitiesTable"
import OpportunityFollowUpTable from "../../components/customers/OpportunityFollowUpTable"
import CustomerDetails from '../../components/customers/CustomerDetails';
import { Opportunity } from '../../utils/types';
import Main from '../../layout/Main'

// component definition
const CustomerDetailsView = () => {
    const { customerId =  "0"} = useParams<{ customerId: string }>();
    const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
    
    return <Main>
        <section className="flex flex-col w-full justify-content-center items-center gap-5">
            <CustomerDetails customerId={Number(customerId)} />
            <CustomerOpportunitiesTable customerId={Number(customerId)} onSelectOpportunity={setSelectedOpportunity} />
            {selectedOpportunity && <OpportunityFollowUpTable opportunity={selectedOpportunity} />}
        </section>
    </Main>;
}

export default CustomerDetailsView