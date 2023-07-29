const { UserRequests } = require("../models/userRequests");


//middleware for fetching details of all user related services

const viewUserRequest = async (req, res) => {
  try {
    const requestsList = await UserRequests.find({ status: req.query.status });
    // console.log(req.query.status);

    res
      .status(200)
      .send({ message: "List of requests sent", data: requestsList });
  } catch (error) {
    console.log(req.body);
    res.status(500).send({ message: "Internal Server Error", error: error });
  }
};


//middleware to update details of a user related service

const updateUserRequest = async (req, res) => {
  try {
    const requestToUpdate = await UserRequests.findOne({
      ticketID: req.body.ticketId,
    });

    console.log(req.body.ticketId);
    console.log(requestToUpdate);
    requestToUpdate.status = false;

    await requestToUpdate.save();

    res
      .status(200)
      .send({ message: "Request status updated", id: req.body.ticketID });
  } catch (error) {
    console.log(req.body);
    res.status(500).send({ message: "Internal Server Error", error: error });
  }
};

module.exports = { updateUserRequest, viewUserRequest };
