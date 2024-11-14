import { useQuery } from "@tanstack/react-query";
import { getFollowUps, getOpportunityFollowUps } from "../services/followUpServices";
import { FollowUp } from "../utils/types";

export const useGetOpportunityFollowUps = (opportunityId: string) => {
    return useQuery<FollowUp[]>({
        queryKey: ['followUps'],
        queryFn: () => getOpportunityFollowUps(opportunityId),
    });
};

export const useGetFollowUps = () => {
    return useQuery<FollowUp[]>({
        queryKey: ["followUps"],
        queryFn: () => getFollowUps(),
    });
};