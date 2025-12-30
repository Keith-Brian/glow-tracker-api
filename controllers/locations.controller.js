const Location = require("../models/locations.model.js");
const Device = require("../models/devices.model.js");
const { ListCollectionsCursor } = require("mongodb");

//getting all live locations from the dataBase

const getAllLiveLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//adding a live location to the dataBase;
const addLiveLocation = async (req, res) => {
  try {
    const deviceIdAuth = req.device.deviceId;
    const { deviceId,location,speed, gpsFix, battery, signal } = req.body;

    const status = gpsFix ? "gps" : "heartbeat";

    // make sure the deviceId in the token matches the deviceId in the request body
    if (deviceIdAuth !== deviceId) {
      return res.status(403).json({ message: "Device ID mismatch" });
    }

    console.log("Device ID from auth middleware:", deviceId);
    const device = await Device.findOne({ deviceId: deviceId });

    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    // prepare location data
    const liveLocationData = {
      deviceId: deviceId,
      status: status,
      userId: device.userId,
      gpsFix: gpsFix,
      speed: speed,
      battery: battery,
      signal: signal,
    };

    if(gpsFix){
      liveLocationData.location = location;
      liveLocationData.speed = speed;
    }

    const liveLocation = await Location.create(liveLocationData);
    res.status(200).json(liveLocation);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getAllLiveLocations,
  addLiveLocation,
};
