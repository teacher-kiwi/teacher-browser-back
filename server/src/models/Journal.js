const mongoose = require("mongoose");

const { Schema } = mongoose;

const journalSchema = new Schema({
  ownerId: { type: String, required: true },
  date: { type: Date, required: true },
  text: { type: String, trim: true, required: true },
  teacherEmail: { type: String, required: true },
});

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;
