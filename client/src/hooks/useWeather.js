import { useState } from 'react';
import axios from 'axios';

// We keep the sensitive stuff here (for now)
const API_KEY = "2c415313f8a772e45db3f0c528bae5a3"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const useWeather = () => {
  // 1. State for Data, Loading, and Errors
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. The Function to Fetch Data
  const fetchWeather = async (city) => {
    setLoading(true);   // Start loading
    setError(null);     // Clear old errors
    
    try {
      const response = await axios.get(
        `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data); // Save the good data
    } catch (err) {
      // If it fails, save the error message
      setError(err.response ? err.response.data.message : "City not found");
      setWeatherData(null);
    } finally {
      setLoading(false);  // Stop loading (success or fail)
    }
  };

  // 3. Return the tools so the App can use them
  return { weatherData, loading, error, fetchWeather };
};