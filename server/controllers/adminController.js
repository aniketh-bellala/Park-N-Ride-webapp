const Admin = require("../models/admin")


//middleware for admin registeration

const registerAdmin = async (req, res) => {
	try {
		const user = await Admin.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		// const salt = await bcrypt.genSalt(Number(process.env.SALT));
		// const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new Admin({ ...req.body }).save();
		res.status(201).send({ message: "Admin created successfully", store: req.body.email });
	} catch (error) {
		console.log(req)
		res.status(500).send({ message: "Internal Server Error", error: error });
	}
}


//middleware for admin login

const loginAdmin = async (req, res) => {
	try {
		const user = await Admin.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		if (user.password != req.body.password)
			return res.status(401).send({ message: "Invalid Email or Password" });

		res.status(200).send({ message: "logged in successfully", store: req.body.email });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error", error: error });
	}
}

//middleware for fetching details of admin

const profileAdmin = async (req, res) => {
	try {
		const user = await Admin.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Login again" });

		res.status(200).send({ message: "logged in successfully", data: user });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error", error: error });
	}
}


module.exports = { registerAdmin, loginAdmin, profileAdmin }