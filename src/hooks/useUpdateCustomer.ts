import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCustomer } from "../services/customerServices";
import { CustomerRow } from "../utils/types";

export const useUpdateCustomer = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: ({ id, data }: { id: number, data: Partial<CustomerRow> }) => updateCustomer(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customers"] })
        },
    })
}