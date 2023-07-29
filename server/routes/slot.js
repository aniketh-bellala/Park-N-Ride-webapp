const router = require("express").Router();

const { addSlot , changeFault , getSlot, addFault} = require("../controllers/slotController");


router.post("/add", addSlot);

router.post("/changeFault", changeFault);

router.get("/getSlot", getSlot);

router.post("/addFault", addFault);



module.exports = router;