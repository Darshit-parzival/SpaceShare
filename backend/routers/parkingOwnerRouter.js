const express = require("express");
const router = express.Router();
const ParkingOwner = require("../models/parkingOwnerModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const ownersDir = path.join(__dirname, "../img/owners");

if (!fs.existsSync(ownersDir)) {
  fs.mkdirSync(ownersDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ownersDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const date = new Date(timestamp).toISOString().split("T")[0];
    const ext = path.extname(file.originalname).toLowerCase(); 
    cb(null, `${date}_${timestamp}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Error: File type not supported!")); 
  },
});


router.post("/add", upload.single("ownerPhoto"), async (req, res) => {
  try {
    const { name, age, email, contact } = req.body;
    const ownerPhoto = req.file ? req.file.filename : null;

    if (!name || !age || !email || !contact) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newParkingOwner = new ParkingOwner({
      ownerName: name,
      ownerAge: age,
      ownerEmail: email,
      ownerContact: contact,
      ownerPhoto: ownerPhoto,
    });

    const savedParkingOwner = await newParkingOwner.save();

    return res.status(201).json({
      message: "Parking owner created successfully.",
      ownerId: savedParkingOwner._id,
      name: savedParkingOwner.ownerName,
      ownerPhoto: savedParkingOwner.ownerPhoto,
    });
  } catch (error) {
    console.error("Error adding parking owner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/fetch", async (req, res) => {
  try {
    const parkingOwners = await ParkingOwner.find();

    const ownersWithPhotos = parkingOwners.map((owner) => ({
      ...owner.toObject(),
      ownerPhoto: owner.ownerPhoto
        ? `${req.protocol}://${req.get("host")}/img/owners/${owner.ownerPhoto}`
        : null,
    }));

    return res.status(200).json(ownersWithPhotos);
  } catch (error) {
    console.error("Error fetching parking owners:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.patch("/edit", upload.single("ownerPhoto"), async (req, res) => {
  try {
    const { id, name, age, email, contact } = req.body;

    
    let parkingOwner = await ParkingOwner.findById(id);
    if (!parkingOwner) {
      return res.status(404).json({ message: "Parking owner not found" });
    }

    parkingOwner.ownerName = name || parkingOwner.ownerName;
    parkingOwner.ownerEmail = email || parkingOwner.ownerEmail;
    parkingOwner.ownerAge = age || parkingOwner.ownerAge;
    parkingOwner.ownerContact = contact || parkingOwner.ownerContact;

    if (req.file) {
      
      if (parkingOwner.ownerPhoto) {
        const oldPhotoPath = path.join(ownersDir, parkingOwner.ownerPhoto);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }
      parkingOwner.ownerPhoto = req.file.filename;
    }

    const updatedParkingOwner = await parkingOwner.save();

    return res.status(200).json({
      message: "Parking owner updated successfully.",
      ownerId: updatedParkingOwner._id,
      name: updatedParkingOwner.ownerName,
    });
  } catch (error) {
    console.error("Error editing parking owner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
    try {
      const ownerId = req.params.id;

      const deletedOwner = await ParkingOwner.findByIdAndDelete(ownerId);
  
      if (!deletedOwner) {
        return res.status(404).json({ message: "Parking owner not found." });
      }
  
      res.status(200).json({ message: "Parking owner deleted successfully." });
    } catch (error) {
      console.error("Error deleting parking owner:", error);
      res.status(500).json({ message: "An error occurred while deleting the parking owner." });
    }
  });
  

module.exports = router;
