import os

os.makedirs('src/api', exist_ok=True)
os.makedirs('src/components', exist_ok=True)

files = {
'src/api/mediscan.js': """import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000';
export const predictImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  const response = await axios.post(`${API_URL}/predict`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};
""",
'src/components/UploadCard.jsx': """import React, { useState } from 'react';
import { predictImage } from '../api/mediscan';
function UploadCard({ onResult }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setLoading(true);
    try {
      const result = await predictImage(file);
      onResult(result, URL.createObjectURL(file));
    } catch (err) {
      alert('Error: ' + err.message);
    }
    setLoading(false);
  };
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Upload X-Ray Image</h2>
      <input type="file" accept="image/*" onChange={handleUpload} style={styles.input} />
      {preview && <img src={preview} alt="preview" style={styles.preview} />}
      {loading && <p style={styles.loading}>Analyzing...</p>}
    </div>
  );
}
const styles = {
  card: { background: '#1e1e2e', padding: '2rem', borderRadius: '12px', textAlign: 'center' },
  title: { color: '#a78bfa', marginBottom: '1rem' },
  input: { padding: '0.5rem', borderRadius: '8px', background: '#2d2d3f', color: 'white', border: '1px solid #a78bfa', cursor: 'pointer' },
  preview: { marginTop: '1rem', width: '200px', borderRadius: '8px' },
  loading: { color: '#a78bfa', marginTop: '1rem', fontSize: '1.2rem' }
};
export default UploadCard;
""",
'src/components/ResultCard.jsx': """import React from 'react';
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
""",
'src/components/HeatmapView.jsx': """import React from 'react';
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
""",
'src/App.js': """import React, { useState } from 'react';
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
"""
}

for path, content in files.items():
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Created: {path}")

print("All files created!")