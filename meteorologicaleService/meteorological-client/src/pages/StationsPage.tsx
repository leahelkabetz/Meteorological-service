import { useEffect, useState } from "react";
import { getStations } from "../services/MeteorologicalService";

interface Station {
  id: number;
  name: string;
  location: string;
}

const StationsPage = () => {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    const fetchStations = async () => {
      const data = await getStations();
      setStations(data);
    };
    fetchStations();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">רשימת תחנות</h1>
      {stations.length > 0 ? (
        <ul className="bg-white shadow-lg rounded-lg p-4">
          {stations.map((station) => (
            <li key={station.id} className="p-2 border-b">
              📍 <strong>{station.name}</strong> - {station.location}
            </li>
          ))}
        </ul>
      ) : (
        <p>לא נמצאו תחנות.</p>
      )}
    </div>
  );
};

export default StationsPage;
