const mongoose = require('mongoose');

// defining the otp Schema

const otpSchema = mongoose.Schema({
    phone: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: true
    },

    purpose: {
        type: String,
        enum: ['VERIFICATION', 'PASSWORD_RESET'],
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
},{
    timestamps: true
});


const Otp = mongoose.model('Otp', otpSchema);
module.exports = Otp;