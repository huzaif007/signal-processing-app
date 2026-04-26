import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Visualizer = ({ signalData }) => {
  const data = {
    labels: signalData.map((point) => point.t),
    datasets: [
      {
        label: 'Signal',
        data: signalData.map((point) => point.value),
        borderColor: 'rgba(103, 232, 249, 1)',
        backgroundColor: 'rgba(34, 211, 238, 0.18)',
        fill: true,
        tension: 0.25,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#cbd5e1',
          usePointStyle: true,
          boxWidth: 10,
        },
      },
      title: {
        display: true,
        text: 'Time-Domain Signal',
        color: '#f8fafc',
        font: {
          family: 'Space Grotesk',
          size: 16,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(2, 6, 23, 0.92)',
        borderColor: 'rgba(34, 211, 238, 0.35)',
        borderWidth: 1,
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Time (s)', color: '#94a3b8' },
        ticks: { color: '#94a3b8', maxTicksLimit: 10 },
        grid: { color: 'rgba(148, 163, 184, 0.12)' },
      },
      y: {
        title: { display: true, text: 'Amplitude', color: '#94a3b8' },
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(148, 163, 184, 0.12)' },
      },
    },
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <span className="eyebrow">Time Domain</span>
        <h2 className="panel-title">Signal visualizer</h2>
        <p className="panel-copy">
          Inspect the waveform shape over time and see how filtering changes its profile.
        </p>
      </div>
      <div className="h-[380px] px-4 py-4 sm:h-[430px] sm:px-6 sm:py-6">
        <Line data={data} options={options} />
      </div>
    </section>
  );
};

export default Visualizer;
