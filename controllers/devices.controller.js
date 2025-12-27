// Controller logic for devices related operations
const Device = require("../models/devices.model.js");

// Get all devices for a specific user (admin can see all devices)
const getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find({});
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


const getDeviceById = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const device = await Device.findById(deviceId);

    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.status(200).json(device);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// updating device information
const updateDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const updatedDevice = await Device.findByIdAndUpdate(deviceId, req.body);

    if (!updatedDevice) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.status(200).json(updatedDevice);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// adding a new Device to the system
const registerDevice = async (req, res) => {
  try {
    const userId = req.user.id;
    const { deviceId, deviceName } = req.body;

    if (!deviceId || !deviceName) {
      return res.status(400).json({ message: "Missing device data" });
    }

    // check if device with same deviceId already exists
    const existingDevice = await Device.findOne({ deviceId: deviceId });

    // prevents device hijacking
    if (existingDevice) {
        if(existingDevice.userId.toString() !== userId){
            return res.status(409).json({ message: "Device ID already registered to another user" });
        }

        return res.status(200).json({ message: "Device already registered" , device: existingDevice });
    }

    // proceeds to create a new device
    const device = await Device.create({
        deviceId: deviceId,
        deviceName: deviceName,
        userId: userId
    });

    res.status(200).json({ message: "Device registered successfully", device: device });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// deleting a device from the system => admin/root user only
const deleteDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const deletedDevice = await Device.findByIdAndDelete(deviceId);
    if (!deletedDevice) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.status(200).json({ message: "Device deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getAllDevices,
  getDeviceById,
  updateDevice,
  registerDevice,
  deleteDevice,
};
