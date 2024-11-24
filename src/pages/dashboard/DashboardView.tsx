import Main from '../../layout/Main'
import ClientBarChart from '../../components/dashboard/Barchart';
import StatusPieChart from "../../components/dashboard/GraphicPieChart1";
import BusinessLinesPieChart from '../../components/dashboard/BusinessLinesPieChart';

const DashboardView = () => {
    return <Main>
        <div className='w-full flex gap-5 flex-col justify-center items-center'>
            <ClientBarChart/>
            <div className='w-full flex gap-5 flex-col justify-center items-center md:flex-row md:justify-between mb-2'>
                <div className='w-full md:w-[49%] bg-white rounded-xl pb-8'>
                    <StatusPieChart />
                </div>
                <div className='w-full md:w-[49%] bg-white rounded-xl pb-8'>
                    <BusinessLinesPieChart />
                </div>
            </div>
        </div>
    </Main>
};
  
  export default DashboardView;
  