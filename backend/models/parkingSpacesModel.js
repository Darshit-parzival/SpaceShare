const mongoose = require("mongoose");

const parkingSpaceSchema = new mongoose.Schema({
  parkingOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ParkingOwner",
    required: true,
  },
  parkingName: { type: String, required: true },
  parkingPhoto: { type: String, required: true },
  parkingAddress: { type: String, required: true },
  parkingCity: { type: String, required: true },
  parkingState: { type: String, required: true },
  parkingCountry: { type: String, required: true },
  parkingPincode: { type: Number, required: true },
});

const ParkingSpace = mongoose.model("ParkingSpace", parkingSpaceSchema);

module.exports = ParkingSpace;
