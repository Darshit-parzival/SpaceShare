const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, requird: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, requird: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
