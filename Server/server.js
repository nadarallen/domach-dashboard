const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const projectRoutes = require("./routes/projectRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const revisionRoutes = require("./routes/revisionRoutes"); // ← Add this
const userRoutes = require("./routes/userRoutes"); // ← Optional, only if using users



require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/revisions", revisionRoutes); // ← Add this
app.use("/api/users", userRoutes); // ← Optional

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
