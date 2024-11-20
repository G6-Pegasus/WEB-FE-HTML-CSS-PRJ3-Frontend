import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFollowUp } from "../services/followUpServices";
import { FollowUp } from "../utils/types";

export const useUpdateFollowUp = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (FollowUp: FollowUp) => updateFollowUp(FollowUp),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["followUps"] })
        },
    })
}
