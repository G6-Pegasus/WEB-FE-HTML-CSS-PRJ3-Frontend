export interface followUpSteps {
    step: string;
    task: string;
    assignedTo: string;
    deadline: string;
    status: string;
}


export interface opportunity {
    id: string;
    client: string;
    nit: string;
    businessName: string;
    businessLine: string;
    opportunityDescription: string;
    opportunityLongDescription: string;
    estimatedValue: number;
    estimatedCompletionDate: string;
    status: string;
    followUpSteps: followUpSteps[];
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