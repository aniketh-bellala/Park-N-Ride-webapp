const { Feedbacks } = require("../models/feedback");


//middleware for fetching all user feedbacks from database

const viewFeedback = async (req, res) => {
  try {
    const reviews = await Feedbacks.find({ status: req.body.status });
    console.log("/", reviews);
    res.status(201).send({ message: "Feedback sent", reviews });
  } catch (error) {
    console.log(req.body);
    res.status(500).send({ message: "Internal Server Error", error: error });
  }
};


//middleware for adding a user feedback to database

const addFeedback = async (req, res) => {
  try {
    await new Feedbacks({ ...req.body }).save();

    res.status(200).send({ message: "Feedback submitted" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error });
  }
};

//middleware for resolving status of a user feedback in database

const changeFeedbackStatus = async (req, res) => {
  try {
    const feedbackStatus = await Feedbacks.findOne({
      userID: req.body.UserID,
      status: true,
    });
    console.log("/", feedbackStatus);
    feedbackStatus.status = false;
    await feedbackStatus.save();
    res.status(201).send({ message: "Archived Feedback!", id: req.body.id });
  } catch (error) {
    console.log(req.body);
    res.status(500).send({
      message: "Internal Server Error",
      error: error,
      // value: req.body.allocValue,
    });
  }
};

module.exports = { addFeedback, viewFeedback, changeFeedbackStatus };
