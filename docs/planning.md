# Component Architecture
## Components
- SignalGenerator: UI for waveform params, outputs sample array (in app/src/components/).
- Visualizer: Plots signals (time/frequency) with Chart.js (in app/src/components/).
- Chat: AI tutor interface with GPT API (in app/src/components/).
- FilterControls: Filter type and cutoff UI (in app/src/components/).
- ControlSystems: Transfer function input, Bode/root locus plots (in app/src/components/).
- Layout: Responsive navbar/sidebar using Bootstrap (in app/src/components/).

## Data Flow
- SignalGenerator -> Visualizer (time domain).
- SignalGenerator -> FFT (in app/src/utils/) -> Visualizer (frequency domain).
- FilterControls -> Convolution (in app/src/utils/) -> Visualizer.
- ControlSystems -> Visualizer.
- Chat -> GPT API -> Chat.

## State Management
- Use React Context or Zustand for signal and app state.