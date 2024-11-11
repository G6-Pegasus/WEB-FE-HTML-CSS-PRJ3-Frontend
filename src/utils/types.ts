export interface Contact {
    Cname: string; 
    Cemail: string; 
    Cphone: string;
}

export interface Customer {
    id: number;
    name: string;
    address: string;
    city: string;
    country: string;
    phone: number;
    corporateEmail: string;
    active: boolean;
    contacts: Contact[]
}

export interface CustomerRow extends Customer {
    hasChanged?: boolean;
}

export type bussinesLines = "outsourcing resources" | "web development" | "mobile development" | "IT Consultancy"
export type opportunitiesStatus = "Opening" | "Under study" | "Purchase order" | "Executed"

export interface Opportunity {
    id: string;
    customerId: number;
    businessName: string;
    businessLine: bussinesLines;
    description: string;
    estimatedBusinessValue: number;
    estimatedCompletionDate: string;
    status: opportunitiesStatus;
}

export type contactTypes = "call" | "email" | "meeting"
export type FollowUpStatus = "In Progress" | "Pending" | "In Review" | "Done"

export interface FollowUp {
    id: string;
    opportunityId: string;
    contactType: contactTypes;
    contactDate: string;
    commercialExecutive: string;
    description: string;
    status: FollowUpStatus
}