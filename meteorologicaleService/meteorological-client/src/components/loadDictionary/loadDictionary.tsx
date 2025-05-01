import React, { useState } from 'react';
import './loadDictionary.css'; // קובץ עיצוב מותאם

const LoadDictionary = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLoadDictionary = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5196/api/meteorologicalService/loadDictionary', {
        method: 'POST',
      });
      
      const result = await response.text();
      
      if (!response.ok) {
        throw new Error(result || 'Failed to load dictionary');
      }

      setMessage('✅ Dictionary loaded successfully!');
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        setMessage(`❌ Error: ${errorMessage}`);
      }      
     finally {
      setLoading(false);
    }
  };

  return (
    <div className="dictionary-container">
      <h2>Load Dictionary</h2>
      <button className="load-button" onClick={handleLoadDictionary} disabled={loading}>
        {loading ? 'Loading...' : 'Load Dictionary'}
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default LoadDictionary;
