import { fetcher } from "./api" 

export type ClientType = {
  name: string;
  nit: number;
  direction: string;
  city: string;
  country: string;
  phone: number;
  email: string;
  isActive: boolean;
  contacts: Array<{ cname: string; cemail: string; cphone: string }>;
};

export const addClient = async (client: ClientType) => {
  return await fetcher('/customers', {
    method: 'POST',
    body: JSON.stringify(client),
  });
};
