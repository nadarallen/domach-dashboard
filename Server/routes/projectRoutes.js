// /server/routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET projects by location
router.get("/", async (req, res) => {
  try {
    const location = req.query.location;
    const projects = await Project.find({ location });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// POST new project (optional, for admin use)
router.post("/", async (req, res) => {
  try {
    const newProject = new Project({
      name: req.body.name,
      client: req.body.client,
      broughtBy: req.body.broughtBy,
      location: req.body.location,
      assignedDate: req.body.assignedDate,
      deadline: req.body.deadline, // ✅ ADD THIS
      status: req.body.status || "Ongoing"
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update project status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update project status" });
  }
});

module.exports = router;
