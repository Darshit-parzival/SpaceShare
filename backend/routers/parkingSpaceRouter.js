const express = require("express");
const router = express.Router();
const ParkingSpace = require("../models/parkingSpacesModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../img/parkings"));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const date = new Date(timestamp).toISOString().split("T")[0];
    cb(null, `${date}_${timestamp}.jpg`);
  },
});

const upload = multer({ storage });

router.post("/add", upload.single("parkingPhoto"), async (req, res) => {
  try {
    const parkingPhoto = req.file ? req.file.filename : null;

    const {
      parkingOwner,
      parkingName,
      parkingAddress,
      parkingCity,
      parkingState,
      parkingCountry,
      parkingPincode,
    } = req.body;

    console.log({
      parkingOwner,
      parkingName,
      parkingPhoto,
      parkingAddress,
      parkingCity,
      parkingState,
      parkingCountry,
      parkingPincode,
    });

    if (
      !parkingOwner ||
      !parkingName ||
      !parkingPhoto ||
      !parkingAddress ||
      !parkingCity ||
      !parkingState ||
      !parkingCountry ||
      !parkingPincode
    ) {
      return res.status(400).send("Missing required fields");
    }

    const newParkingSpace = new ParkingSpace({
      parkingOwner,
      parkingName,
      parkingPhoto,
      parkingAddress,
      parkingCity,
      parkingState,
      parkingCountry,
      parkingPincode,
    });

    await newParkingSpace.save();
    res.status(201).send("Parking space added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
