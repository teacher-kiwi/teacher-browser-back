import mongoose from "mongoose";

const { Schema } = mongoose;

const studentListSchema = new Schema({
  teacherEmail: {
    type: String,
    required: true,
  },
  listName: {
    type: String,
    required: true,
  },
  listOrder: {
    type: Number,
    required: true,
  },
});

const StudentList = mongoose.model("StudentList", studentListSchema);

export default StudentList;
