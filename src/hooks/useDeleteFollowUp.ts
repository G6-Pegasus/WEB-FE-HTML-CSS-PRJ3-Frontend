import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFollowUp } from "../services/followUpServices";

export const useDeleteFollowUp = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (followUpId: string) => deleteFollowUp(followUpId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["followUps"] })
        },
    })
}