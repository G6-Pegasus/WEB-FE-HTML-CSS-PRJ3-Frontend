import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOpportunity } from "../services/opportunityServices";
import { OpportunityRow } from "../utils/types";

export const useUpdateOpportunity = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (opportunity: OpportunityRow) => updateOpportunity(opportunity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["opportunities"] })
        },
    })
}