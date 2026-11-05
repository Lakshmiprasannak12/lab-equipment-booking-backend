const checkRole = (role) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        if (req.user.role !== role) {
            return res.status(403).json({
                success: false,
                message: "Access denied. You don't have permission"
            });
        }

        next();
    };
};

module.exports = checkRole;