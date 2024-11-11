import { OpportunityRow } from "../utils/types";
import { fetcher } from "./api";

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
export const getOpportunityByID = async (id: number) => {
    return await fetcher(`/opportunities/${id}`)
}