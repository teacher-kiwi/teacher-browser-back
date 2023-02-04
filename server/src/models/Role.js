const mongoose = require("mongoose");

const { Schema } = mongoose;

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
  students: {
    type: [String],
  },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
