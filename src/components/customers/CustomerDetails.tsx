import { Customer } from '../../utils/types';

export default function ClientDetail({ customer } : { customer: Customer }) {
    return (
        <div className="mx-auto p-6 w-full bg-white  shadow-md  border-gray-200 ">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b border-gray-300  ">
                Your Details
            </h2>
            <div className="text-slate-700 grid grid-cols-2 gap-x-6 gap-y-2">
                <p className="mb-2"><strong>NIT:</strong> {customer.nit}</p>
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
        </div>
    );
}
