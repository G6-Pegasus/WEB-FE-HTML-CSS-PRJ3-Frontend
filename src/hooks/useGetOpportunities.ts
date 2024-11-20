import { useQuery } from "@tanstack/react-query";
import { getOpportunities } from "../services/opportunityServices";
import { Opportunity } from "../utils/types";

export const useGetOpportunities = () => {
    return useQuery<Opportunity[]>({
        queryKey: ['opportunities'],
        queryFn: () => getOpportunities()
    });
};