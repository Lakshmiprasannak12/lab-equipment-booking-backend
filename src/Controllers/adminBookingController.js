const {
    getAllBookings,
    updateBookingStatus
} = require("../services/adminBookingService");


const getAdminBookings = async (req, res, next) => {
    try {
        const bookings = await getAllBookings(req.query);

        res.status(200).json({
            success: true,
            bookings
        });
    } catch (error) {
        next(error);
    }
};


const changeBookingStatus = async (req, res, next) => {
    try {
        const booking = await updateBookingStatus(
            req.params.id,
            req.body.status
        );

        res.status(200).json({
            success: true,
            message: "Booking status updated successfully",
            booking
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAdminBookings,
    changeBookingStatus
};