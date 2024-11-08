import { useQuery } from "@tanstack/react-query";
import { getCustomerOpportunities } from "../services/opportunityServices";
import { Opportunity } from "../utils/types";

export const useGetCustomerOpportunities = (customerId: number) => {
    return useQuery<Opportunity[]>({
        queryKey: ["opportunities"],
        queryFn: () => getCustomerOpportunities(customerId),
    });
};