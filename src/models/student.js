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
  },
  studentNumber: {
    type: String,
  },
  studentGender: {
    type: String,
    required: true,
  },
  parentPhoneNum: {
    type: String,
  },
  allergy: {
    type: [Number],
  },
  tag: {
    type: [String],
  },
  listId: {
    type: [String],
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
