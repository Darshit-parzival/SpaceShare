const mongoose = require("mongoose");

const userBookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  parkingId: { type: String, required: true },
  isPaid: { type: Boolean, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  duration: { type: String, required: true },
  totalPrice: { type: String, required: true },
});

const UserBooking = mongoose.model("UserBooking", userBookingSchema);

module.exports = UserBooking;
