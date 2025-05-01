import React, { useState } from 'react';
import './CreateStation.css';
import { Eye, EyeOff } from 'lucide-react';

const CreateStation = () => {
  const [managerEmail, setManagerEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');

  const adminEmail = 'Leah23531@gmail.com';
  const adminPassword = '12345';

  const [station, setStation] = useState({
    IdStation: '',
    StationAddress: '',
    Town: '',
    ManagerName: '',
  });

  const authenticateAdmin = () => {
    if (managerEmail.trim().toLowerCase() === adminEmail.toLowerCase() && password.trim() === adminPassword) {
      setIsAuthenticated(true);
      setMessage('');
    } else {
      setMessage('Invalid credentials. Only the manager can create a station.');
    }
  };

  const validateStationData = () => {
    if (!station.IdStation.trim()) {
      setMessage('Station ID is required.');
      return false;
    }
   
    if (!/^[0-9]+$/.test(station.IdStation) || Number(station.IdStation) < 0) {
      setMessage('Station ID must be a positive number.');
      return false;
    }
    
    if (!station.StationAddress.trim()) {
      setMessage('Station address is required.');
      return false;
    }
    if (!/^[A-Za-z\s]+$/.test(station.Town)) {
      setMessage('Town must contain only letters.');
      return false;
    }
    if (!/^[A-Za-z\s]+$/.test(station.ManagerName)) {
      setMessage('Manager name must contain only letters.');
      return false;
    }
    setMessage('');
    return true;
  };

  const handleCreateStation = async () => {
    if (!validateStationData()) return;
    try {
      const stationData = { ...station };
      const response = await fetch('http://localhost:5196/api/meteorologicalService/station', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stationData),
      });
      if (!response.ok) throw new Error('Failed to create station');
      setMessage('Station created successfully!');
      setStation({ IdStation: '', StationAddress: '', Town: '', ManagerName: '' });
      setManagerEmail('');
      setPassword('');
      setIsAuthenticated(false);
    } catch (error) {
      setMessage('Error creating station: ' + error);
    }
  };

  return (
    <div className="container">
      {!isAuthenticated ? (
        <div className="login-form">
          <h2>Login as Manager</h2>
          <input className='input-login' type="email" value={managerEmail} onChange={(e) => setManagerEmail(e.target.value)} placeholder="Enter your email" />
          {/* <input className='input-login' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" /> */}
          <div className="password-container">
            <input 
              className='input-login password-input' 
              type={isPasswordVisible ? "text" : "password"} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
            />
            {password && (
              
              <button 
                type="button"
                className="eye-icon"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            )}
          </div>
          <button onClick={authenticateAdmin} className="login-button">Login</button>
          {message && <p className="error-message">{message}</p>}
        </div>
      ) : (
        <div className="create-station-form">
          <h2>Create Station</h2>
          <input className='input-login' type="number" value={station.IdStation} onChange={(e) => setStation({ ...station, IdStation: e.target.value })} placeholder="Station ID" required />
          <input className='input-login' type="text" value={station.StationAddress} onChange={(e) => setStation({ ...station, StationAddress: e.target.value })} placeholder="Station Address" required />
          <input className='input-login' type="text" value={station.Town} onChange={(e) => setStation({ ...station, Town: e.target.value })} placeholder="Town" required />
          <input className='input-login' type="text" value={station.ManagerName} onChange={(e) => setStation({ ...station, ManagerName: e.target.value })} placeholder="Manager Name" required />
          <button onClick={handleCreateStation} className="create-button">Create Station</button>
          {message && <p className="error-message">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default CreateStation;
