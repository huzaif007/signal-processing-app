import { useState } from 'react';

const FilterControls = ({ onApply, onReset }) => {
  const [filterType, setFilterType] = useState('lowpass');
  const [cutoffFreq, setCutoffFreq] = useState(10);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cutoffFreq <= 0) {
      alert('Cutoff frequency must be positive!');
      return;
    }
    onApply({ filterType, cutoffFreq });
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <span className="eyebrow">Filter Rack</span>
        <h2 className="panel-title">Shape the output</h2>
        <p className="panel-copy">
          Apply a simple convolution-based filter to preview how the waveform changes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6 sm:px-8">
        <div>
          <label className="field-label" htmlFor="filterType">
            <span>Filter type</span>
            <span className="field-value capitalize">{filterType.replace('pass', ' pass')}</span>
          </label>
          <select
            id="filterType"
            className="input-shell"
            value={filterType}
            onChange={(event) => setFilterType(event.target.value)}
          >
            <option value="lowpass">Low Pass</option>
            <option value="highpass">High Pass</option>
            <option value="bandpass">Band Pass</option>
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="cutoffFreq">
            <span>Cutoff frequency</span>
            <span className="field-value">{cutoffFreq} Hz</span>
          </label>
          <input
            id="cutoffFreq"
            className="input-shell"
            type="number"
            min="1"
            max="50"
            step="1"
            value={cutoffFreq}
            onChange={(event) => setCutoffFreq(Number(event.target.value))}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="primary-button flex-1" type="submit">
            Apply filter
          </button>
          <button className="secondary-button flex-1" type="button" onClick={onReset}>
            Reset
          </button>
        </div>
      </form>
    </section>
  );
};

export default FilterControls;
