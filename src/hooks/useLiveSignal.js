import { useEffect, useRef, useState } from 'react';

function createSample({ waveform, frequency, amplitude, phase, time }) {
  const phaseRad = (phase * Math.PI) / 180;
  const angle = (2 * Math.PI * frequency * time) + phaseRad;

  switch (waveform) {
    case 'square':
      return amplitude * Math.sign(Math.sin(angle));
    case 'triangle':
      return amplitude * (2 / Math.PI) * Math.asin(Math.sin(angle));
    case 'noise':
      return amplitude * (Math.random() * 2 - 1);
    case 'sine':
    default:
      return amplitude * Math.sin(angle);
  }
}

const useLiveSignal = ({
  waveform = 'sine',
  frequency = 1,
  amplitude = 1,
  phase = 0,
  sampleRate = 60,
  windowSize = 180,
  isRunning = true,
}) => {
  const [signalData, setSignalData] = useState([]);
  const sampleIndexRef = useRef(0);

  useEffect(() => {
    setSignalData([]);
    sampleIndexRef.current = 0;
  }, [waveform, frequency, amplitude, phase, sampleRate]);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const intervalMs = Math.max(16, Math.round(1000 / sampleRate));
    const interval = setInterval(() => {
      const index = sampleIndexRef.current;
      const time = index / sampleRate;
      const nextPoint = {
        t: Number(time.toFixed(4)),
        value: createSample({ waveform, frequency, amplitude, phase, time }),
      };

      sampleIndexRef.current += 1;
      setSignalData((prev) => [...prev.slice(-(windowSize - 1)), nextPoint]);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [waveform, frequency, amplitude, phase, sampleRate, windowSize, isRunning]);

  return { signalData };
};

export default useLiveSignal;
