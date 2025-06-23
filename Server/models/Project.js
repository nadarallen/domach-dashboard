const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, enum: ["Pune", "Mumbai", "Bengaluru", "Delhi"] },
  originBy: { type: String, required: true }, // 4 key people
  status: { type: String, default: "In Progress" },
  deadline: { type: Date },
  cadTasks: [{ type: String }],
  labelTasks: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
