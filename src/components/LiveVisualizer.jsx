import { useState } from 'react';
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
import useLiveSignal from '../hooks/useLiveSignal';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LiveVisualizer = ({ label = 'Live Signal Visualizer', signalParams }) => {
  const [isRunning, setIsRunning] = useState(true);
  const [sampleRate, setSampleRate] = useState(60);
  const { signalData } = useLiveSignal({
    waveform: signalParams?.waveform ?? 'sine',
    frequency: signalParams?.frequency ?? 1,
    amplitude: signalParams?.amplitude ?? 1,
    phase: signalParams?.phase ?? 0,
    sampleRate,
    windowSize: 180,
    isRunning,
  });

  const latestValue = signalData.length > 0 ? signalData[signalData.length - 1].value : 0;
  const rms = signalData.length > 0
    ? Math.sqrt(signalData.reduce((sum, point) => sum + (point.value ** 2), 0) / signalData.length)
    : 0;
  const peak = signalData.length > 0
    ? Math.max(...signalData.map((point) => Math.abs(point.value)))
    : 0;

  const data = {
    labels: signalData.map((point) => point.t.toFixed(2)),
    datasets: [
      {
        label: 'Live amplitude',
        data: signalData.map((point) => point.value),
        borderColor: 'rgba(45, 212, 191, 1)',
        backgroundColor: 'rgba(45, 212, 191, 0.12)',
        fill: true,
        tension: 0.32,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: {
        labels: {
          color: '#cbd5e1',
          usePointStyle: true,
          boxWidth: 10,
        },
      },
      title: {
        display: true,
        text: 'Streaming signal window',
        color: '#f8fafc',
        font: {
          family: 'Space Grotesk',
          size: 16,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(2, 6, 23, 0.92)',
        borderColor: 'rgba(45, 212, 191, 0.35)',
        borderWidth: 1,
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
      },
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8', maxTicksLimit: 8 },
        grid: { color: 'rgba(148, 163, 184, 0.08)' },
      },
      y: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(148, 163, 184, 0.12)' },
      },
    },
  };

  const stats = [
    { label: 'Latest', value: latestValue.toFixed(3) },
    { label: 'RMS', value: rms.toFixed(3) },
    { label: 'Peak', value: peak.toFixed(3) },
  ];

  return (
    <section className="panel overflow-hidden">
      <div className="panel-header">
        <span className="eyebrow">Realtime</span>
        <h2 className="panel-title capitalize">{label}</h2>
        <p className="panel-copy">
          Stream the active waveform parameters into a rolling buffer and watch the signal settle in real time.
        </p>
      </div>
      <div className="space-y-5 px-6 py-6 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="primary-button flex-1" type="button" onClick={() => setIsRunning((value) => !value)}>
            {isRunning ? 'Pause stream' : 'Resume stream'}
          </button>
          <label className="secondary-button flex-1 cursor-default justify-between gap-3">
            <span>Sample rate</span>
            <select
              className="bg-transparent text-right text-slate-100 outline-none"
              value={sampleRate}
              onChange={(event) => setSampleRate(Number(event.target.value))}
            >
              <option value={30}>30 Hz</option>
              <option value={60}>60 Hz</option>
              <option value={90}>90 Hz</option>
            </select>
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/10 bg-slate-900/70 p-4">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-2 font-display text-2xl text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className={`h-3 w-3 rounded-full ${isRunning ? 'bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.6)]' : 'bg-amber-300 shadow-[0_0_18px_rgba(252,211,77,0.4)]'}`} />
            <span className="text-sm font-medium text-slate-200">{isRunning ? 'Streaming' : 'Paused'}</span>
            <span className="ml-auto text-xs uppercase tracking-[0.24em] text-slate-500">
              {signalParams?.waveform ?? 'sine'}
            </span>
          </div>

          <div className="h-[320px]">
            <Line data={data} options={options} />
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-400">
            The stream follows the current generator settings, so changing frequency, amplitude, phase, or waveform will reset the buffer and begin a new live capture.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LiveVisualizer;
