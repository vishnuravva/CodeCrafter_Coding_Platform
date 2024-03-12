const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChallengeSchema = new Schema({
  challengeId: {
    type: Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  code: {
    type: String,
  },
  submission_status: {
    type: Boolean,
  },
  solvedDate: {
    type: Date,
    default: Date.now,
  },
});
const UserSchema = new Schema({
  username: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  submissions: [],
  solved_challenges: [],

  points_earned: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
