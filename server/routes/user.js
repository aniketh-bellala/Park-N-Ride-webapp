const router = require("express").Router();

const { registerUser , loginUser , profileUser } = require("../controllers/userController");


router.post("/register", registerUser);

router.post("/login",loginUser);

router.post("/profile",profileUser)

module.exports = router;