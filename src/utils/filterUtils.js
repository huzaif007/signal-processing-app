// src/utils/filterUtils.js

export function applyConvolutionFilter(signalData, { filterType, cutoffFreq }) {
  if (!signalData || signalData.length === 0) return [];

  const N = signalData.length;
  let kernel;

  switch (filterType) {
    case 'lowpass':
      kernel = createMovingAverageKernel(Math.max(1, Math.floor(N / cutoffFreq)));
      break;
    case 'highpass':
      kernel = createHighPassKernel(Math.max(1, Math.floor(N / cutoffFreq)));
      break;
    case 'bandpass':
      kernel = createBandPassKernel(Math.max(1, Math.floor(N / cutoffFreq)));
      break;
    default:
      kernel = [1];
  }

  return convolve(signalData, kernel);
}

function convolve(signal, kernel) {
  const isObject = typeof signal[0] === 'object' && signal[0] !== null;
  const N = signal.length;
  const M = kernel.length;
  const half = Math.floor(M / 2);
  const output = [];

  for (let i = 0; i < N; i++) {
    let acc = 0;
    for (let j = 0; j < M; j++) {
      const k = i + j - half;
      if (k >= 0 && k < N) {
        const val = isObject ? signal[k].value : signal[k];
        acc += val * kernel[j];
      }
    }
    output.push(isObject ? { ...signal[i], value: acc } : acc);
  }

  return output;
}

function createMovingAverageKernel(size) {
  return new Array(size).fill(1 / size);
}

function createHighPassKernel(size) {
  const lowpass = createMovingAverageKernel(size);
  const kernel = lowpass.map(v => -v);
  kernel[Math.floor(size / 2)] += 1;
  return kernel;
}

function createBandPassKernel(size) {
  const lowpass = createMovingAverageKernel(size);
  const highpass = createHighPassKernel(Math.floor(size / 2) || 1);
  return lowpass.map((v, i) => v + (highpass[i] || 0));
}

export { convolve };
