import { useQuery } from '@tanstack/react-query'
import { customer } from '../../utils/types'
import CustomerDetailsView from './CustomerDetailsView';

const CustomersView = () => {
    const { data: customers, error, isLoading } = useQuery<customer[], Error>({
        queryKey: ['opportunities'],
        queryFn: async () => {
          const response = await fetch('http://localhost:3001/customers')
          if (!response.ok) throw new Error('An error occurred while fetching the information. The server has rejected the connection.')
          return response.json() as Promise<customer[]>
        }
    });

    if (isLoading) return <div>Loading content, please be patient...</div>
    if (error) return <div>An error occurred while fetching the information. Contact technical support and show them this code: {error.message}.</div>

    return <>
        <h1>Customers</h1>
        <p>
            This is the list of customers. Click on the name of the customer to see more details.
        </p>
        <CustomerDetailsView />
    </>;
}

export default CustomersView