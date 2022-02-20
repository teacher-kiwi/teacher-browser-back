import mongoose from "mongoose";

const { Schema } = mongoose;

const timetableDataSchema = new Schema({
  teacherEmail: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  subName: {
    type: String,
  },
  color: {
    type: String,
  },
  memo: {
    type: String,
  },
});

const TimetableData = mongoose.model("TimetableData", timetableDataSchema);

export default TimetableData;
