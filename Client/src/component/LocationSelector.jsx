// Folder: /client/src/components/LocationSelector.jsx
import React from "react";

const LocationSelector = ({ onSelect }) => {
  const cities = ["Pune", "Mumbai", "Bengaluru", "Delhi"];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Select Office Location</h1>
      <div className="grid grid-cols-2 gap-4">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            className="bg-blue-600 text-white py-3 px-6 rounded-xl shadow hover:bg-blue-700"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocationSelector;
