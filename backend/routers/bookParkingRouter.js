const router = require("express").Router();
const UserBooking = require("../models/userBookingModel");
const ParkingSpace = require("../models/parkingSpacesModel");

// Add Contact Message
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

    const parkingSlots = await ParkingSpace.findById(parkingId).select(
      "parkingSlots"
    );

    const bookedSlots = await UserBooking.countDocuments({
      parkingId: parkingId,
    });

    console.log(parkingSlots);
    console.log(bookedSlots);

    if (bookedSlots < parkingSlots.parkingSlots) {
      const savedBooking = await newUserBooking.save();

      if (!savedBooking) {
        return res.status(400).json({ message: "Internal server error" });
      }

      return res.status(200).json({
        message: "Booked parking successfully.",
        bookingId: savedBooking._id,
      });
    } else {
      return res.status(999).json({
        message: "No available slots",
      });
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

// Delete Contact Message
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact message not found" });
    }

    return res.status(200).json({
      message: "Contact message deleted successfully.",
      contactId: deletedContact._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
