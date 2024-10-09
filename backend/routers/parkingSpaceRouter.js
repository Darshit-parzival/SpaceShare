const express = require("express");
const router = express.Router();
const ParkingSpace = require("../models/parkingSpacesModel");
const multer = require("multer");
const path = require("path");

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../img/parkings")); // Use path.join for better path handling
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route to add a parking space
router.post("/add", upload.single("parkingPhoto"), async (req, res) => {
  try {
    const parkingPhoto = req.file ? req.file.path : null; // Store the photo path

    const {
      parkingOwner,
      parkingName,
      parkingAddress,
      parkingCity,
      parkingState,
      parkingCountry,
      parkingPincode,
    } = req.body;

    // Log the incoming data for debugging
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

    // Check for missing required fields
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

    // Create and save the new parking space
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
    console.error(error); // Log the error for debugging
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
