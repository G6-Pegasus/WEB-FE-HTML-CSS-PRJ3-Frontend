import { fetcher } from "./api"

export const getCustomerOpportunities = async (customerId: number) => {
    return await fetcher(`/opportunities?customerId=${customerId}`)
}

export const getOpportunities = async () => {
    return await fetcher("/opportunities");
};