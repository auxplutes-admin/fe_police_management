import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface ApplicationsTypeGraphProps {
  data: {
    application_type_name: string;
    application_count: number;
  }[];
}

const ApplicationsTypeGraph: React.FC<ApplicationsTypeGraphProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.application_type_name),
    datasets: [
      {
        label: 'Applications by Type',
        data: data.map(item => Number(item.application_count)),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Applications by Type',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  }

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Bar data={chartData} options={options} />
    </div>
  )
}

export default ApplicationsTypeGraph