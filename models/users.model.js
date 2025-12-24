const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 

    email: {
        type: String, 
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email address'
        }
    },

    password: {
        type: String, 
        required: true,
        minlength: 8,
        select: false
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},{
    timestamps: true
});