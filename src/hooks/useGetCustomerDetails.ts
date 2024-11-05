import { useQuery } from "@tanstack/react-query";
import { getCustomerDetails } from "../services/customerServices";
import { Customer } from "../utils/types";

export const useGetCustomerDetails = (customerId: number) => {
    return useQuery<Customer>({
        queryKey: ['customerDetails', customerId],
        queryFn: () => getCustomerDetails(customerId)
    });
};