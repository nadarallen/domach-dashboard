// File: /client/src/components/LocationSelector.jsx
import React from "react";

const LocationSelector = ({ onSelect }) => {
  const cities = ["Pune", "Mumbai", "Bengaluru", "Delhi"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Select Project Location</h1>
      <div className="grid grid-cols-2 gap-6">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            className="bg-blue-600 text-white py-3 px-6 rounded-2xl shadow-md hover:bg-blue-700 transition duration-300 text-lg"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocationSelector;
