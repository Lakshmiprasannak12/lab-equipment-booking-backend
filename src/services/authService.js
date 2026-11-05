const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (data) => {
    const { name, email, password } = data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "student"
    });
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
};
const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const validPassword = await bcrypt.compare(
        password,
        user.password
    );
    if (!validPassword) {
        throw new Error("Invalid email or password");
    }
    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

module.exports = {
    registerUser,
    loginUser
};