const Booking = require("../models/booking");
const Resource = require("../models/Resource");

// Create booking
const createBooking = async (data, userId) => {

    const {
        resource,
        bookingDate,
        startTime,
        endTime,
        purpose
    } = data;
    if (!resource || !bookingDate || !startTime || !endTime || !purpose) {
        throw new Error("Please enter all booking details");
    }
      const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(bookingDate);
    selectedDate.setHours(0, 0, 0, 0);
    if (isNaN(selectedDate.getTime()) || selectedDate < today) {
        throw new Error("Booking date cannot be in the past");
    }
    if (startTime >= endTime) {
        throw new Error("End time must be after start time");
    }
    const availableResource = await Resource.findById(resource);
    if (!availableResource || !availableResource.isActive) {
        throw new Error("Resource is not available");
    }
    const existingBooking = await Booking.findOne({
        resource,
        bookingDate: selectedDate,
        status: "Approved",
        startTime: { $lt: endTime },
        endTime: { $gt: startTime }
    });
    if (existingBooking) {
        throw new Error("This resource is already booked for this time");
    }
    const booking = await Booking.create({
        user: userId,
        resource,
        bookingDate: selectedDate,
        startTime,
        endTime,
        purpose,
        status: "Pending"
    });
    return booking;
};
const getMyBookings = async (userId) => {
    const bookings = await Booking.find({
        user: userId
    })
        .populate("resource")
        .sort({ bookingDate: -1 });

    return bookings;
};
const cancelMyBooking = async (bookingId, userId) => {
    const booking = await Booking.findOne({
        _id: bookingId,
        user: userId
    });
    if (!booking) {
        throw new Error("Booking not found");
    }
    if (booking.status !== "Pending" && booking.status !== "Approved") {
        throw new Error("This booking cannot be cancelled");
    }
    booking.status = "Cancelled";
    await booking.save();
    return booking;
};
module.exports = {
    createBooking,
    getMyBookings,
    cancelMyBooking
};