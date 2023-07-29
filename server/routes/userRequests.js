const router = require("express").Router();

const { updateUserRequest , viewUserRequest } = require("../controllers/userRequestController");

router.post("/updateUserRequest", updateUserRequest);

router.get("/viewUserRequest", viewUserRequest);

module.exports = router;