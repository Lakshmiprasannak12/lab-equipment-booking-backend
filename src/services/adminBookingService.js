const Booking = require("../models/booking");
const getAllBookings = async (filters) => {
    const query = {};
    if (filters.status) {
        query.status = filters.status;
    }
    if (filters.date) {
        query.bookingDate = new Date(filters.date);
    }
    const bookings = await Booking.find(query)
        .populate("user", "name email")
        .populate("resource")
        .sort({ bookingDate: -1 });

    return bookings;
};
const updateBookingStatus = async (id, status) => {

    if (!["Approved", "Rejected"].includes(status)) {
        throw new Error("Status must be Approved or Rejected");
    }

    const booking = await Booking.findById(id);

    if (!booking) {
        throw new Error("Booking not found");
    }

   if (booking.status.toLowerCase() !== "pending") {
    throw new Error("Only pending bookings can be updated");
}
    if (status === "Approved") {
        const existingBooking = await Booking.findOne({
            _id: { $ne: id },
            resource: booking.resource,
            bookingDate: booking.bookingDate,
            status: "Approved",
            startTime: { $lt: booking.endTime },
            endTime: { $gt: booking.startTime }
        });
        if (existingBooking) {
            throw new Error("This time slot is already approved for another booking");
        }
    }
    booking.status = status;
await Booking.updateOne(
    { _id: id },
    { $set: { status: status } },
    { runValidators: true }
);
return booking;
};
module.exports = {
    getAllBookings,
    updateBookingStatus
};