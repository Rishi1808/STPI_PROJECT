const mongoose = require("mongoose");

const incubationFormSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startupName: {
    type: String,
    required: true,
  },
  founderName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Enter a valid 10-digit phone number"],
  },
  industry: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  businessModel: {
    type: String,
    required: true,
  },
  fundingStage: {
    type: String,
    enum: ["Pre-seed", "Seed", "Series A", "Series B", "Series C", "Bootstrapped"],
    required: true,
  },
  documents: {
    type: [String], // Array of document URLs
    default: [],
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("IncubationForm", incubationFormSchema);
