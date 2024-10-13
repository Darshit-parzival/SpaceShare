const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, requird: true },
  email: { type: String, required: true },
  message: { type: String, requird: true },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
