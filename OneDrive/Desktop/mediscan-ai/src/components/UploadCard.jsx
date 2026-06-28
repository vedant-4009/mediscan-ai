import React, { useState } from 'react';
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
