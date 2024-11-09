import { useQuery } from "@tanstack/react-query";
import { getOpportunities, getCustomerOpportunities } from "../services/opportunityServices";
import { Opportunity } from "../utils/types";

export const useGetCustomerOpportunities = (customerId: number) => {
    return useQuery<Opportunity[]>({
        queryKey: ["opportunities"],
        queryFn: () => getCustomerOpportunities(customerId),
    });
};

export const useGetOpportunities = () => {
    return useQuery<Opportunity[]>({
        queryKey: ["opportunities"],
        queryFn: () => getOpportunities(),
    });
};





