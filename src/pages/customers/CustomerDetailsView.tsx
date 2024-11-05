import { useParams } from "react-router-dom";
import { useState } from "react";
import CustomerOpportunitiesTable from "../../components/customers/CustomerOpportunitiesTable"
import OpportunityFollowUpTable from "../../components/customers/OpportunityFollowUpTable"
import CustomerDetails from '../../components/customers/CustomerDetails';
import { useGetCustomerDetails } from '../../hooks/useGetCustomerDetails';
import { Opportunity } from '../../utils/types';
import Main from '../../layout/Main'

// component definition
const CustomerDetailsView = () => {
    const { customerId =  ""} = useParams<{ customerId: string }>();
    const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
    const { data: customer, error, isLoading } = useGetCustomerDetails(customerId)

    if (isLoading) return <div>Loading client details...</div>;
    if (error) return <div>Error loading client details: {error.message}</div>;
    if (!customer) return <div>Customer not found.</div>;
    
    return <Main>
        <section className="flex flex-col gap-5">
            <CustomerDetails customer={customer} />
            <CustomerOpportunitiesTable customer={customer} onSelectOpportunity={setSelectedOpportunity} />
            {selectedOpportunity && <OpportunityFollowUpTable opportunity={selectedOpportunity} />}
        </section>
    </Main>;
}

export default CustomerDetailsView