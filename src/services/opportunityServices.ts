import { fetcher } from "./api"

export const getCustomerOpportunities = async (customerId: string) => {
    return await fetcher(`/opportunities?customerId=${customerId}`)
}