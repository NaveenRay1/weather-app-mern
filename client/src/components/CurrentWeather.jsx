import React from 'react';
import { CloudSun, Wind, Droplets, ArrowDown, ArrowUp } from 'lucide-react';

const CurrentWeather = ({ data }) => {
  // Safety Check: If there is no data, don't try to render anything
  if (!data) return null;

  // 1. Destructure the data (Pull out what we need from the big object)
  const { name, main, weather, wind, sys } = data;
  
  // 2. Format the data (Round the temperature)
  const temperature = Math.round(main.temp);
  const description = weather[0].description;
  const country = sys.country;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden transition-all duration-300 hover:shadow-md">
      
      {/* HEADER: City & Country */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{name}</h2>
          <p className="text-slate-500 text-sm mt-1">{country}</p>
        </div>
        <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Live
        </span>
      </div>

      {/* MAIN: Temperature & Icon */}
      <div className="flex items-center gap-8 mb-8">
        <div>
          <h1 className="text-7xl font-bold text-slate-900 tracking-tighter">
            {temperature}°
          </h1>
          <p className="text-slate-500 font-medium mt-1 pl-2 capitalize">
            {description}
          </p>
        </div>
        {/* We will make this icon dynamic later, keeping it static for now */}
        <CloudSun className="w-24 h-24 text-blue-500 ml-auto" strokeWidth={1.5} />
      </div>

      {/* DIVIDER */}
      <div className="h-px bg-slate-100 w-full mb-8"></div>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* Wind Speed */}
        <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl">
          <Wind className="w-6 h-6 text-slate-400 mb-2" />
          <span className="text-slate-800 font-bold text-lg">{wind.speed}</span>
          <span className="text-slate-400 text-xs uppercase">km/h</span>
        </div>

        {/* Humidity */}
        <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl">
          <Droplets className="w-6 h-6 text-slate-400 mb-2" />
          <span className="text-slate-800 font-bold text-lg">{main.humidity}</span>
          <span className="text-slate-400 text-xs uppercase">Humidity %</span>
        </div>

        {/* High/Low Temp */}
        <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl">
          <div className="flex gap-1 mb-2">
            <ArrowUp className="w-4 h-4 text-orange-400" />
            <ArrowDown className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-slate-800 font-bold text-lg">
            {Math.round(main.temp_max)}°/{Math.round(main.temp_min)}°
          </span>
          <span className="text-slate-400 text-xs uppercase">High/Low</span>
        </div>

      </div>
    </div>
  );
};

export default CurrentWeather;