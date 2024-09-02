const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, requird: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, requird: true },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
