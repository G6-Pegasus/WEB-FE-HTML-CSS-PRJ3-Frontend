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

export const updateCustomer = async (id: number, data: Partial<CustomerRow>) => {
    return await fetcher(`/customers/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    });
};