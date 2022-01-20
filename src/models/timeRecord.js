import mongoose from "mongoose";

const { Schema } = mongoose;

const timeRecordSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  timeRecord: [
    {
      timeId: {
        type: Number,
        required: true,
      },
      minutes: {
        type: Number,
        required: true,
      },
      seconds: {
        type: Number,
        required: true,
      },
      milliseconds: {
        type: Number,
        required: true,
      },
    },
  ],
});

const TimeRecord = mongoose.model("TimeRecord", timeRecordSchema);

export default TimeRecord;
