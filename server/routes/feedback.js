const router = require("express").Router();

const { addFeedback , viewFeedback , changeFeedbackStatus } = require("../controllers/feedbackController");

router.post("/addFeedback", addFeedback);

router.post("/viewFeedback", viewFeedback);

router.post("/updateFeedback", changeFeedbackStatus);

module.exports = router;