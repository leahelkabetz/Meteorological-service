// import React, { useState } from 'react';
// import './SearchId&Date.css';
// import { Search } from "lucide-react";

// const SearchMeasurements = () => {
//   const [stationId, setStationId] = useState<string>('');
//   const [date, setDate] = useState<string>('');
//   const [measurements, setMeasurements] = useState<any>(null);
//   const [message, setMessage] = useState<string>('');

//   const handleSearchByIdAndDate = async () => {
//     try {
//       const response = await fetch(`http://localhost:5196/api/meteorologicalService/station/${stationId}/${date}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }
//       const data = await response.json();
//       setMeasurements(data);
//       setMessage('');
//     } catch (error) {
//       console.error(error);
//       setMessage('Error fetching measurements');
//       setMeasurements(null);
//     }
//   };

//   return (
//     <div className="search-container">
//       <div className="search-field">
//         {/* <label htmlFor="stationId">Station ID</label> */}
//         <input
//           id="stationId"
//           type="text"
//           value={stationId}
//           onChange={(e) => setStationId(e.target.value)}
//           placeholder="Enter station ID"
//           className="input-field"
//         />
//       </div>
//       <div className="search-field">
//         {/* <label htmlFor="date">Date</label> */}
//         <input
//           id="date"
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           className="input-field"
//         />
//       </div>
//       <button className="search-button" onClick={handleSearchByIdAndDate}>Search
//      <Search className="search-icon" />
// </button>
//       {message && <p className="error-message">{message}</p>}
//       {measurements && (
//         <div className="results">
//           <h3 className="station-header">Measurements for Station {stationId} on {date}</h3>
//           <div className="measurement-list">
//             {measurements.map((measurement: any, index: number) => (
//               <div key={index} className="measurement-card">
//                 <p className="measurement-time"><strong>Time:</strong> {measurement.time}</p>
//                 <p className="measurement-temp"><strong>Temperature:</strong> {measurement.temperature}°C</p>
//                 <p className="measurement-rain"><strong>Rainfall:</strong> {measurement.rainfall} mm</p>
//                 <p className="measurement-wind"><strong>Wind Speed:</strong> {measurement.windSpeed} km/h</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchMeasurements;
import React, { useState } from 'react';
import './SearchId&Date.css';
import { Search } from "lucide-react";

const SearchMeasurements = () => {
  const [stationId, setStationId] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [measurements, setMeasurements] = useState<any>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // מצב טעינה

  const handleSearchByIdAndDate = async () => {
    setMessage('');
    setMeasurements(null); // איפוס הנתונים הקודמים לפני חיפוש חדש
    setLoading(true); // הפעלת האנימציה (הכפתור נשאר פעיל)

    try {
      const response = await fetch(`http://localhost:5196/api/meteorologicalService/station/${stationId}/${date}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setMeasurements(data);
      setMessage('');
    } catch (error) {
      console.error(error);
      setMessage('Error fetching measurements');
      setMeasurements(null);
    } finally {
      setLoading(false); // סיום טעינה
    }
  };
  // const handleSearchByIdAndDate = async () => {
  //   setStationId('');
  //   setDate('');
  //   setMeasurements(null);
  //   setMessage('');
  //   setLoading(true);
  
  //   try {
  //     const response = await fetch(`http://localhost:5196/api/meteorologicalService/station/${stationId}/${date}`);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch data');
  //     }
  //     const data = await response.json();
  //     setMeasurements(data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
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
      <div className="search-field">
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input-field"
        />
      </div>
      <button
        className="search-button"
        onClick={handleSearchByIdAndDate}
        disabled={loading}
      >
        {loading ? (
          <div className="loader_len"></div> // הצגת האנימציה בזמן טעינה
        ) : ''}
         <>
            Search <Search className="search-icon" />
          </>
      </button>
      {message && <p className="error-message">{message}</p>}
      {measurements && (
        <div className="results">
          <h3 className="station-header">Measurements for Station {stationId} on {date}</h3>
          <div className="measurement-list">
            {measurements.map((measurement: any, index: number) => (
              <div key={index} className="measurement-card">
                <p className="measurement-time"><strong>Time:</strong> {measurement.time}</p>
                <p className="measurement-temp"><strong>Temperature:</strong> {measurement.temperature}°C</p>
                <p className="measurement-rain"><strong>Rainfall:</strong> {measurement.rainfall} mm</p>
                <p className="measurement-wind"><strong>Wind Speed:</strong> {measurement.windSpeed} km/h</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMeasurements;
