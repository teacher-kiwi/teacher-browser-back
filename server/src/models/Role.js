const mongoose = require("mongoose");

const { Schema } = mongoose;

const studentSchema = new Schema({
  order: Number,
  students: [String],
});

const roleSchema = new Schema({
  roles: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  students: [studentSchema],
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
