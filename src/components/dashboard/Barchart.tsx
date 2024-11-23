import { useMemo } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useGetOpportunities } from '../../hooks/useGetOpportunities';
import { useGetCustomers } from '../../hooks/useGetCustomers';

const ClientBarChart = () => {
  const { data: opportunities = [], isLoading: loadingOpportunities } = useGetOpportunities();
  const { data: customers = [], isLoading: loadingCustomers } = useGetCustomers();

  const chartData = useMemo(() => {
    if (loadingOpportunities || loadingCustomers) return { categories: [], estimated: [], executed: [] };

    const customerMap = customers.reduce((map, customer) => {
      map[customer.id] = customer.name;
      return map;
    }, {} as Record<number, string>);

    const aggregatedData = opportunities.reduce((acc, opportunity) => {
      const { customerId, estimatedBusinessValue, status } = opportunity;
      if (!acc[customerId]) {
        acc[customerId] = { estimated: 0, executed: 0 };
      }

      acc[customerId].estimated += estimatedBusinessValue;
      if (status === 'Executed') {
        acc[customerId].executed += estimatedBusinessValue;
      }

      return acc;
    }, {} as Record<number, { estimated: number; executed: number }>);

    const categories = Object.keys(aggregatedData).map((id) => customerMap[Number(id)] || `Customer ${id}`);
    const estimated = Object.values(aggregatedData).map((data) => data.estimated);
    const executed = Object.values(aggregatedData).map((data) => data.executed);

    return { categories, estimated, executed };
  }, [opportunities, customers, loadingOpportunities, loadingCustomers]);

  return (
    <div style={{ padding: '16px' }}>
      {!loadingOpportunities && !loadingCustomers ? (
        <BarChart
          xAxis={[
            {
              data: chartData.categories,
              label: 'Customers',
              scaleType: 'band',
              tickSize: 10,
              
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
              
              
              tickSize: 20,
              
            },
          ]}
          width={1200}
          height={500}
          margin={{ top: 50, right: 50, bottom: 100, left: 100 }} 
          slotProps={{
            legend: {
                //itemMarkHeight : 20
            },
          }}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ClientBarChart;
