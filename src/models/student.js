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
  studentOrder: {
    type: Number,
  },
  studentGender: {
    type: String,
    required: true,
  },
  listId: {
    type: Array,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
