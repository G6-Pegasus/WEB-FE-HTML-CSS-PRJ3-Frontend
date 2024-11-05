import { fetcher } from "./api"

export const getOpportunityFollowUps = async (opportunityId: string) => {
    return await fetcher(`/followUps?opportunityId=${opportunityId}`);
};