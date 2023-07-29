const mongoose = require("mongoose");
const { Ticket, ticketSchema } = require("../models/ticket");

const userRequestSchema = new mongoose.Schema({
  ticketID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ticket",
  },
  carWashStatus: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
  },
  fuelStatus: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
  },
  tyreworkStatus: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const UserRequests = new mongoose.model("userRequest", userRequestSchema);

module.exports = { UserRequests };
