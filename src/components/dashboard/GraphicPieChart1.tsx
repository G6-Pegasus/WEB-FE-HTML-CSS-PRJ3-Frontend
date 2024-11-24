import { Pie } from "react-chartjs-2";
import { useGetOpportunities } from "../../hooks/useGetOpportunities"; 
import { Opportunity } from "../../utils/types"; 
import { CircularProgress, Box, Typography } from "@mui/material"; 
import {Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);
const OpportunitiesByStatusChart = () => {
  const { data: opportunities, isLoading, isError } = useGetOpportunities()
  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography variant="body1" color="error">An error occurred while loading the data</Typography>
  if (!opportunities || opportunities.length === 0) {
    return <Typography variant="body1" color="textSecondary">No available opportunities</Typography>
  }
  const groupedData = opportunities?.reduce((acc: any, opportunity: Opportunity) => {
    acc[opportunity.status] = (acc[opportunity.status] || 0) + 1
    return acc
  }, {})
  const chartLabels = Object.keys(groupedData || {})
  const chartValues = Object.values(groupedData || {})
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Opportunities in this state",
        data: chartValues,
        backgroundColor: ["#447842", "#4d62b1", "#6b3d9f", "#fc9445"], 
      },
    ],
  }

  const options = {
    maintainAspectRatio: false, // No mantener la relación de aspecto
    responsive: true, // Hacer el gráfico responsivo
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const value = tooltipItem.raw;
            return `${value.toFixed(2)}%`; // Mostrar el valor en porcentaje con dos decimales
          },
        },
      },
    },
  };

  return (
    <Box sx={{ width: '100%', height: 400, textAlign: "center", padding: 2, marginBottom: 2 }}>
      <h3 className="text-xl font-bold mb-4">Percentage of Opportunities by Business Line</h3>
      <Pie data={chartData} options={options} />
    </Box>
  )
}

export default OpportunitiesByStatusChart;