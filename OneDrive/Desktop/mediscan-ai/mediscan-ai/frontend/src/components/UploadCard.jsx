import React, { useState, useRef } from 'react';
import { predictImage } from '../api/mediscan';

function UploadCard({ onResult }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const processFile = async (file) => {
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    setLoading(true);
    onResult(null, imageUrl);
    try {
      const result = await predictImage(file);
      onResult(result, imageUrl);
    } catch (err) {
      alert('Error: ' + err.message);
      onResult(null, imageUrl);
    }
    setLoading(false);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setShowCamera(true);
      setTimeout(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      }, 100);
    } catch (err) {
      alert('Camera access denied or unavailable.');
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setShowCamera(false);
  };

  const captureFromCamera = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
      processFile(file);
      closeCamera();
    }, 'image/jpeg');
  };

  return (
    <div className="glass-card upload-card">
      <h2 className="card-title">📤 Upload X-Ray Image</h2>

      {!showCamera ? (
        <>
          <div
            className={`dropzone ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            {preview ? (
              <img src={preview} alt="preview" className="preview-img" />
            ) : (
              <div className="dropzone-placeholder">
                <span className="dropzone-icon">🩻</span>
                <p>Drag & drop X-ray here</p>
                <p className="dropzone-sub">or click to browse</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              style={{ display: 'none' }}
            />
          </div>

          <div className="action-row">
            <button className="btn-secondary" onClick={openCamera}>
              📷 Use Camera
            </button>
          </div>
        </>
      ) : (
        <div className="camera-box">
          <video ref={videoRef} autoPlay playsInline className="camera-video" />
          <div className="action-row">
            <button className="btn-primary" onClick={captureFromCamera}>
              📸 Capture
            </button>
