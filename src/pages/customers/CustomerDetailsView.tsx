import { useParams } from "react-router-dom";
import ClientOpportunitiesTable from "../../components/customers/ClientOpportunitiesTable"

const CustomerDetailsView = () => {
    const { customerId =  "900789123"} = useParams<{ customerId: string }>();
    
    return <>
        <h1>Customer Details</h1>
        <h2>Top section</h2>
        <h2>Middle section</h2>
        <ClientOpportunitiesTable customerId={customerId} />
        <h2>Bottom section</h2>
    </>;
        
    
}

export default CustomerDetailsView