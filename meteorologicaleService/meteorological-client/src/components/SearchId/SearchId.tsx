import React, { useState } from 'react';
import { Search } from "lucide-react";
import './SearchId.css';

const SearchMeasurements = () => {
  const [stationId, setStationId] = useState<string>('');
  const [measurements, setMeasurements] = useState<any>(null);
  const [message, setMessage] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); 

  const handleSearchById = async () => {
    setMessage('');
    setMeasurements(null); 
    setLoading(true); 

    try {
      const response = await fetch(`http://localhost:5196/api/meteorologicalService/station/${stationId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setMeasurements(data);
    } catch (error) {
      console.error(error);
      setMessage('Error fetching measurements');
    } finally {
      setLoading(false); // סיום טעינה
    }
  };

  const handleToggleDate = (date: string) => {
    setSelectedDate(selectedDate === date ? null : date);
  };

  // פונקציה להמיר תאריך לפורמט קריא
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('he-IL'); 
  };

  // פונקציה למיון התאריכים בסדר כרונולוגי
  const sortedMeasurements = measurements
    ? Object.entries(measurements).sort(([dateA], [dateB]) => {
        const dateAObj = new Date(dateA);
        const dateBObj = new Date(dateB);
        return dateAObj.getTime() - dateBObj.getTime(); // מיון מהישן לחדש
      })
    : [];

  return (
    <div className="search-container">
      <div className="search-field">
        <input
          id="stationId"
          type="text"
          value={stationId}
          onChange={(e) => setStationId(e.target.value)}
          placeholder="Enter station ID"
          className="input-field"
        />
      </div>
      <button
        className="search-button"
        onClick={handleSearchById}
        disabled={loading}
      >
        {loading ? (
          <div className="loader"></div> // הצגת האנימציה
        ) : (
          <>Search <Search className="search-icon" /></>
        )}
      </button>

      {message && <p className="error-message">{message}</p>}
      {measurements && (
        <div className="results">
          <h3 className="station-header">Measurements for Station {stationId}</h3>
          <div className="measurement-list">
            {sortedMeasurements.map(([dateKey, data]) => (
              <div key={dateKey} className="date-section">
                <button className="date-button" onClick={() => handleToggleDate(dateKey)}>
                  {formatDate(dateKey)} 
                </button>
                {selectedDate === dateKey && (
                  <div className="measurements">
                    {Array.isArray(data) && data.map((measurement: any) => (
                      <div key={measurement.time} className="measurement-card">
                        <p className="measurement-time"><strong>Time:</strong> {measurement.time}</p>
                        <p className="measurement-temp"><strong>Temperature:</strong> {measurement.temperature}°C</p>
                        <p className="measurement-rain"><strong>Rainfall:</strong> {measurement.rainfall} mm</p>
                        <p className="measurement-wind"><strong>Wind Speed:</strong> {measurement.windSpeed} km/h</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMeasurements;
