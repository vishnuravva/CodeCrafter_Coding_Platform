const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubmissionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  challengeId: {
    type: Schema.Types.ObjectId,
    ref: "Problem",
  },
  code: {
    type: String,
    required: true,
  },
  submission_status: {
    type: Boolean,
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
});

const Submission = mongoose.model("Submission", SubmissionSchema);
module.exports = Submission;
