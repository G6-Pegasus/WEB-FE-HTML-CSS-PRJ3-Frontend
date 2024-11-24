import Main from '../../layout/Main'
import ClientBarChart from '../../components/dashboard/Barchart';
import StatusPieChart from "../../components/dashboard/GraphicPieChart1";
import BusinessLinesPieChart from '../../components/dashboard/BusinessLinesPieChart';

const DashboardView = () => {
    return <Main>
        <div className='w-full flex-col justify-center items-center'>
            <ClientBarChart/>
            <div className='flex flex-col justify-center items-center gap-10 md:flex-row md:justify-evenly mb-5'>
                <div className='w-[50%]'>
                    <StatusPieChart />
                </div>
                <div className='w-[50%]'>
                    <BusinessLinesPieChart />
                </div>
            </div>
        </div>
    </Main>
};
  
  export default DashboardView;
  