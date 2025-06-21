// /server/models/Revision.js
const mongoose = require("mongoose");

const revisionSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  type: String, // CAD or Label
  version: Number,
  designer: String,
  date: { type: Date, default: Date.now },
  remarks: String,
});

module.exports = mongoose.model("Revision", revisionSchema);
