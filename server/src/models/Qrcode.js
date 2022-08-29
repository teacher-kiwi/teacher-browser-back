const mongoose = require("mongoose");

const { Schema } = mongoose;

const qrcodeSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const Qrcode = mongoose.model("Qrcode", qrcodeSchema);

module.exports = Qrcode;
