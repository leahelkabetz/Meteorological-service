import React from 'react';

interface Measurement {
  time: string;
  temperature: number;
  rainfall: number;
  windSpeed: number;
}

interface MeasurementCardProps {
  measurement: Measurement;
  date: string;
}

const MeasurementCard: React.FC<MeasurementCardProps> = ({ measurement, date }) => {
  return (
    <div className="measurement-card">
      <h4>{date}</h4>
      <div className="measurement-details">
        <p><strong>Time:</strong> {measurement.time}</p>
        <p><strong>Temperature:</strong> {measurement.temperature}°C</p>
        <p><strong>Rainfall:</strong> {measurement.rainfall} mm</p>
        <p><strong>Wind Speed:</strong> {measurement.windSpeed} m/s</p>
      </div>
    </div>
  );
};

export default MeasurementCard;
