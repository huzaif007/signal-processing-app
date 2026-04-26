import { useState } from 'react';

const SignalGenerator = ({ onGenerate }) => {
  const [waveform, setWaveform] = useState('sine');
  const [frequency, setFrequency] = useState(1);
  const [amplitude, setAmplitude] = useState(1);
  const [phase, setPhase] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    onGenerate({ waveform, frequency, amplitude, phase });
  };

  const controls = [
    {
      id: 'frequency',
      label: 'Frequency',
      value: frequency,
      min: 0.1,
      max: 10,
      step: 0.1,
      suffix: 'Hz',
      onChange: setFrequency,
    },
    {
      id: 'amplitude',
      label: 'Amplitude',
      value: amplitude,
      min: 0.1,
      max: 5,
      step: 0.1,
      suffix: 'x',
      onChange: setAmplitude,
    },
    {
      id: 'phase',
      label: 'Phase',
      value: phase,
      min: 0,
      max: 360,
      step: 1,
      suffix: 'deg',
      onChange: setPhase,
    },
  ];

  return (
    <section className="panel">
      <div className="panel-header">
        <span className="eyebrow">Generator</span>
        <h2 className="panel-title">Build a synthetic waveform</h2>
        <p className="panel-copy">
          Tune the source parameters, then render a fresh signal into the analysis area.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6 sm:px-8">
        <div>
          <label className="field-label" htmlFor="waveform">
            <span>Waveform family</span>
            <span className="field-value capitalize">{waveform}</span>
          </label>
          <select
            id="waveform"
            className="input-shell"
            value={waveform}
            onChange={(event) => setWaveform(event.target.value)}
          >
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
            <option value="noise">Noise</option>
          </select>
        </div>

        {controls.map((control) => (
          <div key={control.id}>
            <label className="field-label" htmlFor={control.id}>
              <span>{control.label}</span>
              <span className="field-value">{control.value} {control.suffix}</span>
            </label>
            <input
              id={control.id}
              className="range-input"
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={control.value}
              onChange={(event) => control.onChange(Number(event.target.value))}
            />
          </div>
        ))}

        <button className="primary-button w-full" type="submit">
          Generate signal
        </button>
      </form>
    </section>
  );
};

export default SignalGenerator;
