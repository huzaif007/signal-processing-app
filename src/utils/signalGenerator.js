export const generateSignal = ({ waveform, frequency, amplitude, phase, sampleRate = 100, duration = 1 }) => {
  // Input validation
  if (!['sine', 'square', 'triangle', 'noise'].includes(waveform)) {
    throw new Error('Invalid waveform type');
  }
  if (typeof frequency !== 'number' || frequency <= 0) {
    throw new Error('Frequency must be a positive number');
  }
  if (typeof amplitude !== 'number' || amplitude <= 0) {
    throw new Error('Amplitude must be a positive number');
  }
  if (typeof phase !== 'number') {
    throw new Error('Phase must be a number');
  }
  if (typeof sampleRate !== 'number' || sampleRate <= 0) {
    throw new Error('Sample rate must be a positive number');
  }
  if (typeof duration !== 'number' || duration <= 0) {
    throw new Error('Duration must be a positive number');
  }

  const samples = [];
  const numSamples = sampleRate * duration;
  const phaseRad = (phase * Math.PI) / 180;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let value;

    switch (waveform) {
      case 'sine':
        value = amplitude * Math.sin(2 * Math.PI * frequency * t + phaseRad);
        break;
      case 'square':
        value = amplitude * Math.sign(Math.sin(2 * Math.PI * frequency * t + phaseRad));
        break;
      case 'triangle':
        value = amplitude * (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * frequency * t + phaseRad));
        break;
      case 'noise':
        value = amplitude * (Math.random() * 2 - 1);
        break;
      default:
        value = 0;
    }

    samples.push({ t, value });
  }

  return samples;
};