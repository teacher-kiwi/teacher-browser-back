import mongoose from "mongoose";

const { Schema } = mongoose;

const familyMonthSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    required: true,
  },
  videoType: {
    type: String,
    required: true,
  },
  tag: {
    type: [String],
  },
  createdAt: {
    type: Date,
    required: true,
  },
  contents: {
    type: String,
    required: true,
  },
});

const FamilyMonth = mongoose.model("FamilyMonth", familyMonthSchema);

export default FamilyMonth;
