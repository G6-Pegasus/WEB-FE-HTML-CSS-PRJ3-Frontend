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
        <h1>Customer Details</h1>
        <h2>Top section</h2>
        <CustomerDetails customer={customer} />
        <h2>Middle section</h2>
        <CustomerOpportunitiesTable customer={customer} onSelectOpportunity={setSelectedOpportunity} />
        <h2>Bottom section</h2>
        {selectedOpportunity && <OpportunityFollowUpTable opportunity={selectedOpportunity} />}
    </Main>;
}

export default CustomerDetailsView