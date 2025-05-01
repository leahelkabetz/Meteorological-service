import React, { useState } from 'react';
import { MapPin } from 'lucide-react'; // אייקון של תחנות
import './StationsList.css';

interface Station {
  idStation: number;
  stationAddress: string;
  town: string;
  managerName: string;
}

const Stations = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [message, setMessage] = useState<string>('');
  const [stationsVisible, setStationsVisible] = useState<boolean>(false);
  const [stationsShow, setStationsShow] = useState<boolean>(false); // משתנה לשלוט בהצגת הכפתור
  const [loading, setLoading] = useState<boolean>(false); // משתנה לעקוב אחרי טעינה

  const handleGetStations = async () => {
    setMessage('');
    setLoading(true); // מתחילים להמתין
    try {
      const response = await fetch('http://localhost:5196/api/meteorologicalService/GetStations');
      if (!response.ok) {
        throw new Error('Failed to fetch stations');
      }

      const data = await response.json();
      console.log('Data received:', data);

      if (Array.isArray(data)) {
        setStations(data);
        setStationsShow(true); // התחנות הועמסו בהצלחה
      } else if (data.result && Array.isArray(data.result)) {
        setStations(data.result);
        setStationsShow(true); // התחנות הועמסו בהצלחה
      } else {
        setMessage('Invalid data format received');
      }
    } catch (error) {
      console.error('Error fetching stations:', error);
      setMessage('Error fetching stations');
    } finally {
      setLoading(false); // סיימנו להמתין
    }
  };

  const toggleStationsVisibility = () => {
    setStationsVisible(!stationsVisible);
    handleGetStations();
  };

  return (
    <div className="container">
      {/* כפתור להציג/להסתיר תחנות */}
      <button className="toggle-stations-button" onClick={toggleStationsVisibility} disabled={loading}>
        <MapPin className="station-icon" size={24} />
        {stationsShow ? 'Close Stations':'Show Stations'  }
      </button>

      {/* הצגת הודעת שגיאה */}
      {message && <p className="error-message">{message}</p>}

      {/* הצגת loader בזמן טעינה */}
      {loading && <div className="loader"></div>}

      {/* הצגת התחנות */}
      {stationsVisible && stations.length > 0 ? (
        <div className="station-grid">
          {stations.map((station) => (
            <div key={station.idStation} className="station-card">
              <h3>{station.town}</h3>
              <p><strong>Address:</strong> {station.stationAddress}</p>
              <p><strong>Manager:</strong> {station.managerName}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Stations;

