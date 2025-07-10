# 🎛️ Signal Processing Web App

An interactive educational web app to **generate**, **visualize**, **analyze**, and **filter** signals — built using **React**, **Vite**, and **Chart.js**.

🌐 **Live Demo**: [https://huzaif007.github.io/signal-processing-app](https://huzaif007.github.io/signal-processing-app)

---

## 🛠️ Tech Stack

- React 19
- Vite 7
- Tailwind CSS & Bootstrap 5
- Chart.js + react-chartjs-2
- FFT.js
- GitHub Pages (for deployment)

---

## ✅ Project Progress

### Step 1 — Project Setup
- Initialized Git repository and folder structure
- Installed & configured React + Vite + Tailwind + Bootstrap
- Planned component layout and architecture

### Step 2 — Signal Generator
- UI for signal controls (waveform type, amplitude, frequency, phase)
- Implemented signal generation (sine, square, triangle, noise)
- Used a reusable hook to manage signal data (time-domain)

### Step 3 — Signal Visualizer
- Integrated `Chart.js` for real-time plotting
- Added zoom, pan, and update-on-change support
- Responsive, dynamic visual display

### Step 4 — Frequency Analysis (FFT)
- Integrated `fft.js` for Fast Fourier Transform
- Toggle between time-domain and frequency-domain view
- Frequency spectrum plotting with peak detection and axis labels

### Step 5 — Filtering & Convolution
- Implemented low-pass, high-pass, and band-pass filters
- Used convolution for filter application
- Visual comparison of filtered vs original signal
- 🔧 **Convolution tool UI is under development (Coming Soon)**

---

## 📦 Components Overview

| Component           | Description                          |
|---------------------|--------------------------------------|
| `SignalGenerator`   | Generate signals with given params   |
| `Visualizer`        | Time-domain & frequency-domain plots |
| `FrequencyAnalyzer` | FFT spectrum display                 |
| `FilterControls`    | Choose & apply digital filters       |
| `ConvolutionTool`   | *(Coming soon...)*                   |
| `LiveStreamSignal`  | *(On hold...)*                       |

---

## 🔄 Next Steps

- **Control System Module**  
  - Transfer function input (gain, poles, zeros)  
  - Step/impulse response  
  - Bode and Root Locus plotting

- **AI Tutor Panel**  
  - Integrated ChatGPT panel for asking signal theory questions

- **Enhancements**  
  - Chart export (PNG, CSV)  
  - Dark mode, animations, tooltips  
  - Error handling, mobile responsiveness

---

## 📁 Folder Structure
signal-processing-app/
├── app/
│ ├── components/
│ ├── hooks/
│ ├── utils/
│ ├── App.jsx
│ └── main.jsx
├── docs/ # built output for GitHub Pages
├── README.md
├── vite.config.js
└── package.json

---

## 🧑‍💻 Author

**Huzaif Farooq**  
🌐 [GitHub Profile](https://github.com/huzaif007)

---

## 📜 License

This project is licensed under the CC BY-NC-ND 4.0 license.
You are free to view and learn from the code, but modifying, redistributing, or using it commercially is not allowed