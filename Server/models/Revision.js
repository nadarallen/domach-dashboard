import mongoose from 'mongoose';

const revisionSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  designer: { type: String, required: true },
  type: { type: String, enum: ['CAD', 'Label'], required: true },
  version: { type: Number, required: true }, // eg: 1, 2, 3...
  date: { type: Date, default: Date.now },
  remarks: { type: String }
});

export default mongoose.model('Revision', revisionSchema);
