export interface opportunity {
    [key: string]: string | number | boolean;
    id: string;
    client: string;
    nit: string;
    businessName: string;
    businessLine: string;
    opportunityDescription: string;
    estimatedValue: number;
    estimatedCompletionDate: string;
    status: string;
}

export interface customer {
    [key: string]: string | number | boolean;
    nit: string;
    name: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    corporateEmail: string;
    status: string;
}