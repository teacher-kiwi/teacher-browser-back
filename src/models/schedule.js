import mongoose from "mongoose";

const { Schema } = mongoose;

const scheduleSchema = new Schema({
  schedule: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  contents: {
    type: String
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  color: {
    type: String
  }
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
