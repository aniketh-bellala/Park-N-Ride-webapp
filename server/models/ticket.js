const mongoose = require("mongoose");
// const {User,userSchema} = require("../models/user")

const ticketSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
	vehicleNo: { 
        type: String, 
        required: true 
    },
    slotID: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
	inTime: {
        type: String,
        required: true
    },
    outTime: {
        type: String
    },
    paymentStatus: {
        type: Boolean,
        required: true,
        default: false
    },
    paymentCharge: {
        type: Number,
        required: true,
        default: 0
    }

});

const Ticket = new mongoose.model("ticket", ticketSchema);

module.exports = { Ticket,ticketSchema };

