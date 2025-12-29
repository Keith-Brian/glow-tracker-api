// Controller logic for devices related operations
const Device = require("../models/devices.model.js");
const jwt = require("jsonwebtoken");

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

//device can request for an authorization token (handshake)

const deviceHandShake = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized Device Access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const deviceId = decoded.deviceId;

    const device = await Device.findOne({ deviceId: deviceId });

    if (!device) {
      return res.status(404).json({ message: "Device not registered" });
    }

    res
      .status(200)
      .json({ message: "Device authenticated successfully", device: device });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//generate token for device
const generateDeviceToken = async (req, res) => {
  const { deviceId } = req.query;
  console.log("Generating token for device:", deviceId);

  try {
    //check if device exists in the dB
    const device = await Device.findOne({ deviceId: deviceId });

    if (!device) {
      return res.status(404).json({ message: "Device not registered" });
    }

    const deviceToken = jwt.sign(
      { deviceId: deviceId },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res
      .status(200)
      .json({ message: "Device token generated successfully" , token: deviceToken });
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
      if (existingDevice.userId.toString() !== userId) {
        return res
          .status(409)
          .json({ message: "Device ID already registered to another user" });
      }

      return res
        .status(200)
        .json({ message: "Device already registered", device: existingDevice });
    }

    // proceeds to create a new device
    const device = await Device.create({
      deviceId: deviceId,
      deviceName: deviceName,
      userId: userId,
    });

    res
      .status(200)
      .json({ message: "Device registered successfully", device: device });
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
  deviceHandShake,
  generateDeviceToken,
};
