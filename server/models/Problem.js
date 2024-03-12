const mongoose = require("mongoose");

const exampleSchema = new mongoose.Schema({
  input: String,
  output: String,
  explanation: String,
});

const testcaseSchema = new mongoose.Schema({
  input: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  output: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  target: String,
  answer: String,
});

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    difficulty: {
      type: String,
      required: true,
    },
    constraints: {
      type: [String],
      default: [],
    },
    examples: {
      type: [exampleSchema],
      default: [],
    },
    challengeStatement: {
      type: String,
      required: true,
    },
    testcases: {
      type: [testcaseSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
