import React from 'react';
function HeatmapView({ original, heatmap }) {
  if (!heatmap) return null;
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h3 style={styles.label}>Original X-Ray</h3>
        <img src={original} alt="original" style={styles.img} />
      </div>
      <div style={styles.box}>
        <h3 style={styles.label}>AI Heatmap (Grad-CAM)</h3>
        <img src={`data:image/jpeg;base64,${heatmap}`} alt="heatmap" style={styles.img} />
      </div>
    </div>
  );
}
const styles = {
  container: { display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' },
  box: { textAlign: 'center' },
  label: { color: '#a78bfa', marginBottom: '0.5rem' },
  img: { width: '200px', borderRadius: '8px', border: '2px solid #a78bfa' }
};
export default HeatmapView;
