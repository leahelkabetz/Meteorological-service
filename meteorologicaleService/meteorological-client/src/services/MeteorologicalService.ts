import axios from 'axios';

const apiUrl = 'http://localhost:5196/api/meteorologicalService'; // עדכון הכתובת לפורט הנכון

export const getStations = async () => {
  try {
    const response = await axios.get(`${apiUrl}/stations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stations:', error);
    throw error;
  }
};

export const createStation = async (station: any) => {
  try {
    const response = await axios.post(`${apiUrl}/station`, station);
    return response.data;
  } catch (error) {
    console.error('Error creating station:', error);
    throw error;
  }
};
