import { useEffect, useState } from 'react';
import { convolve } from '../utils/filterUtils';

const PRESETS = {
  smooth: [0.2, 0.2, 0.2, 0.2, 0.2],
  edge: [-1, 0, 1],
  sharpen: [-0.25, 1.5, -0.25],
  echo: [1, 0, 0, 0.45],
};

function parseKernel(input) {
  return input
    .split(',')
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isFinite(value));
}

function formatKernel(kernel) {
  return kernel.map((value) => value.toFixed(2)).join(', ');
}

function buildPreview(signal, kernel) {
  const values = signal.map((point) => point.value);
  const output = convolve(values, kernel);

  return signal.slice(0, 12).map((point, index) => ({
    t: point.t,
    input: point.value,
    output: output[index] ?? 0,
  }));
}

const ConvolutionTool = ({ inputSignal = [] }) => {
  const [kernelInput, setKernelInput] = useState(formatKernel(PRESETS.smooth));
  const [kernel, setKernel] = useState(PRESETS.smooth);
  const [error, setError] = useState('');

  useEffect(() => {
    setKernelInput(formatKernel(PRESETS.smooth));
    setKernel(PRESETS.smooth);
    setError('');
  }, [inputSignal.length]);

  const preview = inputSignal.length > 0 ? buildPreview(inputSignal, kernel) : [];
  const outputEnergy = preview.reduce((sum, point) => sum + Math.abs(point.output), 0).toFixed(2);

  const applyKernelInput = () => {
    const parsed = parseKernel(kernelInput);
    if (parsed.length === 0) {
      setError('Enter at least one numeric coefficient.');
      return;
    }
    setKernel(parsed);
    setError('');
  };

  return (
    <section className="panel overflow-hidden">
      <div className="panel-header">
        <span className="eyebrow">Pipeline</span>
        <h2 className="panel-title">Convolution tool</h2>
        <p className="panel-copy">
          Test custom kernels against the current signal and preview how convolution reshapes the first samples.
        </p>
      </div>

      <div className="space-y-5 px-6 py-6 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(PRESETS).map(([key, preset]) => (
            <button
              key={key}
              className="secondary-button justify-between"
              type="button"
              onClick={() => {
                setKernel(preset);
                setKernelInput(formatKernel(preset));
                setError('');
              }}
            >
              <span className="capitalize">{key}</span>
              <span className="text-xs text-slate-400">{preset.length} taps</span>
            </button>
          ))}
        </div>

        <div>
          <label className="field-label" htmlFor="kernel-input">
            <span>Kernel coefficients</span>
            <span className="field-value">{kernel.length} taps</span>
          </label>
          <textarea
            id="kernel-input"
            className="input-shell min-h-28 resize-y"
            value={kernelInput}
            onChange={(event) => setKernelInput(event.target.value)}
            placeholder="Example: 0.2, 0.2, 0.2, 0.2, 0.2"
          />
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <button className="primary-button flex-1" type="button" onClick={applyKernelInput}>
              Apply kernel
            </button>
            <button
              className="secondary-button flex-1"
              type="button"
              onClick={() => {
                setKernelInput(formatKernel(PRESETS.smooth));
                setKernel(PRESETS.smooth);
                setError('');
              }}
            >
              Reset kernel
            </button>
          </div>
          {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
            <p className="text-sm font-medium text-slate-200">Kernel summary</p>
            <p className="mt-3 font-display text-2xl text-white">{kernel.reduce((sum, value) => sum + value, 0).toFixed(2)}</p>
            <p className="mt-2 text-sm text-slate-400">Coefficient sum</p>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              Positive sums preserve DC content, while zero-sum kernels emphasize edges and transitions.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-200">Preview output</p>
                <p className="mt-1 text-sm text-slate-400">First 12 samples after convolution</p>
              </div>
              <span className="field-value">{outputEnergy} abs sum</span>
            </div>

            {preview.length > 0 ? (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-sm text-slate-300">
                  <thead className="text-slate-500">
                    <tr>
                      <th className="pb-3 pr-4 font-medium">t</th>
                      <th className="pb-3 pr-4 font-medium">Input</th>
                      <th className="pb-3 font-medium">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((point) => (
                      <tr key={`${point.t}-${point.input}`} className="border-t border-white/5">
                        <td className="py-2 pr-4">{point.t.toFixed(2)}</td>
                        <td className="py-2 pr-4">{point.input.toFixed(3)}</td>
                        <td className="py-2 text-cyan-200">{point.output.toFixed(3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-400">Generate a signal to inspect convolution output.</p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-dashed border-cyan-400/20 bg-cyan-400/5 p-5 text-sm leading-7 text-slate-300">
          Active kernel: <span className="text-cyan-200">{kernel.map((value) => value.toFixed(2)).join(', ')}</span>
        </div>
      </div>
    </section>
  );
};

export default ConvolutionTool;
