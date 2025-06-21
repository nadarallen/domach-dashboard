// Folder: /client/src/App.jsx
import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import LocationSelector from "./components/LocationSelector";
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const projectRoutes = require("./routes/projectRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const revisionRoutes = require("./routes/revisionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/revisions", revisionRoutes);

// connect to DB and start server here...

const App = () => {
  const [location, setLocation] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      {!location ? (
        <LocationSelector onSelect={setLocation} />
      ) : (
        <Dashboard location={location} />
      )}
    </div>
  );
};

export default App;