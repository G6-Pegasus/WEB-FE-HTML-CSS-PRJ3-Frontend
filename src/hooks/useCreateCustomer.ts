import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCustomer } from "../services/customerServices";
import { Customer } from "../utils/types";

export const useCreateCustomer = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: (customer: Customer) => addCustomer(customer),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customers"] })
        },
    })
}