const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authmiddleware");
const checkRole = require("../middlewares/roleMiddleware");

const {
    createStudentBooking,
    getStudentBookings,
    cancelStudentBooking
} = require("../controllers/studentBookingController");

router.use(protect);
router.use(checkRole("student"));

router.post("/booking", createStudentBooking);
router.get("/my-bookings", getStudentBookings);
router.patch("/booking/:id/cancel", cancelStudentBooking);

module.exports = router;