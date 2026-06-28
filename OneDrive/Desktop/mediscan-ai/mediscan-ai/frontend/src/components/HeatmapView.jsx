import React from 'react';

function HeatmapView({ original, heatmap }) {
  if (!heatmap) return null;
  return (
    <div className="glass-card heatmap-card">
      <h2 className="card-title">🔬 AI Visual Analysis</h2>
      <div className="heatmap-row">
        <div className="heatmap-box">
          <h3 className="heatmap-label">Original X-Ray</h3>
          <img src={original} alt="original" className="heatmap-img" />
        </div>
        <div className="heatmap-box">
          <h3 className="heatmap-label">AI Heatmap (Grad-CAM)</h3>
          <img
            src={`data:image/jpeg;base64,${heatmap}`}
            alt="heatmap"
            className="heatmap-img"
          />
        </div>
      </div>
      <p className="heatmap-note">
        🔴 Highlighted regions show where the AI focused during diagnosis.
      </p>
    </div>
  );
}

export default HeatmapView;
