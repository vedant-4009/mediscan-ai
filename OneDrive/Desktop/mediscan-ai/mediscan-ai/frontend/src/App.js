import React, { useState } from 'react';
import UploadCard from './components/UploadCard';
import ResultCard from './components/ResultCard';
import HeatmapView from './components/HeatmapView';
import HistoryPanel from './components/HistoryPanel';

function App() {
  const [result, setResult] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [history, setHistory] = useState([]);

  const handleResult = (data, imageUrl) => {
    setResult(data);
    setOriginalImage(imageUrl);
    if (data) {
      setHistory((prev) => [
        { id: Date.now(), data, imageUrl },
        ...prev,
      ]);
    }
  };

  const loadFromHistory = (item) => {
    setResult(item.data);
    setOriginalImage(item.imageUrl);
  };

  return (
    <div className="app-bg">
      <div className="app-container">
        <header className="app-header">
          <div className="logo-row">
            <span className="logo-icon">🩺</span>
            <h1>MediScan AI</h1>
          </div>
          <p className="subtitle">AI-Powered Medical X-Ray Diagnosis</p>
        </header>

        <div className="main-grid">
          <div className="left-col">
            <UploadCard onResult={handleResult} />
            <ResultCard result={result} />
            <HeatmapView original={originalImage} heatmap={result?.heatmap} />
          </div>

          <div className="right-col">
            <HistoryPanel history={history} onSelect={loadFromHistory} />
          </div>
        </div>

        <footer className="app-footer">
          <p>⚠️ This tool is for educational purposes only. Always consult a certified radiologist.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
