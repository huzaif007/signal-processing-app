import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, Container } from 'react-bootstrap';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Visualizer = ({ signalData }) => {
  const data = {
    labels: signalData.map((point) => point.t),
    datasets: [
      {
        label: 'Signal',
        data: signalData.map((point) => point.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Time-Domain Signal' },
    },
    scales: {
      x: { title: { display: true, text: 'Time (s)' } },
      y: { title: { display: true, text: 'Amplitude' } },
    },
  };

  return (
    <Container className="my-4">
      <Card>
        <Card.Body>
          <Card.Title>Signal Visualizer</Card.Title>
          <Line data={data} options={options} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Visualizer;