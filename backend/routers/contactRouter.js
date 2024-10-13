const router = require("express").Router();
const Contact = require("../models/contactModel");

// Add Contact Message
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

// Fetch Contact Messages
router.get("/fetch", async (req, res) => {
  try {
    const contactData = await Contact.find();
    res.status(200).json(contactData);
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
