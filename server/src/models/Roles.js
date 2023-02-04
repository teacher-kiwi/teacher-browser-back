const mongoose = require("mongoose");

const { Schema } = mongoose;

const rolesSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Roles = mongoose.model("Roles", rolesSchema);

module.exports = Roles;
