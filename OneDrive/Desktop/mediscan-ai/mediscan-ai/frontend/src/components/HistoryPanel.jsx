import React from 'react';

function HistoryPanel({ history, onSelect }) {
  return (
    <div className="glass-card history-panel">
      <h2 className="card-title">🕓 Scan History</h2>
      {history.length === 0 ? (
        <p className="history-empty">No scans yet. Upload an X-ray to begin.</p>
      ) : (
        <div className="history-list">
          {history.map((item) => {
            const isPneumonia = item.data?.diagnosis === 'PNEUMONIA';
            return (
              <div
                key={item.id}
                className="history-item"
                onClick={() => onSelect(item)}
              >
                <img src={item.imageUrl} alt="scan" className="history-thumb" />
                <div className="history-info">
                  <span
                    className={`history-badge ${
                      isPneumonia ? 'badge-danger' : 'badge-safe'
                    }`}
                  >
                    {isPneumonia ? 'Pneumonia' : 'Normal'}
                  </span>
                  <span className="history-confidence">
                    {item.data?.confidence}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HistoryPanel;
