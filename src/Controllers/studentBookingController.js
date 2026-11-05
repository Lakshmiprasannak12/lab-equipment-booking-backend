const {
    createBooking,
    getMyBookings,
    cancelMyBooking
} = require("../services/studentBookingService");


const createStudentBooking = async (req, res, next) => {
    try {
        const booking = await createBooking(
            req.body,
            req.user.id
        );

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking
        });
    } catch (error) {
        next(error);
    }
};


const getStudentBookings = async (req, res, next) => {
    try {
        const bookings = await getMyBookings(req.user.id);

        res.status(200).json({
            success: true,
            bookings
        });
    } catch (error) {
        next(error);
    }
};


const cancelStudentBooking = async (req, res, next) => {
    try {
        const booking = await cancelMyBooking(
            req.params.id,
            req.user.id
        );

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            booking
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createStudentBooking,
    getStudentBookings,
    cancelStudentBooking
};