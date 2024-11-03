
export type Customer = {
    id: number;
    nit: string;
    name: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    active: boolean;
  };
  
  export type CustomerRow ={
    id: number;
    nit: string;
    name: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    active: boolean;
    hasChanged?: boolean;
  }