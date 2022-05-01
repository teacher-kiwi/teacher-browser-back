import mongoose from "mongoose";

const { Schema } = mongoose;

const familyStorySchema = new Schema({
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

const FamilyStory = mongoose.model("FamilyStory", familyStorySchema);

export default FamilyStory;
