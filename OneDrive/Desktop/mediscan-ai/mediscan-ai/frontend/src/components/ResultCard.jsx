import React from 'react';
function ResultCard({ result }) {
  if (!result) return null;
  const isPneumonia = result.diagnosis === 'PNEUMONIA';
  return (
    <div style={styles.card}>
      <h2 style={{ color: isPneumonia ? '#f87171' : '#34d399' }}>
        {isPneumonia ? 'Pneumonia Detected' : 'Normal'}
      </h2>
      <p style={styles.confidence}>Confidence: {result.confidence}%</p>
      <div style={styles.bar}>
        <div style={{ ...styles.fill, width: `${result.confidence}%`, background: isPneumonia ? '#f87171' : '#34d399' }} />
      </div>
      <p style={styles.recommendation}>{result.recommendation}</p>
    </div>
  );
}
const styles = {
  card: { background: '#1e1e2e', padding: '2rem', borderRadius: '12px', textAlign: 'center', marginTop: '1rem' },
  confidence: { color: 'white', fontSize: '1.2rem' },
  bar: { background: '#2d2d3f', borderRadius: '8px', height: '12px', margin: '1rem 0' },
  fill: { height: '12px', borderRadius: '8px', transition: 'width 0.5s' },
  recommendation: { color: '#cbd5e1', marginTop: '1rem' }
};
export default ResultCard;
