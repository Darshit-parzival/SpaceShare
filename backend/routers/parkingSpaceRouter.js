const express = require("express");
const router = express.Router();
const ParkingSpace = require("../models/parkingSpacesModel");
const multer = require("multer");
const path = require("path");

router.use("/img", express.static(path.join(__dirname, "../img")));

const ownersDir = path.join(__dirname, "../img/spaces");

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
      !parkingPincode ||
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
      parkingPhoto: `${req.protocol}://${req.get("host")}/img/parkings/${
        space.parkingPhoto
      }`,
    }));

    res.status(200).json(spacesWithPhotos);
  } catch (error) {
    console.error("Error fetching parking spaces:", error);
    res.status(500).send("Internal server error");
  }
});

router.patch("/edit", upload.single("parkingPhoto"), async (req, res) => {
  try {
    const { id, name, address, city, state, country, pincode, price } = req.body;

    let parkingSpace = await ParkingSpace.findById(id);
    if (!parkingSpace) {
      return res.status(404).json({ message: "Parking space not found" });
    }

    parkingSpace.parkingName = name || parkingSpace.parkingName;
    parkingSpace.parkingAddress = address || parkingSpace.parkingAddress;
    parkingSpace.parkingCity = city || parkingSpace.parkingCity;
    parkingSpace.parkingState = state || parkingSpace.parkingState;
    parkingSpace.parkingCountry = country || parkingSpace.parkingCountry;
    parkingSpace.parkingPincode = pincode || parkingSpace.parkingPincode;
    parkingSpace.parkingPrice = price || parkingSpace.parkingPrice;

    if (req.file) {
      if (parkingSpace.parkingPhoto) {
        const oldPhotoPath = path.join(ownersDir, parkingSpace.parkingPhoto);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }
      parkingSpace.parkingPhoto = req.file.filename;
    }

    const updatedParkingSpace = await parkingSpace.save();

    return res.status(200).json({
      message: "Parking space updated successfully.",
      spaceId: updatedParkingSpace._id,
      name: updatedParkingSpace.parkingName,
    });
  } catch (error) {
    console.error("Error editing parking space:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const ownerId = req.params.id;

    const parkingOwner = await ParkingSpace.deleteMany({
      parkingOwner: ownerId,
    });

    if (!parkingOwner) {
      return res.status(404).json({ message: "Parking owner not found." });
    }

    res.status(200).json({
      message:
        "Parking owner and associated parking spaces deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting parking owner and spaces:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the parking owner." });
  }
});

module.exports = router;
