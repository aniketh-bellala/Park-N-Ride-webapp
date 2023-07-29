const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  comments: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Feedbacks = new mongoose.model("feedback", feedbackSchema);

module.exports = { Feedbacks };
