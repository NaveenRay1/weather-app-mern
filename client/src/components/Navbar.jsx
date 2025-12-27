import React, { useState, useEffect } from 'react'; // Added useEffect
import { Link } from 'react-router-dom';
import axios from 'axios'; // Added axios

// Receive the "onSearch" function as a prop from App.jsx
const Navbar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]); // Stores the list of cities (London UK, London CA...)
  const [showDropdown, setShowDropdown] = useState(false); // Should we show the list?

  // 🔴 YOUR KEY (We will move this to .env later)
  const API_KEY = "2c415313f8a772e45db3f0c528bae5a3";

  // LOGIC: Fetch cities when user types
  useEffect(() => {
    const fetchCities = async () => {
      // Only search if user types at least 3 letters (to save API calls)
      if (city.length > 2) {
        try {
          const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;
          const response = await axios.get(url);
          setSuggestions(response.data);
          setShowDropdown(true);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      } else {
        setSuggestions([]); // Clear list if text is too short
        setShowDropdown(false);
      }
    };

    // "Debounce": Wait 500ms after user stops typing before calling API
    // This prevents calling the API for every single letter (L... Lo... Lon...)
    const timer = setTimeout(() => {
      fetchCities();
    }, 500);

    return () => clearTimeout(timer); // Cleanup function
  }, [city]);

  // LOGIC: When user clicks a suggestion
  const handleSelectCity = (cityName) => {
    onSearch(cityName); // Send to App
    setCity("");        // Clear input
    setSuggestions([]); // Clear list
    setShowDropdown(false); // Hide dropdown
  };

  // LOGIC: When user presses Enter
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setShowDropdown(false);
    }
  };

  // ... (Return statement comes next)
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                W
              </div>
              <span className="text-xl font-bold text-slate-800 tracking-tight">
                Weather<span className="text-blue-500">App</span>
              </span>
            </Link>
          </div>

          {/* SEARCH BAR (Now Functional) */}
       {/* SEARCH BAR CONTAINER */}
          <div className="flex-1 max-w-md mx-8 hidden md:block relative">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                placeholder="Search city..."
                className="w-full bg-slate-100 border-none rounded-xl py-3 px-4 pl-12 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <svg 
                className="absolute left-4 top-3.5 h-5 w-5 text-slate-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </form>

            {/* DROPDOWN LIST (Only shows when we have suggestions) */}
            {showDropdown && suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white rounded-xl shadow-xl border border-slate-100 mt-2 overflow-hidden z-50">
                {suggestions.map((item, index) => (
                  <li 
                    key={index}
                    onClick={() => handleSelectCity(item.name)}
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-slate-50 last:border-none flex justify-between items-center transition-colors"
                  >
                    <span className="font-medium text-slate-700">{item.name}</span>
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                      {item.country}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <a href="https://github.com/NaveenRay1" target="_blank" rel="noreferrer" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
              Github
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;