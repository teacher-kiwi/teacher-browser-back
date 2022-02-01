import mongoose from "mongoose";

const { Schema } = mongoose;

const Contents = new Schema({
  date: { type: String },
  text: { type: String, trim: true },
});

const journalSchema = new Schema({
  ownerId: { type: String, required: true },
  contents: [Contents],
});

const Journal = mongoose.model("Journal", journalSchema);

export default Journal;
