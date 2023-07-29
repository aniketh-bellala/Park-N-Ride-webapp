const { ParkSlot } = require("../models/parkingSlot")



//middleware to add new slots to the parking map

const addSlot = async (req, res) => {
	try {
		const slot = await ParkSlot.find({ allocValue: req.body.allocValue })
		console.log(Object.keys(slot).length, slot)
		if (slot && req.body.allocValue == 2 && Object.keys(slot).length == 4) {
			return res
				.status(409)
				.send({ message: "Cant add slots of this value" });
		}
		else if (slot && Object.keys(slot).length == 8 && req.body.allocValue > 2) {
			return res
				.status(409)
				.send({ message: "Cant add slots of this value" });
		}
		newSlot = {
			status: "vacant",
			...req.body
		}
		console.log(newSlot)
		await new ParkSlot(newSlot).save();
		res.status(201).send({ message: "Slot created successfully", value: req.body.allocValue });
	} catch (error) {
		console.log(req.body)
		res.status(500).send({ message: "Internal Server Error", error: error, value: req.body.allocValue });
	}
}


//middleware to change slot status from faulty to vacant

const changeFault = async (req, res) => {
	try {
		const slot = await ParkSlot.findOne({ id: req.body.id })
		console.log(slot)
		slot.status = "vacant";
		await slot.save();
		res.status(201).send({ message: "Slot made vacant after repair", id: req.body.id });
	} catch (error) {
		console.log(req.body)
		res.status(500).send({ message: "Internal Server Error", error: error, value: req.body.allocValue });
	}
}

//middleware to get details of all slots

const getSlot = async (req, res) => {
	try {
		const slot = await ParkSlot.find({})
		console.log(slot)

		res.status(201).send({ message: "Slots sent", slot });
	} catch (error) {
		console.log(req.body)
		res.status(500).send({ message: "Internal Server Error", error: error, value: req.body.allocValue });
	}
}


//middleware to add fault to a slot(for demo purposes)

const addFault = async (req, res) => {
	try {
		const slot = await ParkSlot.findOne({ id: req.body.id })
		console.log(slot)
		slot.status = "faulty";
		await slot.save();
		res.status(201).send({ message: "Slot made faulty", slot });
	} catch (error) {
		console.log(req.body)
		res.status(500).send({ message: "Internal Server Error", error: error, value: req.body.allocValue });
	}
}



module.exports = { addSlot, changeFault, getSlot, addFault }