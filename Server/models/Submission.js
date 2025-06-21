// /server/models/Submission.js
import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  designer: { type: String, required: true }, // Designer's name
  date: { type: Date, default: Date.now },
  remarks: { type: String },
  type: { type: String, enum: ['CAD', 'Label'], required: true },
});

export default mongoose.model('Submission', submissionSchema);
