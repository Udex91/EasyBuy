const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const generateToken = (id) =>{
    return jwt.sign({id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}

// Register User
const registerUser = asyncHandler(async(req, res)=>{
    const {name, email, password} =req.body;

    // Validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill in all required fields")
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be up to 6 characters")
    }
    // Check if user exist
    const userExists = await User.findOne({email: email})
    if (userExists) {
        res.status(400);
        throw new Error ("Email has already been registered");
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password
    })

    // Generate token
    const token = generateToken(user_id)

    if (user) {
            res.cookie("token", token, {
                path: '/',
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400),
            })
    }else {
        res.status(400);
        throw new Error("Invalid user data");
    }
    res.send("Register User...")
});


module.exports ={
    registerUser,
};