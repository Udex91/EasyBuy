const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Correctly retrieve token from cookies
    if (req.cookies.token) {
        token = req.cookies.token;
    }

    // Check if token exists
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, please login");
    }

    try {
        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token
        const user = await User.findById(verified.id).select("-password");

        if (!user) {
            res.status(401);
            throw new Error("User not found");
        }

        req.user = user;
        next(); // Move to the next middleware or route handler
    } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
    }
});

// Admin only
const adminOnly = (req, res, next)=>{
if (req.user && req.user.role === "admin"){
    next()
}else {
    res.status(401)
    throw new Error("Not authorized as an admin.")
}
}

module.exports = {
    protect,
    adminOnly,
};
