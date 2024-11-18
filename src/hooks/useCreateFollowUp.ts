import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFollowUp } from "../services/followUpServices";
import { FollowUp } from "../utils/types";

export const useCreateFollowUp = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (FollowUp: FollowUp) => addFollowUp(FollowUp),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["followUps"] })
        },
    })
}
