import React, { useState } from 'react';
import axios from 'axios';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import '../styles/upload.css';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(`Selected file: ${e.target.files[0].name}`);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(`Error uploading file: ${error.response.data.error}`);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h1>Upload JSON Data</h1>
        <input
          type="file"
          id="file-input"
          className="file-input"
          onChange={handleFileChange}
        />
        <label htmlFor="file-input" className="file-label">
          <CloudUploadIcon />
          <span>Choose a file</span>
        </label>
        {file && <p className="file-name">Selected file: {file.name}</p>}
        <button onClick={handleUpload}>Upload</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Upload;