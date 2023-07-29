const { User, temp } = require("../models/user");


//middleware for user registeration

const registerUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });


    const user1 = await new User({ ...req.body }).save();
    res
      .status(201)
      .send({
        message: "User created successfully",
        store: req.body.email,
        id: user1._id,
      });
  } catch (error) {
    console.log(req.body);
    res
      .status(500)
      .send({
        message: "Internal Server Error",
        error: error,
        store: req.body.email,
      });
  }
};


//middleware for user login

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    if (user.password != req.body.password)
      return res.status(401).send({ message: "Invalid Email or Password" });

    res
      .status(200)
      .send({
        message: "logged in successfully",
        store: req.body.email,
        id: user._id,
      });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error });
  }
};


//middleware for fetching details of user

const profileUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "Login again" });

    res.status(200).send({ message: "logged in successfully", data: user });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error });
  }
};

module.exports = { registerUser, loginUser, profileUser };
