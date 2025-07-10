// src/App.jsx

import { useState } from 'react';
import { Container } from 'react-bootstrap';
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

  const handleFilterApply = ({ filterType, cutoffFreq }) => {
    if (signalData && signalData.length > 0) {
      const filtered = applyConvolutionFilter(signalData, { filterType, cutoffFreq });
      setFilteredSignal(filtered);
    }
  };

  const handleFilterReset = () => {
    setFilteredSignal([]);
  };

  return (
    <Container className="min-vh-100 d-flex flex-column align-items-center">
      <h1 className="display-4 text-primary my-4">Signal Processing App</h1>
      <p className="lead text-muted mb-4">Welcome to the Signal Processing Web App</p>

      <SignalGenerator onGenerate={updateSignal} />

      {signalData && signalData.length > 0 && (
        <>
          <FilterControls onApply={handleFilterApply} onReset={handleFilterReset} />
          <Visualizer signalData={filteredSignal.length > 0 ? filteredSignal : signalData} />
          <FrequencyAnalyzer signalData={filteredSignal.length > 0 ? filteredSignal : signalData} />
          <ConvolutionTool inputSignal={filteredSignal.length > 0 ? filteredSignal : signalData} />
          <LiveVisualizer label="Live Signal Visualizer (Coming Soon)" />
        </>
      )}

      <footer className="mt-auto text-center py-3 text-muted" style={{ fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} HuzaifDevelops. All rights reserved.
      </footer>
    </Container>
  );
}

export default App;
