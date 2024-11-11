import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOpportunity } from "../services/opportunityServices";
import { Opportunity } from "../utils/types";

export const useCreateOpportunity = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: (opportunity: Opportunity) => addOpportunity(opportunity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["opportunities"] })
        },
    })
}