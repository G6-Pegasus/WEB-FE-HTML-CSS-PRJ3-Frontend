import ListCustomers from '../../components/customers/ListCustomers';
import { Link } from 'react-router-dom';
import Main from '../../layout/Main';
import Button from '@mui/material/Button';

const CustomersView = () => {
    return (
        <Main>
            <section className="flex justify-center">
                <section className="w-[80vw] h-[80vh] flex flex-col gap-5 mt-5 justify-center items-center bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                    <div className="w-full flex justify-between items-center pb-4 border-b border-gray-300">
                        <h3 className="text-xl font-bold text-slate-700">Customer List</h3>
                        <Link to="/createCustomer">
                            <Button variant="contained" color="primary"
                                className="bg-teal-500 w-full text-white px-4 py-2 text-xs font-semibold hover:bg-teal-600 rounded-md">
                                    Add Customer
                            </Button>
                        </Link>
                    </div>
                    
                    <ListCustomers />
                </section>
            </section>
        </Main>
    );
}

export default CustomersView;