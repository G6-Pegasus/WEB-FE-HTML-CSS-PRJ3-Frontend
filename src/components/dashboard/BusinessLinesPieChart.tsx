import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Opportunity } from '../../utils/types';
import { useGetOpportunities } from '../../hooks/useGetCustomerOpportunities';
import { CircularProgress, Box } from "@mui/material"; 
import ErrorComponent from '../common/ErrorComponent';

/* 
  Registrar elementos de Chart.js para evitar conflictos y asegurar que el gráfico se renderice correctamente.
  ChartJS.register() es una función que permite registrar componentes globales de Chart.js.
  En este caso, estamos registrando ArcElement, Tooltip y Legend.
  - ArcElement: Necesario para renderizar gráficos de tipo 'pie' y 'doughnut'.
  - Tooltip: Muestra información adicional cuando el usuario pasa el mouse sobre un segmento del gráfico.
  - Legend: Muestra una leyenda que describe cada segmento del gráfico.
*/
ChartJS.register(ArcElement, Tooltip, Legend);

const BusinessLinesPieChart: React.FC = () => {
  // Obtener datos de oportunidades usando un hook personalizado
  const { data: opportunities, error, isLoading } = useGetOpportunities();

  // Mostrar un esqueleto de tabla mientras los datos están cargando
  if (isLoading) return <CircularProgress />;
  
  // Mostrar un componente de error si ocurre un error al obtener los datos
  if (error) {
    return (
      <ErrorComponent
        message={`An error occurred while fetching the information. Contact technical support and show them this code: ${error.message}.`}
      />
    );
  }

  /* 
    Agrupar las oportunidades por línea de negocio.
    Utilizamos el método reduce para iterar sobre las oportunidades y contar cuántas hay por cada línea de negocio.
    - acc: Acumulador que guarda el conteo de oportunidades por línea de negocio.
    - opp: La oportunidad actual en la iteración.
    El resultado es un objeto donde las claves son las líneas de negocio y los valores son el número de oportunidades en cada línea.
  */
  const businessLinesCount = (opportunities ?? []).reduce<Record<string, number>>(
    (acc, opp: Opportunity) => {
      acc[opp.businessLine] = (acc[opp.businessLine] || 0) + 1; // Incrementar el conteo para la línea de negocio actual
      return acc; // Devolver el acumulador actualizado
    },
    {} // Valor inicial del acumulador es un objeto vacío
  );

  // Calcular el total de oportunidades
  const totalOpportunities = opportunities?.length ?? 0;

  /* 
    Preparar los datos para el gráfico de pastel.
    - labels: Las etiquetas del gráfico son las líneas de negocio.
    - datasets: Los datos del gráfico son los porcentajes de oportunidades por línea de negocio.
      - data: Calculamos el porcentaje de oportunidades por línea de negocio.
      - backgroundColor: Colores de fondo para cada segmento del gráfico.
      - hoverBackgroundColor: Colores al pasar el mouse sobre cada segmento del gráfico.
  */
  const data = {
    labels: Object.keys(businessLinesCount), // Obtener las líneas de negocio como etiquetas
    datasets: [
      {
        data: Object.values(businessLinesCount).map(
          (count) => (count / totalOpportunities) * 100 // Calcular el porcentaje de cada línea de negocio
        ),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // Colores de fondo
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // Colores al pasar el mouse
      },
    ],
  };

  /* 
    Opciones para el gráfico.
    - maintainAspectRatio: false -> No mantener la relación de aspecto para permitir que el gráfico se ajuste al contenedor.
    - responsive: true -> Hacer el gráfico responsivo.
    - plugins: Configuración de los plugins de leyenda y tooltip.
      - legend: Ocultar la leyenda predeterminada.
      - tooltip: Configuración del tooltip para mostrar los valores en porcentaje con dos decimales.
  */
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

  // Renderizar el gráfico de pastel y la leyenda personalizada
  return (
    <Box sx={{ width: '100%', height: 400, textAlign: "center", padding: 2, marginBottom: 2 }}>
      <h3 className="text-xl font-bold mb-4">Percentage of Opportunities by Business Line</h3>
      <Pie data={data} options={options} />
    </Box>
  );
};

export default BusinessLinesPieChart;