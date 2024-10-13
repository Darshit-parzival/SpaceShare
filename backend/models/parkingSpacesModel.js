const mongoose = require("mongoose");

const parkingSpaceSchema = new mongoose.Schema({
  parkingOwner: { type: String, required: true },
  parkingName: { type: String, required: true },
  parkingPhoto: { type: String, required: true },
  parkingAddress: { type: String, required: true },
  parkingCity: { type: String, required: true },
  parkingState: { type: String, required: true },
  parkingCountry: { type: String, required: true },
  parkingPincode: { type: Number, required: true },
  parkingPrice: { type: Number, required: true },
  parkingSlots: { type: Number, required: true },
});

const ParkingSpace = mongoose.model("ParkingSpace", parkingSpaceSchema);

module.exports = ParkingSpace;
