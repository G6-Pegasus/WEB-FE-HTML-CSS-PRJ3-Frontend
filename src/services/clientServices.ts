import { fetcher } from "./api" 

export type ClientType = {
  name: string;
  nit: number;
  direction: string;
  city: string;
  country: string;
  phone: number;
  cEmail: string;
  contacts: Array<{ name: string; email: string; phone: string }>;
};

export const addClient = async (client: ClientType) => {
  return await fetcher('/api/clients', {
    method: 'POST',
    body: JSON.stringify(client),
  });
};
