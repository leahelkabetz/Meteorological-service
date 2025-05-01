import React, { useState } from 'react';
import './SummaryIndicators.css'; // ייבוא קובץ CSS
import { BarChart } from 'lucide-react'; // אייקון של גרף

interface MeasurementSummary {
  idStation: number;
  maxTemp: number | null;
  minTemp: number | null;
  maxRainfall: number | null;
  minRainfall: number | null;
}

const StationsList = () => {
  const [measurements, setMeasurements] = useState<MeasurementSummary[]>([]);
  const [message, setMessage] = useState<string>('');
  const [summariesVisible, setSummariesVisible] = useState<boolean>(false);
  const [summariesShow, setSummariesShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // משתנה לעקוב אחרי טעינה

  const handleGetMeasurements = async () => {
    setMessage('');
    setLoading(true); // מתחילים להמתין
    try {
      const response = await fetch('http://localhost:5196/api/meteorologicalService/GetAllSummaries');
      if (!response.ok) {
        throw new Error('Failed to fetch measurements');
      }

      const data = await response.json();
      console.log('Data received:', data);

      if (Array.isArray(data)) {
        setMeasurements(data);
        setSummariesShow(true); // סיכומים הועמסו בהצלחה
      } else if (data.result && Array.isArray(data.result)) {
        setMeasurements(data.result);
        setSummariesShow(true); // סיכומים הועמסו בהצלחה
      } else {
        setMessage('Invalid data format received');
      }
    } catch (error) {
      console.error('Error fetching measurements:', error);
      setMessage('Error fetching measurements');
    } finally {
      setLoading(false); // סיימנו להמתין
    }
  };

  const toggleSummariesVisibility = () => {
    setSummariesVisible(!summariesVisible);
    handleGetMeasurements(); // טוענים את הסיכומים
  };

  return (
    <div className="container">
      {/* כפתור להציג/להסתיר סיכומים */}
      <button className="toggle-summaries-button" onClick={toggleSummariesVisibility} disabled={loading}>
        <BarChart className="station-icon" size={24} />
        {summariesShow ? 'Close Summaries':'Show Summaries'  }
      </button>

      {/* הצגת הודעת שגיאה */}
      {message && <p className="error-message">{message}</p>}

      {/* הצגת loader בזמן טעינה */}
      {loading && <div className="loader"></div>}

      {/* הצגת סיכומי המדידות */}
      {summariesVisible && measurements.length > 0 ? (
        <div className="measurement-grid">
          {measurements.map((measurement) => (
            <div key={measurement.idStation} className="measurement-card">
              <h3>Station ID: {measurement.idStation}</h3>
              <p><strong>Max Temperature:</strong> {measurement.maxTemp ?? 'N/A'}°C</p>
              <p><strong>Min Temperature:</strong> {measurement.minTemp ?? 'N/A'}°C</p>
              <p><strong>Max Rainfall:</strong> {measurement.maxRainfall ?? 'N/A'} mm</p>
              <p><strong>Min Rainfall:</strong> {measurement.minRainfall ?? 'N/A'} mm</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default StationsList;
