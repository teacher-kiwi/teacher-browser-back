const mongoose = require("mongoose");

const { Schema } = mongoose;

const xmasMsgSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  bg: {
    type: Number,
    required: true,
    default: 0,
  },
});

const XmasMsg = mongoose.model("XmasMsg", xmasMsgSchema);

module.exports = XmasMsg;
