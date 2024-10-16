const router = require("express").Router();
const UserBooking = require("../models/userBookingModel");
const ParkingSpace = require("../models/parkingSpacesModel");

router.post("/book", async (req, res) => {
  try {
    const {
      userId,
      parkingId,
      isPaid,
      startDate,
      endDate,
      duration,
      totalPrice,
      ownerId,
    } = req.body;

    if (
      !userId ||
      !parkingId ||
      !isPaid ||
      !startDate ||
      !endDate ||
      !duration ||
      !totalPrice ||
      !ownerId
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newUserBooking = new UserBooking({
      userId: userId,
      parkingId: parkingId,
      isPaid: isPaid,
      startDate: startDate,
      endDate: endDate,
      duration: duration,
      totalPrice: totalPrice,
      ownerId: ownerId,
    });

    // Count total bookings for the specific parkingId
    const bookedSlots = await UserBooking.countDocuments({ parkingId: parkingId });

    // If no bookings exist yet, insert the first booking without checking for slots
    if (bookedSlots === 0) {
      const savedBooking = await newUserBooking.save();

      if (!savedBooking) {
        return res.status(400).json({ message: "Internal server error" });
      }

      return res.status(200).json({
        message: "First booking added successfully.",
        bookingId: savedBooking._id,
      });
    } else {
      // Fetch parking slots for the given parkingId
      const parkingSpace = await ParkingSpace.findById(parkingId).select(
        "parkingSlots"
      );

      // Check if there are available slots for subsequent bookings
      if (bookedSlots < parkingSpace.parkingSlots) {
        const savedBooking = await newUserBooking.save();

        if (!savedBooking) {
          return res.status(400).json({ message: "Internal server error" });
        }

        return res.status(200).json({
          message: "Booked parking successfully.",
          bookingId: savedBooking._id,
        });
      } else {
        // If no slots are available, return an error message
        return res.status(999).json({
          message: "No available slots",
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/fetch", async (req, res) => {
  try {
    const userBookingData = await UserBooking.find();
    userBookingData
      ? res.status(200).json(userBookingData)
      : res.status(404).json({ message: "No booking found" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.delete("/delete", async (req, res) => {
  const { parkingId } = req.body;

  try {
    const deletedBooking = await UserBooking.findOneAndDelete({
      parkingId: parkingId,
    });

    console.log(parkingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
