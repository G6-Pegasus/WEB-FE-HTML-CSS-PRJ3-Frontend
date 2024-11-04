import { fetcher } from "./api";

export const fetchCustomers = () => {
  return fetcher("/customers");
};
