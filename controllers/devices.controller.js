
// Controller logic for devices related operations
const Device = require('../models/devices.model.js');

// Get all devices for a specific user

const getAllDevices = async (req, res) => {
    try {
        const devices =  await Device.find({});
        res.status(200).json(devices);
    }
    catch(error){
        res.status(500).json({message: 'Server Error', error: error.message});
    }
}


const getDeviceById = async (req, res) => {
    try{
        const {deviceId} = req.params;
        const device = await Device.findById(deviceId);

        if(!device){
            return res.status(404).json({message: 'Device not found'});
        }
        res.status(200).json(device);
    }
    catch(error){
        res.status(500).json({message: 'Server Error', error: error.message});
    }
}

// updating device information
const updateDevice = async (req, res) => {
    try{
        const {deviceId} = req.params;
        const updatedDevice = await Device.findByIdAndUpdate(deviceId, req.body);

        if(!updatedDevice){
            return res.status(404).json({message: 'Device not found'});
        }
        res.status(200).json(updatedDevice);
    }
    catch(error){
        res.status(500).json({message: 'Server Error', error: error.message});
    }
}


// adding a new Device to the system 
const createDevice = async (req, res) => {
    try{
        const device = await Device.create(req.body);
        res.status(200).json(device);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

// deleting a device from the system
const deleteDevice = async (req, res) => {
    try{
        const {deviceId} = req.params;
        const deletedDevice = await Device.findByIdAndDelete(deviceId); 
        if(!deletedDevice){
            return res.status(404).json({message: 'Device not found'});
        }
        res.status(200).json({message: 'Device deleted successfully'});
    }catch(error){
        res.status(500).json({message: 'Server Error', error: error.message});
    }
}

module.exports = {
    getAllDevices,
    getDeviceById,  
    updateDevice,
    createDevice,
    deleteDevice
}