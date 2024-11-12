import { Opportunity, OpportunityRow } from "../utils/types";
import { fetcher } from "./api"

export const getOpportunities = async () => {
    return await fetcher("/opportunities")
}
export const getCustomerOpportunities = async (customerId: number) => {
    return await fetcher(`/opportunities?customerId=${customerId}`)
}

export const updateOpportunity = async (id: string, data: Partial<OpportunityRow>) => {
    return await fetcher(`/opportunities/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    })
}

export const addOpportunity = async (opportunity: Opportunity) => {
    return await fetcher('/opportunities', {
        method: 'POST',
        body: JSON.stringify(opportunity)
    });
}

export const getOpportunityDetails = async (opportunityId: string) => {
    return await fetcher(`/opportunities/${opportunityId}`);
}

export const deleteOpportunity = async (opportunityId: string) => {
    return await fetcher(`/opportunities/${opportunityId}`, {
        method: "DELETE"
    });
}