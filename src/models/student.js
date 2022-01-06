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
    type: Number,
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
    // type: [Schema.Types.ObjectId],
    type: Array,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
