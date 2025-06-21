// /server/routes/submissionRoutes.js
const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");

// POST new submission
router.post("/project/:projectId", async (req, res) => {
  try {
    const newSubmission = new Submission({
      ...req.body,
      projectId: req.params.projectId,
    });
    const saved = await newSubmission.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit" });
  }
});

// GET all submissions for a project
router.get("/project/:projectId", async (req, res) => {
  try {
    const submissions = await Submission.find({ projectId: req.params.projectId });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

module.exports = router;
