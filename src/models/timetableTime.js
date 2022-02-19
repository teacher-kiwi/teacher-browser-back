import mongoose from "mongoose";

const { Schema } = mongoose;

const timetableTimeSchema = new Schema({
  teacherEmail: {
    type: String,
    required: true,
  },
  start1: {
    type: String,
  },
  end1: {
    type: String,
  },
  start2: {
    type: String,
  },
  end2: {
    type: String,
  },
  start3: {
    type: String,
  },
  end3: {
    type: String,
  },
  start4: {
    type: String,
  },
  end4: {
    type: String,
  },
  start5: {
    type: String,
  },
  end5: {
    type: String,
  },
  start6: {
    type: String,
  },
  end6: {
    type: String,
  },
});

const TimetableTime = mongoose.model("TimetableTime", timetableTimeSchema);

export default TimetableTime;
