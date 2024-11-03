import { opportunity } from '../../utils/types'

interface OpportunityFollowUpTableProps {
    opportunity: opportunity;
}

const OpportunityFollowUpTable = ({ opportunity }: OpportunityFollowUpTableProps) => {
    
    
    return (
        <div>
            <h3>Follow up for opportunity: {opportunity.businessName}</h3>
            <p>ID: {opportunity.id}</p>
            <p>Description: {opportunity.opportunityLongDescription}</p>
            {/* Renderiza más detalles de la oportunidad según sea necesario */}
        </div>
    );
}

export default OpportunityFollowUpTable;