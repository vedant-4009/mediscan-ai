import React, { useState } from 'react';
import UploadCard from './components/UploadCard';
import ResultCard from './components/ResultCard';
import HeatmapView from './components/HeatmapView';
function App() {
  const [result, setResult] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const handleResult = (data, imageUrl) => {
    setResult(data);
    setOriginalImage(imageUrl);
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>MediScan AI</h1>
      <p style={styles.subtitle}>AI-Powered Medical X-Ray Diagnosis</p>
      <UploadCard onResult={handleResult} />
      <ResultCard result={result} />
      <HeatmapView original={originalImage} heatmap={result && result.heatmap} />
    </div>
  );
}
const styles = {
  container: { minHeight: '100vh', background: '#0f0f1a', padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' },
  header: { color: '#a78bfa', textAlign: 'center', fontSize: '2.5rem', marginBottom: '0.5rem' },
  subtitle: { color: '#94a3b8', textAlign: 'center', marginBottom: '2rem' }
};
export default App;
