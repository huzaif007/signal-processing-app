import { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';

const SignalGenerator = ({ onGenerate }) => {
  const [waveform, setWaveform] = useState('sine');
  const [frequency, setFrequency] = useState(1);
  const [amplitude, setAmplitude] = useState(1);
  const [phase, setPhase] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ waveform, frequency, amplitude, phase });
  };

  return (
    <Container className="my-4">
      <Card>
        <Card.Body>
          <Card.Title>Signal Generator</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="waveform">
              <Form.Label>Waveform Type</Form.Label>
              <Form.Select
                value={waveform}
                onChange={(e) => setWaveform(e.target.value)}
              >
                <option value="sine">Sine</option>
                <option value="square">Square</option>
                <option value="triangle">Triangle</option>
                <option value="noise">Noise</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="frequency">
              <Form.Label>Frequency (Hz): {frequency}</Form.Label>
              <Form.Range
                min="0.1"
                max="10"
                step="0.1"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="amplitude">
              <Form.Label>Amplitude: {amplitude}</Form.Label>
              <Form.Range
                min="0.1"
                max="5"
                step="0.1"
                value={amplitude}
                onChange={(e) => setAmplitude(Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phase">
              <Form.Label>Phase (degrees): {phase}</Form.Label>
              <Form.Range
                min="0"
                max="360"
                step="1"
                value={phase}
                onChange={(e) => setPhase(Number(e.target.value))}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Generate Signal
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignalGenerator;