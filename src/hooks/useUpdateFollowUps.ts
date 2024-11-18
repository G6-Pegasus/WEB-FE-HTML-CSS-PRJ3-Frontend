import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFollowUp } from "../services/followUpServices";
import { FollowUpRow } from "../utils/types";

export const useUpdateFollowUps = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (FollowUp: FollowUpRow) => updateFollowUp(FollowUp),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["followUps"] })
        },
    })
}
