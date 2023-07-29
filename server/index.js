// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const slotRoutes = require("./routes/slot");
const ticketRoutes = require("./routes/ticket");
const feedbackRoutes = require("./routes/feedback");
const userRequestRoutes = require("./routes/userRequests");



// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/slot",slotRoutes);
app.use("/api/ticket",ticketRoutes);
app.use("/api/feedback",feedbackRoutes);
app.use("/api/userRequest",userRequestRoutes);




// app.use("/api/auth", authRoutes);

const port = 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
