const mongoose = require("mongoose");

const parkSlotSchema = new mongoose.Schema({
	status: { 
        type: String, 
        required: true 
    },
    id :{
        type: Number, 
        required: true,
        unique: true
    },
    allocValue: {
        type: Number,
        required: true
    }
	
});

const ParkSlot = new mongoose.model("parkSlot", parkSlotSchema);

module.exports = { ParkSlot };

