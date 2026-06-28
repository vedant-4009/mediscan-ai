import React from 'react';

function ResultCard({ result }) {
  if (!result) return null;
  const isPneumonia = result.diagnosis === 'PNEUMONIA';

  return (
    <div className={`glass-card result-card ${isPneumonia ? 'result-danger' : 'result-safe'}`}>
      <div className="result-icon-row">
        <span className="result-icon">{isPneumonia ? '⚠️' : '✅'}</span>
        <h2 className="result-title">
          {isPneumonia ? 'Pneumonia Detected' : 'Normal'}
        </h2>
      </div>

      <div className="confidence-wrap">
        <div className="confidence-label-row">
          <span>Confidence</span>
          <span className="confidence-value">{result.confidence}%</span>
        </div>
        <div className="confidence-bar-bg">
          <div
            className="confidence-bar-fill"
            style={{
              width: `${result.confidence}%`,
              background: isPneumonia
                ? 'linear-gradient(90deg, #f87171, #ef4444)'
                : 'linear-gradient(90deg, #34d399, #10b981)',
            }}
          />
        </div>
      </div>

      <p className="recommendation-text">{result.recommendation}</p>
    </div>
  );
}

export default ResultCard;
