const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  client: String,
  broughtBy: String,
  location: String,
  assignedDate: Date,
  deadline: Date, // ✅ NEW FIELD
  status: {
    type: String,
    default: "Ongoing",
    enum: ["Ongoing", "Completed"]
  }
});

module.exports = mongoose.model("Project", projectSchema);
