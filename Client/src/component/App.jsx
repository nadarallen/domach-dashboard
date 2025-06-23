// File: /client/src/components/App.jsx
import React, { useState } from "react";
import Dashboard from "./Dashboard";
import LocationSelector from "./LocationSelector";
import "../style/App.css";

const App = () => {
  const [location, setLocation] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 text-gray-800 font-sans">
      {!location ? (
        <LocationSelector onSelect={setLocation} />
      ) : (
        <Dashboard location={location} />
      )}
    </div>
  );
};

export default App;
