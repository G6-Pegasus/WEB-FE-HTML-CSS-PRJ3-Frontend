import { fetcher } from "./api"
import { Customer, CustomerRow } from '../utils/types'

export const getCustomers = async () => {
    return await fetcher("/customers");
};

export const getCustomerDetails = async (customerId: number) => {
    return await fetcher(`/customers/${customerId}`);
};

export const addCustomer = async (customer: Customer) => {
    return await fetcher('/customers', {
        method: 'POST',
        body: JSON.stringify(customer)
    });
};

export const updateCustomer = async (customer: CustomerRow) => {
    return await fetcher(`/customers/${customer.id}`, {
        method: 'PUT',
        body: JSON.stringify(customer)
    });
};