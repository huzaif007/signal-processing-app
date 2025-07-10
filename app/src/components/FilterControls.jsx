import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const FilterControls = ({ onApply, onReset }) => {
  const [filterType, setFilterType] = useState('lowpass');
  const [cutoffFreq, setCutoffFreq] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cutoffFreq <= 0) {
      alert('Cutoff frequency must be positive!');
      return;
    }
    onApply({ filterType, cutoffFreq });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4 w-100">
      <Row className="align-items-center">
        <Col xs={12} md={4}>
          <Form.Label>Filter Type</Form.Label>
          <Form.Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="lowpass">Low Pass</option>
            <option value="highpass">High Pass</option>
            <option value="bandpass">Band Pass</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={4}>
          <Form.Label>Cutoff Frequency (Hz)</Form.Label>
          <Form.Control
            type="number"
            min="1"
            max="50"
            step="1"
            value={cutoffFreq}
            onChange={(e) => setCutoffFreq(Number(e.target.value))}
          />
        </Col>
        <Col xs={12} md={4} className="mt-3 mt-md-0 d-flex gap-2">
          <Button variant="primary" type="submit">Apply Filter</Button>
          <Button variant="secondary" onClick={onReset}>Reset Filter</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterControls;
