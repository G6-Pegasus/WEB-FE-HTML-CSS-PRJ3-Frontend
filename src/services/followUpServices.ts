import { fetcher } from "./api"
import { FollowUp } from "../utils/types";

export const getFollowUps = async () => {
    return await fetcher("/followUps")
}

export const getOpportunityFollowUps = async (opportunityId: string) => {
    return await fetcher(`/followUps?opportunityId=${opportunityId}`);
}

export const getFollowUpsByID =async (followUpId: string)=>{
    return await fetcher(`/followUps/${followUpId}`)
}

export const addFollowUp = async (followUp: FollowUp) => {
    return await fetcher(`/followUps`, {
        method: "POST",
        body: JSON.stringify(followUp),
    })
}

export const updateFollowUp = async (followUp: FollowUp) => {
    return await fetcher(`/followUps/${followUp.id}`, {
        method: "PATCH",
        body: JSON.stringify(followUp),
    })
}

export const deleteFollowUp = async (followUpId: string) => {
    return await fetcher(`/followUps/${followUpId}`, {
        method: "DELETE"
    })
}