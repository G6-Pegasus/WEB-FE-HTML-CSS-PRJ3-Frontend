import { useQuery } from "@tanstack/react-query";
import { getOpportunityDetails } from "../services/opportunityServices";
import { Opportunity } from "../utils/types";

export const useGetOpportunityDetails = (opportunityId: string) => {
    return useQuery<Opportunity>({
        queryKey: ['opportunityDetails', opportunityId],
        queryFn: () => getOpportunityDetails(opportunityId)
    });
};