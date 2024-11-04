import ClientTable from '../../components/customers/listCustomers';
import CreateClient from "../../forms/createclient"; 

const CreateCustomerView = () => {
    return (
        <div>
            <CreateClient /> 
            <h1 className='text-3xl font-bold text-center my-5'>Customer View</h1>
            <ClientTable />
        </div>
    );
}
  
export default CreateCustomerView;
