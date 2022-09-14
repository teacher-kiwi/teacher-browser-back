const mongoose = require("mongoose");

const { Schema } = mongoose;

const pageLinkSchema = new Schema({
  pageTitle: {
    type: String,
    required: true,
  },
  pageDescription: {
    type: String,
    required: true,
  },
  pageURL: {
    type: String,
    required: true,
  },
  folder: {
    type: [String],
    required: true,
  },
  type: {
    type: String,
  },
  updateAt: {
    type: Date,
    required: true,
  },
});

const PageLink = mongoose.model("PageLink", pageLinkSchema);

module.exports = PageLink;
