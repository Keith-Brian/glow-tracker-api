require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const sms = require('./configure/africastalking.configure.js');

// middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing models
const Device = require('./models/devices.model.js');
const Location = require('./models/locations.model.js');
const User = require('./models/users.model.js');


// importing routes
const deviceRoutes = require('./routes/devices.route.js');
const locationRoutes = require('./routes/locations.route.js');
const authRoutes = require('./routes/auth.route.js');

app.use('/api/devices', deviceRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/auth', authRoutes);



// getting the environment variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;


// mongoDB async connection function
const connectToDB = async() => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

// connect to MongoDB
connectToDB();

//try send AT sms

const sendOtp = async (phoneNumber, message) => {
    const options = {
        to: [phoneNumber],
        message: message,
        from: 'aftkng'
    };

    try{
        const response = await sms.send(options);
        return response;
    }
    catch (error){
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
}


//sendOtp('+254113268646', 'Hey KB - GlowTracker test message!');



// start the server on PORT 3000
app.get('/', (req, res) => {
    res.send('Hi There, Glow Tracker');
});

app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





