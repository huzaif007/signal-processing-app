import FFT from 'fft.js';

export function computeFFT(signal, sampleRate = 100) {
  const N = signal.length;
  const f = new FFT(N);

  // Prepare input as real array
  const realInput = signal.map((point) => point.value);
  const imagInput = new Array(N).fill(0);
  const out = f.createComplexArray();

  f.transform(out, realInput);

  const freqResolution = sampleRate / N;
  const magnitude = [];

  for (let i = 0; i < N / 2; i++) {
    const re = out[2 * i];
    const im = out[2 * i + 1];
    const mag = Math.sqrt(re * re + im * im);
    magnitude.push({
      frequency: i * freqResolution,
      magnitude: mag,
    });
  }

  return magnitude;
}
