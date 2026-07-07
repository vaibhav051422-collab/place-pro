import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, File, CheckCircle, AlertCircle } from 'lucide-react';

import Navbar from '../components/Navbar';
import { Button, SectionCard } from '../components';
import api from '../services/api';

import './ResumeAnalysis.css';

export const ResumeAnalysis = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      

        const token = localStorage.getItem("token");

const response = await api.post(
  "/api/resume/upload",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }
);

setResult(response.data);

localStorage.setItem(
  "dashboardData",
  JSON.stringify(response.data)
);

setTimeout(() => {
  navigate("/dashboard");
}, 1000);
    } catch (err) {
  console.error(err);

  setError(
    err.response?.data?.detail ||
    err.message ||
    "Failed to analyze resume"
  );
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-analysis">
      <Navbar />
      
      <main className="analysis-main">
        <motion.div
          className="analysis-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="analysis-title">Resume Analysis</h1>
          <p className="analysis-subtitle">Get AI-powered insights on your resume</p>
        </motion.div>

        <div className="analysis-container">
          {!result ? (
            <SectionCard title="Upload Your Resume" delay={0}>
              <div className="upload-area">
                <input
                  type="file"
                  id="file-input"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="file-input" className="upload-label">
                  <Upload size={48} />
                  <p>Drag and drop your resume or click to select</p>
                  <span>.PDF, .DOC, .DOCX up to 5MB</span>
                </label>
                
                {file && (
                  <div className="file-info">
                    <File size={20} />
                    <div>
                      <p className="file-name">{file.name}</p>
                      <p className="file-size">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="error-message">
                    <AlertCircle size={20} />
                    {error}
                  </div>
                )}

                <Button 
                  variant="primary" 
                  size="lg"
                  loading={loading}
                  onClick={handleUpload}
                  style={{ marginTop: '1rem' }}
                >
                  Analyze Resume
                </Button>
              </div>
            </SectionCard>
          ) : (
            <motion.div
              className="results-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <SectionCard title="Analysis Results" delay={0}>
                <div className="score-display">
                  <div className="score-circle">
                    <div className="score-number">{result.score}</div>
                    <div className="score-label">/10</div>
                  </div>
                  <div className="score-text">
                    <h3>Resume Score</h3>
                    <p>Your resume is in good shape. Follow the recommendations below to improve further.</p>
                  </div>
                </div>
              </SectionCard>

              <div className="results-grid">
                <SectionCard title="Strengths" delay={0.1}>
                  {result.strengths.map((strength, idx) => (
                    <div key={idx} className="result-item strength">
                      <CheckCircle size={20} />
                      <span>{strength}</span>
                    </div>
                  ))}
                </SectionCard>

                <SectionCard title="Weaknesses" delay={0.2}>
                  {result.weaknesses.map((weakness, idx) => (
                    <div key={idx} className="result-item weakness">
                      <AlertCircle size={20} />
                      <span>{weakness}</span>
                    </div>
                  ))}
                </SectionCard>

                <SectionCard title="Recommendations" delay={0.3}>
                  {result.recommendations.map((rec, idx) => (
                    <div key={idx} className="result-item">
                      <span className="step">{idx + 1}</span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </SectionCard>
              </div>

              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => { setResult(null); setFile(null); }}
                style={{ marginTop: '1rem' }}
              >
                Analyze Another Resume
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResumeAnalysis;
