const mongoose = require("mongoose");

const clerkUserSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, unique: true, required: true },
    firstName: String,
    lastName: String,
  },
  { timestamps: true }
);

const ClerkUser = mongoose.model('clerkUserSchema', clerkUserSchema);

module.exports =  ClerkUser;