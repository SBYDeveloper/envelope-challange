import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function App() {
  // Set up state variables to track the envelopes and the current envelope
  const [envelopes, setEnvelopes] = useState([]);
  const [currentEnvelope, setCurrentEnvelope] = useState(null);
  const [drawnEnvelopes, setDrawnEnvelopes] = useState([]);

  // Function to set up the game by writing the numbers 1-100 on the envelopes
  const setupGame = () => {
    const newEnvelopes = [];
    for (let i = 1; i <= 100; i++) {
      newEnvelopes.push(i);
    }
    setEnvelopes(newEnvelopes);
    setDrawnEnvelopes([]);
  };
  // Function to draw an envelope
  const drawEnvelope = () => {
    // Check if there are any envelopes left
    if (envelopes.length > 0) {
      // Choose a random envelope
      const index = Math.floor(Math.random() * envelopes.length);
      const envelope = envelopes[index];

      // Remove the envelope from the array and add it to the drawn envelopes
      setEnvelopes(envelopes.filter((e, i) => i !== index));
      setDrawnEnvelopes([...drawnEnvelopes, envelope]);
      setCurrentEnvelope(envelope);
    } else {
      setCurrentEnvelope(null);
    }
  };
  // Save the drawn envelopes to local storage when they change
  useEffect(() => {
    document.cookie = `drawnEnvelopes=${JSON.stringify(drawnEnvelopes)}`;
  }, [drawnEnvelopes]);

// Load the drawn envelopes from a cookie when the component mounts
useEffect(() => {
  const cookies = document.cookie.split(';');
  const drawnEnvelopesCookie = cookies.find((c) => c.trim().startsWith('drawnEnvelopes='));
  if (drawnEnvelopesCookie) {
    setDrawnEnvelopes(JSON.parse(drawnEnvelopesCookie.split('=')[1]));
  }
}, []);

// Calculate the sum of the drawn envelopes
const sum = drawnEnvelopes.reduce((total, value) => total + value, 0);

// Render the game interface
return (
  <Container>
    <Row className="mt-5">
      <Col className="text-center">
      <div className="envelope">
    <div className="paper">
      {currentEnvelope ? (
        <p>Today's envelope: {currentEnvelope}</p>
      ) : (
        <p>No more envelopes!</p>
      )}
    </div>
  </div>
   <div className='mt-10 mb-10'>
        <Button variant="success" className="mr-10" onClick={drawEnvelope}>Draw Envelope</Button>
        <Button variant="danger" className="ml-10" onClick={setupGame}>Reset Game</Button>
        </div>
        <p className='d-none'>Drawn envelopes: {drawnEnvelopes.join(', ')}</p>
        <p>You should have saved: <b>{sum}</b> from the envelope challange</p>
      </Col>
    </Row>
  </Container>
);
}

export default App;