import { Container } from 'react-bootstrap';
import SignalGenerator from './components/SignalGenerator';
import useSignal from './hooks/useSignal';

function App() {
  const { signalParams, signalData, updateSignal } = useSignal();

  return (
    <Container className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <h1 className="display-4 text-primary">Signal Processing App</h1>
      <p className="lead text-muted">Welcome to the Signal Processing Web App</p>
      <SignalGenerator onGenerate={updateSignal} />
      <div>
        <h3>Signal Data</h3>
        <pre>{JSON.stringify(signalData.slice(0, 5), null, 2)}</pre>
      </div>
    </Container>
  );
}

export default App;