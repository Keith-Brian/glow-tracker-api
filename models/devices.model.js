const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema(
  {
    deviceId: { type: String, required: true, unique: true, index: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deviceName: { type: String, required: true },
    status: {
      online: { type: Boolean, default: false },
      lastSeen: { type: Date , default: Date.now },
      batteryLevel: { type: Number, min: 0, max: 100, default: null },
    },
     lastLocation: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], default: [0, 0] }, // [longitude, latitude]
      }
  },

  { timestamps: true }
);


// Creating a geospatial index on lastLocation for efficient location-based queries
deviceSchema.index({ 'lastLocation': '2dsphere' });
//exports the device model for use in other files

const Device = mongoose.model("Device", deviceSchema);
module.exports = Device;
