require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

// start the server on PORT 3000

app.get('/', (req, res) => {
    res.send('Welcome to the Glow Tracker API');
});

app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// custom routes here


