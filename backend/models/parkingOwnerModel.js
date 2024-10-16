const mongoose = require("mongoose");

const parkingOwnerSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  ownerPhoto: { type: String, required: true },
  ownerAge: { type: Number, required: true },
  ownerEmail: { type: String, required: true, unique: true },
  ownerContact: { type: String, required: true },
  approved: { type: Boolean, required: true, default: false },
  planType: { type: String, required: true },
  registerDate: { type: String, required: true },
  password: { type: String, required: false },
});

const ParkingOwner = mongoose.model("ParkingOwner", parkingOwnerSchema);

module.exports = ParkingOwner;
