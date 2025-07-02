import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  description: [{ type: String }],
  order: { type: Number, default: 0 }
});

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;
