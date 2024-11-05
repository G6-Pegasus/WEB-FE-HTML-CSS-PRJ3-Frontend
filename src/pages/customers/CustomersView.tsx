import ListCustomers from '../../components/customers/ListCustomers'
import { Link } from 'react-router-dom';
import Main from '../../layout/Main'

const CustomersView = () => {
    return <Main>
        <section className='flex flex-row justify-center'>
            <section className='w-[80vw] h-[80vh] flex gap-5 mt-5 flex-col justify-center items-center'>
                <div className='w-full flex flex-row justify-between items-center'>
                    <h3 className='text-lg font-bold'>Customer List</h3>
                    <Link
                        to={"/createCustomer"}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                        Add Customer
                    </Link>
                </div>
                <ListCustomers />
            </section>
        </section>
    </Main>
}

export default CustomersView