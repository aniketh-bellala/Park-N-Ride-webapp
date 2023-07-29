const router = require("express").Router();

const { registerAdmin , loginAdmin , profileAdmin } = require("../controllers/adminController");


router.post("/register", registerAdmin);

router.post("/login",loginAdmin);

router.post("/profile",profileAdmin);


module.exports = router;