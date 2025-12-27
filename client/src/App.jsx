import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import CurrentWeather from './components/CurrentWeather';
import { useWeather } from './hooks/useWeather';

function App() {
  const { weatherData, loading, error, fetchWeather } = useWeather();

  // 1. Initial Load: Get Mumbai weather
  useEffect(() => {
    fetchWeather("Mumbai");
  }, []);

  // 2. THIS IS THE SEARCH LOGIC 🔍
  // When Navbar sends a city name, this function runs
  const handleSearch = (city) => {
    fetchWeather(city);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      
      {/* 3. CONNECTING THE WIRE 🔌 */}
      {/* We pass the 'handleSearch' function down to the Navbar */}
      <Navbar onSearch={handleSearch} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error: </strong> {error}
          </div>
        )}

        <div className="grid gap-6">
           {/* Favorites Placeholder */}
           <div className="h-40 bg-white rounded-3xl shadow-sm border border-slate-200 p-6 flex items-center justify-center text-slate-400">
              Favorites Area (Coming Soon)
           </div>

           {/* Weather Card */}
           {loading ? (
             <div className="text-center py-20 text-slate-500 animate-pulse">
               Fetching weather...
             </div>
           ) : (
             weatherData && <CurrentWeather data={weatherData} />
           )}
           
        </div>
      </main>
    </div>
  );
}

export default App;