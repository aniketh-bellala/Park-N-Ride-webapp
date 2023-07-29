const mongoose = require("mongoose");
const { Ticket, ticketSchema } = require("../models/ticket")
const { ParkSlot } = require("../models/parkingSlot")
const { UserRequests } = require("../models/userRequests")
const toID = mongoose.Types.ObjectId;

//middleware to generate ticket for a user

const ticketGenerate = async (req, res) => {
    try {

        const existTicket = await Ticket.findOne({ userID: req.body.userID, paymentStatus: false });
        if (existTicket)
            return res.status(200).send({ message: "Ticket exists" });

        const slotCheck = await ParkSlot.findOne({ status: "vacant" });
        if (!slotCheck)
            return res.status(200).send({ message: "No slots available" });
        // console.log(slotCheck)

        const slot = await ParkSlot.find({ status: "vacant" }).sort("allocValue").limit(1)
        console.log(slot)
        // if (!slot)
        // 	return res
        // 		.status(409)
        // 		.send({ message: "No slots available" });
        var d = new Date()
        dformat = [d.getMonth() + 1,
        d.getDate(),
        d.getFullYear()].join('/') + ' ' +
            [d.getHours(),
            d.getMinutes(),
            d.getSeconds()].join(':');
        newT = {
            userID: req.body.userID,
            vehicleNo: "1234",
            slotID: slot[0].id,
            phone: "123456",
            inTime: dformat,
        }

        const newTicket = await new Ticket(newT)
        newTicket.save();
        slot[0].status = "occupy"
        await slot[0].save();
        res.status(201).send({ message: "Ticket created successfully", store: req.body.userID, tid: newTicket._id, details: newTicket });
    } catch (error) {
        console.log(req)
        res.status(500).send({ message: "Internal Server Error", error: error, store: req.body.userID });
    }
}


// middleware to update services details in the ticket

const addServiceToTicket = async (req, res) => {
    try {

        const existTicket = await Ticket.findOne({ userID: req.body.userID, paymentStatus: false });
        if (!existTicket)
            return res.status(401).send({ message: "No Ticket exists" });

        // const existReq = await UserRequests.findOne({ ticketID : existTicket._id.toString() });
        // console.log(existReq)
        // if(existReq){
        //     existReq.carWashStatus = req.body.carWashStatus
        //     existReq.fuelStatus = req.body.fuelStatus
        //     existReq.tyreworkStatus = req.body.tyreworkStatus
        //     await existReq.save()
        //     return res.status(201).send({ message: "Ticket updated successfully",service:existReq.ticketID });
        // }
        const userReq = {
            ticketID: existTicket._id.toString(),
            carWashStatus: req.body.carWashStatus,
            fuelStatus: req.body.fuelStatus,
            tyreworkStatus: req.body.tyreworkStatus,
        }

        await new UserRequests(userReq).save();
        res.status(201).send({ message: "Ticket updated successfully", service: userReq.ticketID });

    } catch (error) {
        console.log(req.body)
        res.status(500).send({ message: "Internal Server Error", error: error });
    }
}


// const viewTicket = async (req,res) => {
//     try {
//         const existTicket = await Ticket.findOne({ userID: req.body.userID,paymentStatus:false });

//         if(!existTicket){
//             return res.status(401).send({ message: "No Ticket exists" });
//         }

//         const existReq = await UserRequests.findOne({ ticketID : existTicket._id.toString() });

//         res.status(201).send({ message: "Ticket updated successfully",ticketID:existTicket._id,existReq });


//     } catch (error) {
//         console.log(req.body)
// 		res.status(500).send({ message: "Internal Server Error",error:error });
//     }
// }


//middleware to handle checkout process

const checkout = async (req, res) => {
    try {

        const existTicket = await Ticket.findOne({ userID: req.body.userID, paymentStatus: false });
        if (!existTicket)
            return res.status(401).send({ message: "No Ticket exists" });
        console.log(existTicket)
        var existReq = await UserRequests.findOne({ ticketID: existTicket._id.toString() });
        if (!existReq)
            existReq = {}

        res.status(201).send({ message: "Checkout processing...", existTicket, existReq });

    } catch (error) {
        console.log(req.body)
        res.status(500).send({ message: "Internal Server Error", error: error });
    }
}

//middleware to handle payment process

const paymentDone = async (req, res) => {
    try {

        const existTicket = await Ticket.findOne({ userID: req.body.userID, paymentStatus: false });
        // if(!existTicket || existTicket.paymentStatus)
        //     return res.status(401).send({ message: "No active ticket exists" });
        console.log(existTicket)
        var d = new Date()
        dformat = [d.getMonth() + 1,
        d.getDate(),
        d.getFullYear()].join('/') + ' ' +
            [d.getHours(),
            d.getMinutes(),
            d.getSeconds()].join(':');
        existTicket.outTime = dformat;
        existTicket.paymentStatus = true;
        existTicket.paymentCharge = req.body.amount

        await existTicket.save()

        const slot = await ParkSlot.findOne({ id: existTicket.slotID });

        slot.status = "vacant";

        await slot.save();

        res.status(201).send({ message: "Checkout done...", existTicket });

    } catch (error) {
        console.log(req.body)
        res.status(500).send({ message: "Internal Server Error", error: error });
    }

}

module.exports = { ticketGenerate, addServiceToTicket, checkout, paymentDone }