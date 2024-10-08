const mongoose = require("mongoose");

const parkingOwnerSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pincode: { type: String, required: true },
  mobile: { type: String, required: true },
  owner: { type: String, required: true },
  age: { type: Number, required: true },
  ownerPhoto: { type: String, required: true }, 
  parkingSpacePhoto: { type: String, required: true }, 
});

const ParkingOwner = mongoose.model("ParkingOwner", parkingOwnerSchema);

module.exports = ParkingOwner;
