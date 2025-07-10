import { useState, useEffect } from 'react';

function generateSineWave({ frequency, amplitude, sampleRate, duration }) {
  const sampleCount = Math.floor(sampleRate * duration);
  const data = Array.from({ length: sampleCount }, (_, i) => {
    const time = i / sampleRate;
    return { time, value: amplitude * Math.sin(2 * Math.PI * frequency * time) };
  });
  return data;
}

const useLiveSignal = ({ frequency, amplitude, sampleRate, duration }) => {
  const [signalData, setSignalData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newChunk = generateSineWave({ frequency, amplitude, sampleRate, duration });
      setSignalData((prev) => [...prev.slice(-sampleRate * 2), ...newChunk]); // Keep last few seconds
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [frequency, amplitude, sampleRate, duration]);

  return { signalData };
};

export default useLiveSignal;
