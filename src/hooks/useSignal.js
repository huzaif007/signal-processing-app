import { useState } from 'react';
import { generateSignal } from '../utils/signalGenerator';

const useSignal = () => {
  const [signalParams, setSignalParams] = useState({
    waveform: 'sine',
    frequency: 1,
    amplitude: 1,
    phase: 0,
  });
  const [signalData, setSignalData] = useState([]);

  const updateSignal = (params) => {
    try {
      const newSignal = generateSignal(params);
      setSignalParams(params);
      setSignalData(newSignal);
    } catch (error) {
      console.error('Signal generation error:', error.message);
    }
  };

  return { signalParams, signalData, updateSignal };
};

export default useSignal;