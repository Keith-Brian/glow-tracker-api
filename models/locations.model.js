const mongoose = require("mongoose");

// Define the schema for Location
const LocationSchema = mongoose.Schema(
  {
    deviceId: { type: String, required: true, index: true },
    userId: { type: String, ref: "User", required: true },
    status: { type: String, enum: ["gps", "heartbeat"], required: true },
    location: {
      type: { type: String, enum: ["Point"], required: function() { return this.status === "gps"; } },
      coordinates: { type: [Number], required: function() { return this.status === "gps"; } }, // [longitude, latitude]
    },
    speed: { type: Number, default: null }, // in km/h
    gpsFix: { type: Boolean, default: false },
    battery: {
      percent: { type: Number, min: 0, max: 100, default: null },
      voltage: { type: Number, default: null },
      charging: { type: Boolean, default: false },
    },
    signal: { type: Number, default: null }, // in dBm
  },
  { timestamps: true }
);

// Creating a geospatial index on location for efficient location-based queries

LocationSchema.index({ location: "2dsphere" });
// Export the Location model for use in other files

const Location = mongoose.model("Location", LocationSchema);
module.exports = Location;