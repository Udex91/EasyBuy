const mongoose = require('mongoose');
const {objectId} = mongoose.Schema;



const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true, // Ensures email is unique
            trim: true, // Removes spaces before and after
            lowercase: true, // Converts email to lowercase
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Please enter a valid email address"
            ], // Validates email format
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
            miniLength: [6, 'password must be up to 6 characters'],
        },
        role: {
            type: String,
            required: [true],
            default: "customer",
            enum: ["customer", "admin"],
        },
        photo: {
            type: String,
            required: [true, "Please add a photo"],
            default: "https://i.ibb.co/4pDNDK1/avatar.png",
        },
        phone: {
            type: String,
            default: "+234",
        },
        address: {
            type: Object,

        },    
    },
    { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

const User = mongoose.model("User", userSchema);

module.exports = User;
