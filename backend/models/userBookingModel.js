const mongoose = require("mongoose");

const userBookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  parkingId: { type: String, required: true },
  isPaid: { type: Boolean, required: true },
});

const UserBooking = mongoose.model("UserBooking", userBookingSchema);

module.exports = UserBooking;
