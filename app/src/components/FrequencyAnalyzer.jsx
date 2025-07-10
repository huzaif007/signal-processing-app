import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Card, Container } from 'react-bootstrap';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FrequencyAnalyzer = ({ signalData }) => {
  if (!signalData || signalData.length === 0) {
    return null; // Or some placeholder UI if no data
  }

  const sampleRate = 100;
  const N = signalData.length;
  const re = new Array(N).fill(0);
  const im = new Array(N).fill(0);

  // Compute the DFT manually
  for (let k = 0; k < N; k++) {
    for (let n = 0; n < N; n++) {
      const angle = (-2 * Math.PI * k * n) / N;
      re[k] += signalData[n].value * Math.cos(angle);
      im[k] += signalData[n].value * Math.sin(angle);
    }
  }

  const magnitudes = re.map((r, i) => Math.sqrt(r * r + im[i] * im[i]));
  const half = Math.floor(N / 2);
  const freqs = magnitudes.slice(0, half);
  const labels = freqs.map((_, i) => ((i * sampleRate) / N).toFixed(1));

  const data = {
    labels,
    datasets: [
      {
        label: 'Frequency Spectrum',
        data: freqs,
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Frequency-Domain Spectrum',
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: { title: { display: true, text: 'Frequency (Hz)' } },
      y: { title: { display: true, text: 'Magnitude' } },
    },
  };

  return (
    <Container className="my-4">
      <Card>
        <Card.Body>
          <Card.Title>Frequency Analyzer</Card.Title>
          <Bar data={data} options={options} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FrequencyAnalyzer;
