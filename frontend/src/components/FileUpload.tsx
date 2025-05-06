import React, { useState } from 'react';
import axios from 'axios';

type Props = {
  onUploadSuccess: (data: any[]) => void;
};

const FileUpload: React.FC<Props> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
        const apiUrl = process.env.REACT_APP_API_URL;

        //await axios.post('http://127.0.0.1:5000/upload', formData);
      const response =await axios.post(`${apiUrl}/upload`, formData);
      onUploadSuccess(response.data);
    } catch (error) {
      alert('Upload failed. Check your backend.');
      console.error(error);
    }
  };

  return (
    <div className="upload-box">
      <input
        type="file"
        accept=".log,.txt"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
