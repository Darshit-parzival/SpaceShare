const router = require("express").Router();
const ParkingOwner = require("../models/parkingOwnerModel");

router.post("/add", async (req, res) => {
  try {
    const { name, age, email, contact } = req.body;

    if (!name || !age || !email || !contact) {
      return res.status(400).send("Missing required fields");
    }

    const newParkingOwner = new ParkingOwner({
      name: name,
      age: age,
      email: email,
      contact: contact,
    });

    const savedParkingOwner = await newParkingOwner.save();

    return res.status(201).json({
      message: "Parking owner created successfully.",
      ownerId: savedParkingOwner._id,
      name: savedParkingOwner.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
