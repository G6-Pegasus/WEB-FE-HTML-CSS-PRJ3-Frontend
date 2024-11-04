import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { client } from '../../utils/types';

export default function ClientDetail() {
    //const { clientId } = useParams<{ clientId: string }>();
    const clientId = "2"
    if (!clientId) return <div>No client ID provided in the URL.</div>;

    const { data: client, error, isLoading } = useQuery<client, Error>({
        queryKey: ['client', clientId],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3001/customers/${clientId}`);
            if (!response.ok) throw new Error('An error occurred while fetching client information.');
            return response.json() as Promise<client>;
        }
    });

    if (isLoading) return <div>Loading client details...</div>;
    if (error) return <div>Error loading client details: {error.message}</div>;
    if (!client) return <div>Client not found.</div>;
//w-full max-w-xl
//pb-2 rounded-lg
    return (
        <div className="mx-auto p-6 w-full bg-white  shadow-md  border-gray-200 ">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b border-gray-300  ">
                Your Details
            </h2>
            <div className="text-slate-700 grid grid-cols-2 gap-x-6 gap-y-2">
                <p className="mb-2"><strong>NIT:</strong> {client.nit}</p>
                <p className="mb-2"><strong>Name:</strong> {client.name}</p>
                <p className="mb-2"><strong>Address:</strong> {client.address}</p>
                <p className="mb-2"><strong>City:</strong> {client.city}</p>
                <p className="mb-2"><strong>Country:</strong> {client.country}</p>
                <p className="mb-2">
                    <strong>Phone:</strong> 
                    <a href={`tel:${client.phone}`} className="text-blue-600 hover:underline">
                        {" "+client.phone}
                    </a>
                </p>
                <p className="mb-2">
                    <strong>Email:</strong> 
                    <a href={`mailto:${client.email}`} className="text-blue-600 hover:underline">
                        {" "+client.email}
                    </a>
                </p>
                <p className={`mb-2 ${client.active ? 'text-green-600' : 'text-red-600'}`}>
    <strong>Status:</strong> {client.active ? 'Active' : 'Inactive'}
</p>
            </div>
        </div>
    );
}
