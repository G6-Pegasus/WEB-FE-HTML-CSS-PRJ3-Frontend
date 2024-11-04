export interface opportunity {
    id: string;
    client: string;
    businessName: string;
    businessLine: string;
    opportunityDescription: string;
    estimatedValue: number;
    estimatedCompletionDate: string;
    status: string;
}

export interface client {
    id: number;
    nit: string;
    name: string;
    address: string;
    city: string;
    country: string; 
    phone: string;
    email: string;
    active :boolean ;

}