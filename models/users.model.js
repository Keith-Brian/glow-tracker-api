const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 

    phone: {
        type: String,
        trim: true,
        unique: true,
        required: true
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
    isVerified: {
        type: Boolean,
        default: false
    }
    ,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},{
    timestamps: true
});

userSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }

    // continue hashing the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
   // next();
});

// adding a method to compare exiting passwords (during login)

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// export the user model for use in other files

const User = mongoose.model('User', userSchema);
module.exports = User;