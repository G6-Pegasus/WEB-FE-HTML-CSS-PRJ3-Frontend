import { fetcher } from "./api"

export const getCustomerOpportunities = async (customerId: number) => {
    return await fetcher(`/opportunities?customerId=${customerId}`)
}

export const getOpportunityDetails = async (opportunityId: number) => {
    return await fetcher(`/opportunities/${opportunityId}`);
};