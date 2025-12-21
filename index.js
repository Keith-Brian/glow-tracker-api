require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing models
const Device = require('./models/devices.model.js');




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


app.post('/api/devices', async(req, res) => {
    try{
        const device = await Device.create(req.body);
        res.status(200).json(device);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});


// start the server on PORT 3000
app.get('/', (req, res) => {
    res.send('Hi There, Glow Tracker');
});

app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// custom routes here


