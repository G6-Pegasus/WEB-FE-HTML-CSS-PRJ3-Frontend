// hook imports
import { useParams } from "react-router-dom";
import { useState } from "react";

// component imports
import ClientOpportunitiesTable from "../../components/customers/ClientOpportunitiesTable"
import OpportunityFollowUpTable from "../../components/customers/OpportunityFollowUpTable"

//type imports
import { opportunity } from '../../utils/types';

// component definition
const CustomerDetailsView = () => {
    // hook implementation
    const { customerNIT =  "900123456"} = useParams<{ customerNIT: string }>();
    const [selectedOpportunity, setSelectedOpportunity] = useState<opportunity | null>(null);
    
    return <>
        <h1>Customer Details</h1>
        <h2>Top section</h2>
        <h2>Middle section</h2>
        <ClientOpportunitiesTable customerNIT={customerNIT} onSelectOpportunity={setSelectedOpportunity} />
        {selectedOpportunity && <OpportunityFollowUpTable opportunity={selectedOpportunity} />}
        <h2>Bottom section</h2>
    </>;
}

export default CustomerDetailsView