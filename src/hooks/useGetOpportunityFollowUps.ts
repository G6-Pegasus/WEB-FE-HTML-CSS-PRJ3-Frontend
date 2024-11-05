import { useQuery } from "@tanstack/react-query";
import { getOpportunityFollowUps } from "../services/followUpServices";
import { FollowUp } from "../utils/types";

export const useGetOpportunityFollowUps = (opportunityId: string) => {
    return useQuery<FollowUp[]>({
        queryKey: ['opportunityFollowUps', opportunityId],
        queryFn: () => getOpportunityFollowUps(opportunityId)
    });
};