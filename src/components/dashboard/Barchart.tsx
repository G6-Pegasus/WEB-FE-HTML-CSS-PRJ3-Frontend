import { useMemo } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useGetOpportunities } from '../../hooks/useGetOpportunities';
import { useGetCustomers } from '../../hooks/useGetCustomers';
import { CircularProgress } from "@mui/material"; 
import ErrorComponent from '../common/ErrorComponent';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const ClientBarChart = () => {
  const { data: opportunities = [], isLoading: loadingOpportunities, error: errorOpportunities } = useGetOpportunities();
  const { data: customers = [], isLoading: loadingCustomers, error: errorCustomers } = useGetCustomers();

  const chartData = useMemo(() => {
    if (loadingOpportunities || loadingCustomers) return { categories: [], estimated: [], executed: [] };

    const n = 15
    const categories = customers.map(({ name }) => name.length < n ? name : `${name.slice(0, n - 3)}...`);
    const estimated = customers.map(({ id }) => opportunities.filter(({ customerId }) => customerId == id)
                .map(({ estimatedBusinessValue }) => estimatedBusinessValue).reduce((a, b) => a + b, 0))
    const executed = customers.map(({ id }) => opportunities.filter(({ customerId, status }) => customerId == id && status === "Executed")
                .map(({ estimatedBusinessValue }) => estimatedBusinessValue).reduce((a, b) => a + b, 0))

    return { categories, estimated, executed };
  }, [opportunities, customers, loadingOpportunities, loadingCustomers]);

  if (loadingOpportunities || loadingCustomers) return <CircularProgress />;
  
  // Mostrar un componente de error si ocurre un error al obtener los datos
  if (errorOpportunities || errorCustomers) {
    return (
      <ErrorComponent
        message={`An error occurred while fetching the information. Contact technical support and show them this code: ${(errorOpportunities ?? errorCustomers)?.message}.`}
      />
    );
  }

  console.log(chartData.categories)

  return (
    <div className='w-full bg-white rounded-xl pb-8 p-2 text-center'>
        <h3 className="text-xl font-bold mb-4">Total estimated vs total executed in opportunities</h3>
        <BarChart
          xAxis={[
            {
              data: chartData.categories,
              label: 'Customers',
              scaleType: 'band',
            },
          ]}
          series={[
            {
              data: chartData.estimated,
              label: 'Estimated Value',
              color: '#6c63ff',
            },
            {
              data: chartData.executed,
              label: 'Executed Value',
              color: '#d0db61',
            },
          ]}
          yAxis={[
            {
              label: 'Values (USD)' ,
              tickPlacement: 'extremities'
            },
          ]}
          sx={{
            [`.${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translate(-40px, 0)',
            },
          }}
          height={500}
          margin={{ top: 50, right: 50, bottom: 40, left: 100 }} 
        />
    </div>
  );
};

export default ClientBarChart;
