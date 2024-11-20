import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOpportunity } from "../services/opportunityServices";

export const useDeleteOpportunity = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (opportunityId: string) => deleteOpportunity(opportunityId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["opportunities"] })
        },
    })
}