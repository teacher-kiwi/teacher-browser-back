const mongoose = require("mongoose");

const { Schema } = mongoose;

const familyStoryLikeSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  familyStoryId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  familyStoryCreatedAt: {
    type: Date,
    required: true,
  },
});

const FamilyStoryLike = mongoose.model("FamilyStoryLike", familyStoryLikeSchema);

module.exports = FamilyStoryLike;
