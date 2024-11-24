import Main from '../../layout/Main'
import { useGetOpportunities } from '../../hooks/useGetOpportunities';
import Loader from '../../components/common/Loader';
import ErrorComponent from '../../components/common/ErrorComponent';
import { useGetCustomers } from '../../hooks/useGetCustomers';
import { OpportunityDashboard } from '../../utils/types';
import ClientBarChart from '../../components/dashboard/Barchart';
import Graphic2 from "../../components/dashboard/GraphicPieChart1";
import BusinessLinesPieChart from '../../components/dashboard/BusinessLinesPieChart';

const DashboardView = () => {
    const { data: opportunities = [], isLoading: isOpportunityLoading, isError: isOpportunityError } = useGetOpportunities();
    const { data: customers = [], isLoading: isCustomerLoading, isError: isCustomerError } = useGetCustomers()
    const data : OpportunityDashboard = opportunities.map(opportunity => {
        const result: OpportunityDashboard = Object.assign({
            'customer': customers.find(customer => customer.id == opportunity.customerId) ?? {}
        }, opportunity)
        return result
    }) as any as OpportunityDashboard

    console.log("Datos:", data)

    return <Main>
        {(isOpportunityLoading || isCustomerLoading) && <Loader />}
        {(isOpportunityError || isCustomerError) && <ErrorComponent message="An error occurred while fetching the information. Contact technical support and show them this code: Error loading..." />}
        {data && <>
            <Graphic2 />
            <BusinessLinesPieChart />  
        </>}
    </Main>
};
  
  export default DashboardView;
  