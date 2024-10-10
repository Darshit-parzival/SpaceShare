const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  ownerPhoto: { type: String, required: true },
  ownerAge: { type: Number, required: true },
  ownerEmail: { type: String, required: true, unique: true },
  ownerContact: { type: String, required: true },
});

const ParkingOwner = mongoose.model("ParkingOwner", parkingOwnerSchema);

module.exports = ParkingOwner;
