import { Opportunity, OpportunityRow } from "../utils/types";
import { fetcher } from "./api"

export const getOpportunities = async () => {
    return await fetcher("/opportunities")
}
export const getCustomerOpportunities = async (customerId: number) => {
    return await fetcher(`/opportunities?customerId=${customerId}`)
}

export const updateOpportunity = async (opportunity: OpportunityRow) => {
    return await fetcher(`/opportunities/${opportunity.id}`, {
        method: 'PUT',
        body: JSON.stringify(opportunity)
    })
}

export const addOpportunity = async (opportunity: Opportunity) => {
    return await fetcher('/opportunities', {
        method: 'POST',
        body: JSON.stringify(opportunity)
    });
}

export const getOpportunityDetails = async (opportunityId: number) => {
    return await fetcher(`/opportunities/${opportunityId}`);
}

export const getOpportunities = async () => {
    return await fetcher("/opportunities");
};
