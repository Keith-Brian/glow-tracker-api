const express = require('express');
const router = express.Router();

const Device = require('../models/devices.model.js');
const authMiddleware = require('../middleware/auth.middleware.js');


// Route to get all devices for a specific user (controller))
const { getAllDevices, getDeviceById, updateDevice, registerDevice, deleteDevice } = require('../controllers/devices.controller.js');

// list all the devices in the dB location collection
router.get('/', getAllDevices);

// Route to get a specific device by deviceId
router.get('/:deviceId', getDeviceById);

// Route to update a device's information
router.put('/:deviceId', updateDevice);

// Route to delete a device
router.delete('/:deviceId', deleteDevice);

// Route to create a new device
router.post('/register', authMiddleware, registerDevice);


module.exports = router;