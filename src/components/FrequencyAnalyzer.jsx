import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FrequencyAnalyzer = ({ signalData }) => {
  if (!signalData || signalData.length === 0) {
    return null;
  }

  const sampleRate = 100;
  const sampleCount = signalData.length;
  const real = new Array(sampleCount).fill(0);
  const imaginary = new Array(sampleCount).fill(0);

  for (let k = 0; k < sampleCount; k += 1) {
    for (let n = 0; n < sampleCount; n += 1) {
      const angle = (-2 * Math.PI * k * n) / sampleCount;
      real[k] += signalData[n].value * Math.cos(angle);
      imaginary[k] += signalData[n].value * Math.sin(angle);
    }
  }

  const magnitudes = real.map((value, index) => Math.sqrt(value * value + imaginary[index] * imaginary[index]));
  const half = Math.floor(sampleCount / 2);
  const freqs = magnitudes.slice(0, half);
  const labels = freqs.map((_, index) => ((index * sampleRate) / sampleCount).toFixed(1));

  const data = {
    labels,
    datasets: [
      {
        label: 'Frequency Spectrum',
        data: freqs,
        backgroundColor: 'rgba(56, 189, 248, 0.55)',
        borderColor: 'rgba(125, 211, 252, 1)',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Frequency-Domain Spectrum',
        color: '#f8fafc',
        font: {
          family: 'Space Grotesk',
          size: 16,
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(2, 6, 23, 0.92)',
        borderColor: 'rgba(56, 189, 248, 0.35)',
        borderWidth: 1,
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Frequency (Hz)', color: '#94a3b8' },
        ticks: { color: '#94a3b8', maxTicksLimit: 12 },
        grid: { display: false },
      },
      y: {
        title: { display: true, text: 'Magnitude', color: '#94a3b8' },
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(148, 163, 184, 0.12)' },
      },
    },
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <span className="eyebrow">Spectrum</span>
        <h2 className="panel-title">Frequency analyzer</h2>
        <p className="panel-copy">
          Break the signal into frequency bins to spot dominant energy and harmonic content.
        </p>
      </div>
      <div className="h-[380px] px-4 py-4 sm:h-[430px] sm:px-6 sm:py-6">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
};

export default FrequencyAnalyzer;
