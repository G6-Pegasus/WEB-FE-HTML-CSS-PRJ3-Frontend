import { fetcher } from "./api"
// import { FollowUp, FollowUpRow } from "../utils/types";

export const getFollowUps = async () => {
    return await fetcher("/followUps")
}

export const getOpportunityFollowUps = async (opportunityId: string) => {
    return await fetcher(`/followUps?opportunityId=${opportunityId}`);
};


