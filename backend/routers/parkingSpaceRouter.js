const express = require("express");
const router = express.Router();
const ParkingSpace = require("../models/parkingSpacesModel");
const multer = require("multer");
const path = require("path");

router.use("/img", express.static(path.join(__dirname, "../img")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../img/parkings"));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const date = new Date(timestamp).toISOString().split("T")[0];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${date}_${timestamp}${ext}`);
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
      parkingPrice,
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
        parkingPrice,
    });
    
    if (
        !parkingOwner ||
        !parkingName ||
        !parkingPhoto ||
        !parkingAddress ||
        !parkingCity ||
        !parkingState ||
        !parkingCountry ||
        !parkingPincode||
        !parkingPrice
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
      parkingPrice,
    });

    await newParkingSpace.save();
    res.status(201).send("Parking space added successfully");
  } catch (error) {
    console.error("Error adding parking space:", error); 
    res.status(500).send("Internal server error");
  }
});

router.get("/fetch", async (req, res) => {
  try {
    const parkingSpaces = await ParkingSpace.find().populate("parkingOwner");

    const spacesWithPhotos = parkingSpaces.map((space) => ({
      ...space.toObject(),
      parkingPhoto: `${req.protocol}://${req.get("host")}/img/parkings/${space.parkingPhoto}`,
    }));

    res.status(200).json(spacesWithPhotos);
  } catch (error) {
    console.error("Error fetching parking spaces:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
