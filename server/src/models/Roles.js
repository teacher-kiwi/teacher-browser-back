const mongoose = require("mongoose");

const { Schema } = mongoose;

const dateSchema = new Schema({
  order: Number,
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const rolesSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  dates: [dateSchema],
});

const Roles = mongoose.model("Roles", rolesSchema);

module.exports = Roles;
