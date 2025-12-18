import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-2xl">
        <h1 className="text-4xl font-extrabold text-white mb-4">
          Tailwind is Working 🚀
        </h1>
        <p className="text-white text-lg">
          If you see colors, spacing, and rounded corners — you're good!
        </p>
        <button className="mt-6 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition">
          Test Button
        </button>
      </div>
    </div>
  );
}

export default App;
