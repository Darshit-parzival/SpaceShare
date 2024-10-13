const router = require("express").Router();
const Contact = require("../models/contactModel");

router.post("/add", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newContact = new Contact({
      name: name,
      email: email,
      message: message,
    });

    const savedContact = await newContact.save();

    if (!savedContact) {
      return res.status(400).json({ message: "Internal server error" });
    }

    return res.status(201).json({
      message: "Contact message sent successfully.",
      contactId: savedContact._id,
      name: savedContact.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
