const express = require('express');
const router = express.Router();

// import the locations model
const Location = require('../models/locations.model.js');
const { getAllLiveLocations, addLiveLocation } = require('../controllers/locations.controller.js');

// add the device authentication middleware
const deviceAuthentication = require('../middleware/device-auth.middleware.js');

// Route to get the live-locations for all devices 

// get all live-locations in the db
router.get('/', getAllLiveLocations);

// add a new live-location to the dB
router.post('/updateLocation', deviceAuthentication, addLiveLocation);

// TODO: option to delete the old locations after a certain period

module.exports = router;