import mongoose from "mongoose";

const { Schema } = mongoose;

const studentSchema = new Schema({
  teacherEmail: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
    trim: true,
  },
  studentNumber: {
    type: String,
    trim: true,
  },
  studentGender: {
    type: String,
    required: true,
  },
  allergy: {
    type: [Number],
  },
  tag: {
    type: [String],
    trim: true,
  },
  listId: {
    type: [String],
  },
  trash: {
    type: Boolean,
    required: true,
    default: false,
  },
  memo: {
    type: String,
  },
  icon: {
    type: Number,
  },
  role: {
    type: String,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
