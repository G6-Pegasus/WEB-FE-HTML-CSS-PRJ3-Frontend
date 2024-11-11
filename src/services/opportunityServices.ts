import { Opportunity } from "../utils/types";
import { fetcher } from "./api"

export const getCustomerOpportunities = async (customerId: number) => {
    return await fetcher(`/opportunities?customerId=${customerId}`)
}

export const addOpportunity = async (opportunity: Opportunity) => {
    return await fetcher('/opportunities', {
        method: 'POST',
        body: JSON.stringify(opportunity)
    });
};