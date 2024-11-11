import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOpportunity } from "../services/opportunityServices";
import { OpportunityRow } from "../utils/types";

export const useUpdateOpportunity = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: Partial<OpportunityRow>}) => updateOpportunity(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["opportunities"] })
        },
    })
}