import { fetcher } from "./api"
import { FollowUpRow } from "../utils/types";

export const getFollowUps = async () => {
    return await fetcher("/followUps")
}

export const getOpportunityFollowUps = async (opportunityId: string) => {
    return await fetcher(`/followUps?opportunityId=${opportunityId}`);
}
export const getFollowUpsByID =async (followUpId :string)=>{
    return await fetcher(`/followUps?id=${followUpId}`)
}
export const updateFollowUp = async (followUp: FollowUpRow) => {
    return await fetcher(`/followUps/${followUp.id}`, {
        method: "PUT",
        body: JSON.stringify(followUp),
      })
}