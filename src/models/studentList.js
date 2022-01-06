import mongoose from "mongoose";

const { Schema } = mongoose;

const studentListSchema = new Schema({
  teacherEmail: {
    type: String,
    required: true,
  },
  listOrder: {
    type: Number,
    required: true,
  },
  listName: {
    type: String,
    required: true,
  },
  listIcon: {
    type: String,
  },
  studentId: {
    type: [Schema.Types.ObjectId],
  },
});

const StudentList = mongoose.model("StudentList", studentListSchema);

export default StudentList;
