import mongoose from "mongoose";

const { Schema } = mongoose;

const journalSchema = new Schema({
  ownerId: { type: String, required: true },
  date: { type: Date },
  text: { type: String, trim: true },
});

const Journal = mongoose.model("Journal", journalSchema);

export default Journal;
