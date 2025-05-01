import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stations from './components/StationList/StationsList';
import SummaryIndicators from './components/SummaryIndicators/SummaryIndicators';
import SearchIdDate from './components/SearchId&Date/SearchId&Date';
import SearchId from './components/SearchId/SearchId';
import CreateStation from './components/CreateStation/CreateStation';
import { Button, Box, Typography } from '@mui/material';
import './App.css';

const App = () => {
  const [currentView, setCurrentView] = useState<string>('');
  useEffect(() => {
    const loadData = async () => {
      try {
        const dictionaryResponse = await axios.post("http://localhost:5196/api/meteorologicalService/loadDictionary");
        console.log("Dictionary Loaded:", dictionaryResponse.data);
        
        // await new Promise(resolve => setTimeout(resolve, 1000));
        // const summaryResponse = await axios.post("http://localhost:5196/api/meteorologicalService/CreateSummary");
        // console.log("Summary Created:", summaryResponse.data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  const renderComponent = () => {
    switch (currentView) {
      case 'stations':
        return <Stations />;
      case 'summaryIndicators':
        return <SummaryIndicators />;
      case 'searchIdDate':
        return <SearchIdDate />;
      case 'searchId':
        return <SearchId />;
      case 'createStation':
        return <CreateStation />;
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 0, textAlign: 'center', padding: 3 }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 600,
             //fontFamily: 'Comic Sans MS, sans-serif',
            // fontFamily: 'Lobster, sans-serif',
            fontFamily: 'Titan One, sans-serif',
            color: '#2c3e50'
          }}
        >
          Meteorological Service
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" onClick={() => setCurrentView('stations')} sx={{ fontSize: '14px', padding: '10px 20px', borderRadius: '12px', background: '#ff5722', '&:hover': { background: '#d32f2f', boxShadow: '0 8px 16px rgba(211, 47, 47, 0.6)', color: '#fff' } }}>Stations</Button>
          <Button variant="contained" onClick={() => setCurrentView('summaryIndicators')} sx={{ fontSize: '14px', padding: '10px 20px', borderRadius: '12px', background: '#4caf50', '&:hover': { background: '#388e3c', boxShadow: '0 8px 16px rgba(56, 142, 60, 0.6)', color: '#fff' } }}>Summary Indicators</Button>
          <Button variant="contained" onClick={() => setCurrentView('searchId')} sx={{ fontSize: '14px', padding: '10px 20px', borderRadius: '12px', background: '#2196f3', '&:hover': { background: '#1976d2', boxShadow: '0 8px 16px rgba(25, 118, 210, 0.6)', color: '#fff' } }}>Search by ID</Button>
          <Button variant="contained" onClick={() => setCurrentView('searchIdDate')} sx={{ fontSize: '14px', padding: '10px 20px', borderRadius: '12px', background: '#ff9800', '&:hover': { background: '#fb8c00', boxShadow: '0 8px 16px rgba(251, 140, 0, 0.6)', color: '#fff' } }}>Search by ID and Date</Button>
          <Button variant="contained" onClick={() => setCurrentView('createStation')} sx={{ fontSize: '14px', padding: '10px 20px', borderRadius: '12px', background: '#9c27b0', '&:hover': { background: '#8e24aa', boxShadow: '0 8px 16px rgba(142, 36, 170, 0.6)', color: '#fff' } }}>Create Station</Button>
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', padding: 3 }}>
        {renderComponent()}
      </Box>

      <Box sx={{ flex: 0, textAlign: 'center', padding: 2, background: '#f5f5f5', borderTop: '1px solid #ddd' }}>
        <Typography variant="body2" color="textSecondary">
          All rights reserved &copy; 2025 | Developed by Leah Elkabetz | Meteorological Service
        </Typography>
      </Box>
    </Box>
  );
};

export default App;
