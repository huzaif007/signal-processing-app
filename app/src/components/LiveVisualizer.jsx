// src/components/LiveVisualizer.jsx

const LiveVisualizer = ({ label = "Live Signal Visualizer" }) => {
  return (
    <div style={{
      border: "2px dashed #bbb",
      padding: "2rem",
      margin: "1rem 0",
      textAlign: "center",
      backgroundColor: "#f1f1f1",
      borderRadius: "8px"
    }}>
      <h3>{label}</h3>
      <p>🚧 This feature is currently on hold. Coming soon.</p>
    </div>
  );
};

export default LiveVisualizer;
