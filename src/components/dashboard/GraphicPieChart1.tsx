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

  return (
    <Box sx={{ width: 400, height: 400, textAlign: "center", padding: 2 }}>
      <Typography variant="h5" gutterBottom>Opportunities per state</Typography>
      <Pie data={chartData} options={{ responsive: true }} />
    </Box>
  )
}

export default OpportunitiesByStatusChart;