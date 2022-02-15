import mongoose from "mongoose";

const { Schema } = mongoose;

const attendanceSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  contents: {
    type: String
  }
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
