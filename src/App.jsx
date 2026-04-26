import { useState } from 'react';
import SignalGenerator from './components/SignalGenerator';
import Visualizer from './components/Visualizer';
import FrequencyAnalyzer from './components/FrequencyAnalyzer';
import FilterControls from './components/FilterControls';
import ConvolutionTool from './components/ConvolutionTool';
import LiveVisualizer from './components/LiveVisualizer';
import useSignal from './hooks/useSignal';
import { applyConvolutionFilter } from './utils/filterUtils';

function App() {
  const { signalParams, signalData, updateSignal } = useSignal();
  const [filteredSignal, setFilteredSignal] = useState([]);
  const activeSignal = filteredSignal.length > 0 ? filteredSignal : signalData;

  const handleFilterApply = ({ filterType, cutoffFreq }) => {
    if (signalData && signalData.length > 0) {
      const filtered = applyConvolutionFilter(signalData, { filterType, cutoffFreq });
      setFilteredSignal(filtered);
    }
  };

  const handleFilterReset = () => {
    setFilteredSignal([]);
  };

  const peakAmplitude = activeSignal.length
    ? Math.max(...activeSignal.map((point) => Math.abs(point.value))).toFixed(2)
    : '0.00';

  const energyLevel = activeSignal.length
    ? activeSignal.reduce((sum, point) => sum + point.value * point.value, 0).toFixed(2)
    : '0.00';

  const stats = [
    { label: 'Waveform', value: signalParams.waveform },
    { label: 'Peak Amplitude', value: peakAmplitude },
    { label: 'Energy', value: energyLevel },
    { label: 'Samples', value: activeSignal.length || 0 },
  ];

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid bg-[size:28px_28px] opacity-20" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <section className="panel relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
          <div className="grid gap-10 px-6 py-8 sm:px-8 lg:grid-cols-[1.4fr_0.9fr] lg:px-10 lg:py-10">
            <div className="space-y-6">
              <span className="eyebrow">Digital Signal Lab</span>
              <div className="space-y-4">
                <h1 className="max-w-3xl font-display text-4xl leading-tight text-white sm:text-5xl">
                  Shape, inspect, and filter synthetic signals in a focused dark workspace.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  Generate waveforms, study their spectrum, and compare filtered output in a calmer dashboard built for experimentation.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2">Waveform synthesis</span>
                <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2">Frequency analysis</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Filter preview</span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-inner shadow-black/20"
                >
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="mt-3 font-display text-3xl capitalize text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
          <div className="space-y-8">
            <SignalGenerator onGenerate={updateSignal} />
            {signalData.length > 0 && (
              <>
                <FilterControls onApply={handleFilterApply} onReset={handleFilterReset} />
                <ConvolutionTool inputSignal={activeSignal} />
              </>
            )}
          </div>

          <div className="space-y-8">
            {signalData.length > 0 ? (
              <>
                <Visualizer signalData={activeSignal} />
                <FrequencyAnalyzer signalData={activeSignal} />
                <LiveVisualizer label="Live signal visualizer" signalParams={signalParams} />
              </>
            ) : (
              <div className="panel flex min-h-[540px] flex-col items-center justify-center px-8 text-center">
                <span className="eyebrow">Ready when you are</span>
                <h2 className="mt-4 font-display text-3xl text-white">Generate your first signal</h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
                  Use the control panel to create a waveform, then explore both the time-domain trace and the frequency spectrum in the visual analysis area.
                </p>
              </div>
            )}
          </div>
        </section>

        <footer className="mt-8 pb-4 text-center text-sm text-slate-500">
          (c) {new Date().getFullYear()} HuzaifDevelops. Signal experiments, reimagined in dark mode.
        </footer>
      </div>
    </main>
  );
}

export default App;
