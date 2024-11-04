import { useNavigate } from 'react-router-dom';

const DashboardView = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/createCustomer')
    }
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <button className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        onClick={handleClick}>
          Ir
        </button>
      </div>
    );
  };
  
  export default DashboardView;
  