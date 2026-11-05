const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authmiddleware");
const checkRole = require("../middlewares/roleMiddleware");

const {
    getAdminBookings,
    changeBookingStatus
} = require("../controllers/adminBookingController");

router.use(protect);
router.use(checkRole("admin"));
router.get("/bookings", getAdminBookings);
router.patch("/booking/:id/status", changeBookingStatus);
module.exports = router;