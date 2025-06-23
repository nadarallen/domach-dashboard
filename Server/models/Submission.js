const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  submittedBy: String,
  status: { type: String, enum: ["Submitted", "Pending", "Delayed"] },
  date: { type: Date, default: Date.now },
  remarks: String,
});

module.exports = mongoose.model("Submission", submissionSchema);
