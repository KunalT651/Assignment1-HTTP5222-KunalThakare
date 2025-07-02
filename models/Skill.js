import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  order: { type: Number, default: 0 }
});

const Skill = mongoose.model('Skill', skillSchema);
export default Skill; 