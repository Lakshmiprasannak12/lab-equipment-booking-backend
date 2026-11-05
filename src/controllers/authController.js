const {
    registerUser,
    loginUser
} = require("../services/authService");


const registerController = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "Registration successful",
            user
        });
    } catch (error) {
        next(error);
    }
};


const loginController = async (req, res, next) => {
    try {
        const result = await loginUser(
            req.body.email,
            req.body.password
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token: result.token,
            user: result.user
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerController,
    loginController
};