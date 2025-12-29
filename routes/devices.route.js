const express = require('express');
const router = express.Router();

const Device = require('../models/devices.model.js');
const authMiddleware = require('../middleware/auth.middleware.js');

const deviceAuthentication = require('../middleware/device-auth.middleware.js');


// Route to get all devices for a specific user (controller))
const { getAllDevices, getDeviceById, updateDevice,registerDevice, deleteDevice, deviceHandShake,generateDeviceToken} = require('../controllers/devices.controller.js');


// Route to create a new device
router.post('/register', authMiddleware, registerDevice);
//router.post('/handshake',deviceAuthentication ,deviceHandShake);
router.get('/token', generateDeviceToken);
router.get('/handshake',deviceAuthentication, deviceHandShake);

// Route to get a specific device by deviceId
router.get('/:deviceId', getDeviceById);
router.get('/', getAllDevices);

// Route to update a device's information
router.put('/:deviceId', updateDevice);

// Route to delete a device
router.delete('/:deviceId', deleteDevice);





module.exports = router;