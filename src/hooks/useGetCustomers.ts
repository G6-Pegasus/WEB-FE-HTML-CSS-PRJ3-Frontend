import { useQuery } from "@tanstack/react-query";
import { fetchCustomers } from "../services/getCustomers";
import { Customer } from "../types/typesCustomers";

export const CustomerHook = () => {
  return useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });
};



