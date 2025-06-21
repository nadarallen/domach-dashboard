// /server/routes/revisionRoutes.js
const express = require("express");
const router = express.Router();
const Revision = require("../models/Revision");

// POST new revision
router.post("/project/:projectId", async (req, res) => {
  try {
    const { type } = req.body;

    // Get latest version number
    const latest = await Revision.find({ projectId: req.params.projectId, type })
      .sort({ version: -1 })
      .limit(1);

    const version = latest.length > 0 ? latest[0].version + 1 : 1;

    const newRevision = new Revision({
      ...req.body,
      version,
      projectId: req.params.projectId,
    });

    const saved = await newRevision.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit revision" });
  }
});

// GET all revisions for a project
router.get("/project/:projectId", async (req, res) => {
  try {
    const revisions = await Revision.find({ projectId: req.params.projectId });
    res.json(revisions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch revisions" });
  }
});

module.exports = router;
