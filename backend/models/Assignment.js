import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true // removes leading/trailing spaces
  },
  description: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    trim: true
  },
  deadline: {
    type: Date,
    required: true,
    // custom setter ensures only the date (no time part)
    set: (value) => {
      if (!value) return value;
      const date = new Date(value);
      date.setHours(0, 0, 0, 0); // resets time to midnight
      return date;
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Assignment", assignmentSchema);
