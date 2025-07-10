import { Container } from 'react-bootstrap';
import SignalGenerator from './components/SignalGenerator';
import Visualizer from './components/Visualizer';
import useSignal from './hooks/useSignal';

function App() {
  const { signalParams, signalData, updateSignal } = useSignal();

  return (
    <Container className="min-vh-100 d-flex flex-column align-items-center">
      <h1 className="display-4 text-primary my-4">Signal Processing App</h1>
      <p className="lead text-muted mb-4">Welcome to the Signal Processing Web App</p>
      <SignalGenerator onGenerate={updateSignal} />
      {signalData.length > 0 && <Visualizer signalData={signalData} />}
    </Container>
  );
}

export default App;