const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const studentBookingRoutes = require("./routes/studentBookingRoutes");
const adminBookingRoutes = require("./routes/adminBookingRoutes");

const studentResourceRoutes = require("./routes/studentResourceRoutes");
const adminResourceRoutes = require("./routes/adminResourceRoutes");

const loggerMiddleware = require("./middlewares/loggerMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Logger
app.use(loggerMiddleware);

// Auth routes
app.use("/api/auth", authRoutes);

// Student routes
app.use("/api/student", studentBookingRoutes);
app.use("/api/student", studentResourceRoutes);

// Admin routes
app.use("/api/admin", adminBookingRoutes);
app.use("/api/admin", adminResourceRoutes);

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Lab and Equipment Booking API is running"
    });
});

// Error middleware must be last
app.use(errorMiddleware);

module.exports = app;