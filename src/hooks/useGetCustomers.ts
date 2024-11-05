import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../services/customerServices";
import { Customer } from "../utils/types";

export const useGetCustomers = () => {
    return useQuery<Customer[]>({
        queryKey: ["customers"],
        queryFn: () => getCustomers(),
    });
};