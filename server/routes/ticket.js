const router = require("express").Router();

const { ticketGenerate , addServiceToTicket , checkout , paymentDone } = require("../controllers/ticketController");

router.post("/generate", ticketGenerate);

router.post("/addService", addServiceToTicket);

router.post("/checkout", checkout);

router.post("/payment", paymentDone);

module.exports = router;