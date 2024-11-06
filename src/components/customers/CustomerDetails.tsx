import CustomerContactsTable from './ContactTable';
import { useGetCustomerDetails } from '../../hooks/useGetCustomerDetails';
import TableSkeleton from '../common/TableSkeleton';
import Loader from '../common/Loader';
import ErrorComponent from '../common/ErrorComponent';

export default function ClientDetail({ customerId }: { customerId: number }) {
    const { data: customer, error, isLoading } = useGetCustomerDetails(customerId)

    if (isLoading) return <div className='w-full h-auto p-6'>
        <Loader />
        <TableSkeleton rows={3} columns={3} />
    </div>;
    if (error) return <ErrorComponent message={`An error occurred while fetching the information. Contact technical support and show them this code: ${error.message}.`} />
    if (!customer) return <ErrorComponent message={`An error occurred while fetching the information. Contact technical support and show them this code: Customer with ID ${customerId} not found.`} />

    return (
        <div className="w-full p-6 bg-white shadow-md border-gray-200 rounded-xl">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b border-gray-300  ">
                Customer Details
            </h2>
            <div className="text-slate-700 grid grid-cols-2 gap-x-6 gap-y-2">
                <p className="mb-2"><strong>NIT:</strong> {customer.id}</p>
                <p className="mb-2"><strong>Name:</strong> {customer.name}</p>
                <p className="mb-2"><strong>Address:</strong> {customer.address}</p>
                <p className="mb-2"><strong>City:</strong> {customer.city}</p>
                <p className="mb-2"><strong>Country:</strong> {customer.country}</p>
                <p className="mb-2">
                    <strong>Phone:</strong> 
                    <a href={`tel:${customer.phone}`} className="text-blue-600 hover:underline">
                        {" " + customer.phone}
                    </a>
                </p>
                <p className="mb-2">
                    <strong>Email:</strong> 
                    <a href={`mailto:${customer.corporateEmail}`} className="text-blue-600 hover:underline">
                        {" " + customer.corporateEmail}
                    </a>
                </p>
                <p className={`mb-2 ${customer.active ? 'text-green-600' : 'text-red-600'}`}>
                    <strong>Status:</strong> {customer.active ? 'Active' : 'Inactive'}
                </p>
            </div>

            <CustomerContactsTable contacts={customer.contacts} />
        </div>
    );
}
